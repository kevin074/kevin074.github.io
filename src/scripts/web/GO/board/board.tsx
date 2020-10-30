import React from 'react';
import Goban from './goban';
import Dots from './dots';

let topOffset = 0;
let parentWidth = 0;
let parentHeight = 0;

type PropType = {
	boardSize:number
}

export default function ({boardSize}:PropType) {
	const unitXYinfo = {
		...getUnityXY(boardSize, 1/18),
		topOffset:0
	};

	return <div style={{position:"relative", width:"50vw", height:"100%", display:"inline-flex", alignItems: "center"}} >
			<div style={{width:boardSize+'px', height: boardSize+'px', position:"relative"}} >
				<Goban unitXYinfo={unitXYinfo} />
				<Dots  unitXYinfo={unitXYinfo} />
			</div>
		</div>
}

export function getUnityXY (size:number, factor:number){
	// factor is determined by 1 over how many squares
	return {
		unitX: roundTo2(size * factor),
		unitY: roundTo2(size * factor),
	}
} 

function roundTo2 (float:number) {
	const rounded = (Math.round(float * 100) / 100).toFixed(2)
	return parseFloat(rounded)
}