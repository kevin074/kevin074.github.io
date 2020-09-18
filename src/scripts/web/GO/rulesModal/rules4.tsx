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
	dotData(2,2,"black",""),
	dotData(2,1,"white",""),
	dotData(3,2,"white",""),
	dotData(2,3,"white",""),
	dotData(1,2,"white",""),
];

export default function () {
	return <div style={{flexDirection:"column", ...FlexCenter}}>
		<h1 style={RuleHeaderStyle}> 4.) if an opposite color dot is placed on a life spot of another, both lose one life </h1>
		<div style={{width:boardSize+"px", height:boardSize+"px", position:"relative"}}>
			<MakeBoard unitX={unitX} unitY={unitY} boardSize={cellNumber}/>
			{ rule1.map(function(dotData:DotDataType){ return <Dot unitX={unitX} unitY={unitY} data={dotData}/> })}
		</div>
	</div>
}


const RuleHeaderStyle = {
	fontSize: "20px",
}
