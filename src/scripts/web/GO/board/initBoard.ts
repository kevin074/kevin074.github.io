import { PointObject, PointMap } from './boardTStypes';
import { getNeighbors, getNeighborsMap }  from './dotController';
import * as _ from 'lodash';

export const pointMap = function ():PointMap {
	const map:{[key:string]:any} = {};

	for (let i=0; i<19; i++) {
		for(let j=0; j<19; j++){
			const id = 'row'+i+'col'+j
			map[id] = {
				id:id,
				color: null,
				isVisible:false,
				leader: id,
				lives: getNeighborsMap(id)
			}
		}	
	}

	return createPointMap(map)
}();


type MockBoardDot = null|'black'|'white'
const mockBoard:MockBoardDot[][] = [
	[null,'white','black',null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,'white','black',null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	['white',null,'black',null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	['black','black','black',null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
	[null,null,null,null,null,null,null,null,'black','white',null,null,null,null,null,null,null,null,null,null,],
]

// export const pointMap = function():PointMap {
// 	let map:{[key:string]:PointObject} = {};

// 	for (let i=0; i<19; i++) {
// 		for(let j=0; j<19; j++){
// 			const id = 'row'+i+'col'+j

// 			map[id] = {
// 				id:id,
// 				color: mockBoard[i][j],
// 				isVisible: !!mockBoard[i][j],
// 				leader: id,
// 				lives: getNeighborsMap(id)
// 			}

// 		}	
// 	}

// 	return createPointMap(map)
// }()

function createPointMap (map:{[key:string]:PointObject}) {
	const mapClass:PointMap = {
		getPoint:		function(id:string):PointObject{				return map[id] || undefined },
		readMap: 	 	function(id:string,value:string){ 				return map[id] ? map[id][value] : undefined},

		setMapColor: 	function(id:string,value:'white'|'black'|null){ if(map[id]) map[id].color=value },
		setMapVisible: 	function(id:string,value:boolean){ 				if(map[id]) map[id].isVisible=value},
		setMapLeader: 	function(id:string,value:string){ 				if(map[id]) map[id].leader=value},
		setMapLives: 	function(id:string,key:string){ 				if(map[id]) map[id].lives[key]=true},
		setMapLivesWhole: function (id:string,value:{[key:string]:boolean}) {	if(map[id]) map[id].lives = value },

		removeMapLive: 	function(id:string,key:string){ 				if(map[id]) delete map[id].lives[key]},

		setWholeMap:	function(newMap:{[key:string]:PointObject}) {   map = newMap },

		getKeys: 		function () { return Object.keys(map) },
		getDeepClone: 	function () { return _.cloneDeep(map) }
	}
	
	const visited:{[key:string]:boolean} = {}
	Object.keys(map).forEach(function(id:string){
		countLiveInMock(id, visited, mapClass);
	});

	return mapClass

}

function countLiveInMock (id:string, visited:{[key:string]:boolean}, pointMap:PointMap) {
	const currentColor = pointMap.readMap(id, "color");
	if(visited[id] || !currentColor) return;

	visited[id] = true;
	let stack = getNeighbors(id);
	let currentID:string = '';
	let thisColor:null|"black"|"white" = null


	while(stack.length) {
		currentID = stack.shift() as string;
		thisColor = pointMap.readMap(currentID, "color")

		if(!thisColor){ /* nothing needed */ }
		else if(thisColor === currentColor && !visited[currentID]){
			visited[currentID] = true;
			stack = stack.concat( getNeighbors(currentID) );

			pointMap.removeMapLive(id, currentID);
			pointMap.removeMapLive(currentID, id);

			pointMap.setMapLivesWhole(id, Object.assign( 
				pointMap.readMap(id, 'lives'),
				pointMap.readMap(currentID, 'lives')	
			));
			pointMap.setMapLivesWhole(currentID, pointMap.readMap(id, 'lives'));
		}
		else {
			pointMap.removeMapLive(id, currentID)
		}
	}
}

