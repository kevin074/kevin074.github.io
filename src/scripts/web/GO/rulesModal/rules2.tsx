import React from 'react';
import { getXPosition, getYPosition}  from '../board/dotController';
import { MakeBoard } from '../board/goban';
import { DotDataType, dotData, Dot } from './rulesDotsController';
import { getUnityXY } from '../board/board';
import { FlexCenter } from '../../../css/commonCss';


const cellNumber = 4;
const boardSize = 200
const {unitX, unitY} = getUnityXY(boardSize, boardSize, 1/cellNumber);

const rule1:DotDataType[] = [
	dotData(0,0,"black",""),
	dotData(0,1,"trans","2"),
	dotData(1,0,"trans","1"),

	dotData(0,3,"black",""),
	dotData(1,3,"trans","2"),
	dotData(0,2,"trans","1"),
	dotData(0,4,"trans","3"),
];

export default function () {
	return <div style={{flexDirection:"column", ...FlexCenter}}>
		<h1 style={RuleHeaderStyle}> 2.) Corner and side dots don't have 4 lives accordingly </h1>
		<div style={{width:boardSize+"px", height:boardSize+"px", position:"relative"}}>
			<MakeBoard unitX={unitX} unitY={unitY} boardSize={cellNumber}/>
			{ rule1.map(function(dotData:DotDataType){ return <Dot unitX={unitX} unitY={unitY} data={dotData}/> })}
		</div>
	</div>
}


const RuleHeaderStyle = {
	fontSize: "20px",
}
