import React from 'react';
import { unitXYinfo, DotsProps, DotProps, PointObject, PointMap } from './boardTStypes';
import {BoardContext} from '../goContext'
import { getNeighbors, getNeighborsMap, removeAndReAddLivesRecurr, countLives, getXPosition, getYPosition}  from './dotController';
import * as _ from 'lodash'
import { pointMap } from './initBoard';


export default function(props:DotsProps) {
	const {unitX, unitY} = props.unitXYinfo;	

	function createDots () {
		const dots = [];

		for(let num1=0; num1<19; num1++){
			for(let num2=0; num2<19; num2++){
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
	const {unitX, unitY, currentColor, toggleColor, setWinner, winner, addWhitesRemoved, addBlacksRemoved} = props;
	const numX = props.num2;
	const numY = props.num1;

	const id = "row"+numY+'col'+numX; 

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
		{ top: getYPosition(unitY, numY), left: getXPosition(unitX, numX)},
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