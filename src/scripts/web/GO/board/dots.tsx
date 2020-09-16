import React from 'react';
import { unitXYinfo, DotsProps, DotProps, PointObject, PointMap } from './boardTStypes';
import {BoardContext} from '../goContext'
import { getNeighbors, getNeighborsMap, removeAndReAddLivesRecurr, countLives}  from './dotController';
import * as _ from 'lodash'


// export const pointMap = function ():{[key:string]:any} {
// 	const map:{[key:string]:any} = {};

// 	for (let i=0; i<20; i++) {
// 		for(let j=0; j<20; j++){
// 			const id = 'row'+i+'col'+j
// 			map[id] = {
// 				id:id,
// 				color: null,
// 				isVisible:false,
// 				leader: id,
// 				lives: getNeighborsMap(id)
// 			}
// 		}	
// 	}

// 	return map;
// }();
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

export const pointMap = function():PointMap {
	let map:{[key:string]:PointObject} = {};

	for (let i=0; i<20; i++) {
		for(let j=0; j<20; j++){
			const id = 'row'+i+'col'+j

			map[id] = {
				id:id,
				color: mockBoard[i][j],
				isVisible: !!mockBoard[i][j],
				leader: id,
				lives: getNeighborsMap(id)
			}

		}	
	}

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
}()

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


export default function(props:DotsProps) {
	const {unitX, unitY} = props.unitXYinfo;	

	function createDots () {
		const dots = [];

		for(let num1=0; num1<20; num1++){
			for(let num2=0; num2<20; num2++){
				dots.push(
					<BoardContext.Consumer>{ ({color, toggleColor, setWinner, winner, addWhitesRemoved, addBlacksRemoved})=> (
						<Dot key={'dotrow'+num1+'col'+num2} 
							unitX={unitX} unitY={unitY} num1={num1} num2={num2}
							currentColor={color} toggleColor={toggleColor} 
							setWinner={setWinner} winner={winner}
							addWhitesRemoved={addWhitesRemoved} addBlacksRemoved={addBlacksRemoved}
						/>
					)}</BoardContext.Consumer>
				)
			}
		}

		return dots
	}

	return <div style={{width:"100%", height:"100%", position:"absolute", top: "0", left: "0"}}>
		{createDots()}
	</div>
}

function Dot(props:DotProps) {
	const {unitX, unitY, num1, num2, currentColor, toggleColor, setWinner, winner, addWhitesRemoved, addBlacksRemoved} = props;
	const id = "row"+num1+'col'+num2; 

	const [isHovered, setIsHovered] = React.useState(false);
	const [isClicked, setIsClicked] = React.useState(false);
	const isDotVisible = pointMap.readMap(id,"isVisible")
	
	if(isClicked !== isDotVisible) { setIsClicked(isDotVisible) }
	if(isClicked && !isDotVisible) {
		if(pointMap.readMap(id,"color") === 'black') { 
			addBlacksRemoved() 
		}
		else { addWhitesRemoved() } 

		pointMap.setMapColor(id, null);
	} 

	const style = Object.assign(
		{}, 
		dotStyle,
		{ top: unitY * num1 -10 + 'px', left: (unitX+1) * num2 - 10 + 'px' },
		{ opacity: isHovered || (isClicked && pointMap.readMap(id,"isVisible")) ? 100 : 0},
		{ background: pointMap.readMap(id,"color") ? pointMap.readMap(id,"color") : currentColor },
		{ color:"teal" }
	);

	function dotClicked (id:string, color:null|'black'|'white' = null) {
		if(isClicked || winner !== null ) return;

		pointMap.setMapVisible(id, true);
		pointMap.setMapColor(id, color || currentColor);
		const idColor = pointMap.readMap(id, "color");

		countLives(id, pointMap);
		setIsClicked(pointMap.readMap(id,"isVisible"));
		toggleColor();

		if(getNeighbors(id).every( function (idKey:string) { 
			return Object.keys(pointMap.readMap(id,"lives")).length > 1 && 
						pointMap.readMap(idKey, "color") && 
						pointMap.readMap(idKey, "color") !== idColor
		})) {
			setWinner(idColor === 'black' ? 'white': 'black')
			return;
		}
	}

	React.useEffect(()=>{

	})

	return <div style={style} 
			onMouseEnter={setIsHovered.bind(null, true)}
			onMouseLeave={setIsHovered.bind(null, false)}
			onClick={dotClicked.bind(null, id, null)}>
			{ Object.keys(pointMap.readMap(id,"lives")).length }
		</div> 
};

const dotStyle = {
	top:"0",
	left:"0",
	position:"absolute" as 'absolute',
	height: "20px",
	width: "20px",
	background:"teal",
	display: 'inline-block',
	borderRadius: '20px',
	opacity:0,
}