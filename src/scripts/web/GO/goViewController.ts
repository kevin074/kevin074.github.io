import { PointObject, PointMap } from './board/boardTStypes';
import { getUniqueNeighbors }  from './board/dotController';
import * as  _ from 'lodash';

export function countEndGame (
	pointMap: PointMap, 
	setWinner: (val:'black'|'white'|null) => void,
	blacksRemoved:number, 
	whitesRemoved:number
){	
	const clonePointMap = pointMap.getDeepClone();
	fillInGroups(pointMap);

	let blackCount = 0;
	let whiteCount = 0;
	let stack = pointMap.getKeys();
	let current = stack.pop();
	
	while (current) {
		const dotColor = pointMap.readMap(current, "color");
		if(current === 'row2col1') console.log(dotColor)
		if(dotColor === null) { 
			alert('cannot determine'); 

			pointMap.setWholeMap(clonePointMap)
			setWinner('black')
			setWinner(null)

			return null
		} else {
			blackCount += (dotColor === 'black' && 1) || 0;
			whiteCount += (dotColor === 'white' && 1) || 0;
			//branchless programming
		};

		current = stack.pop();
	}

	setWinner( 
		(blackCount-blacksRemoved > whiteCount-whitesRemoved && 'black') || 'white'
	);
	//branchless programming
}

function fillInGroups (pointMap: PointMap) {
	const visited:{[key:string]:boolean} = {};

	pointMap.getKeys().forEach( function ( idString:string ) {
		if(pointMap.readMap(idString,"color") || visited[idString]) { return }
		else {
			visited[idString] = true;
			const {group, color} = recurrGetGroup(idString, pointMap, visited);
			group.forEach(function(memberIdString:string){
				pointMap.setMapColor(memberIdString , color);
				pointMap.setMapVisible(memberIdString, true);
			});
		}
	});
}


function recurrGetGroup (
	startID: string, 
	pointMap: PointMap, 
	visited:{[key:string]:boolean}) :{group:string[], color:null|'black'|'white'}
{
	const group:string[] = !pointMap.readMap(startID, "color") ? [startID] : [];
	let stack:string[] = getUniqueNeighbors(startID, []);
	let currentID = stack.shift()
	let crrentColor:string|null;
	let currentColor:null|'black'|'white' = null;
	let dotColor:null|'black'|'white' = null

	let index = 0;

	while(currentID){
		dotColor = pointMap.readMap(currentID, 'color');

		visited[currentID] = true;
		if(!dotColor) {
			group.push(currentID)
			stack = stack.concat(
				getUniqueNeighbors(currentID, stack).filter(function(idString:string){
					return !visited[idString]
				})
			);
		} else {
			if(!currentColor) { currentColor = dotColor }
			else if (dotColor !== currentColor) {
				return {group:[], color:null} //the area is not enclosed, the game cannot end yet.
			} 
			else {
				//do nothing cause it's the same color so maybe the group is still enclosed.__dirname
				//also the algorithm should not test currentDot's neighbors.
			}
		}
		currentID = stack.shift()
	}
	//should only return if all 
	return {group, color:currentColor};
}