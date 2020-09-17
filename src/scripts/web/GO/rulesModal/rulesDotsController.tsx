import React from 'react';
import { boardColor } from '../board/goban';
import { getXPosition, getYPosition}  from '../board/dotController';


export type DotDataType = {
	x:number,
	y:number, 
	color:"black"|"white"|"trans", 
	word:string	
}

export function dotData (x:number,y:number, color:"black"|"white"|"trans", word:string):DotDataType {
	return { x,y,color,word }
} 

export function Dot ({unitX, unitY, data}:{unitX:number,unitY:number,data:DotDataType}) {
	return <div style={dotStyle(
				getXPosition(unitX, data.x),
				getYPosition(unitY, data.y),
				data.color
				)}>
				{data.word}		
			</div>

	function dotStyle (x:string,y:string, color:string) {
		const colors = color === "trans" ? 
			{ backgroundColor: boardColor, border:"1px solid black", color:"white"} :
			{ backgroundColor: color}

		return {
			position:"absolute" as "absolute",
			top:y,
			left:x,
			width:"20px",
			height:"20px",
			borderRadius:"20px",
			textAlign:"center" as "center",
			...colors
		}
	}
}
