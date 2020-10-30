import React from 'react';
import { getXPosition, getYPosition}  from '../board/dotController';
import { MakeBoard } from '../board/goban';
import { DotDataType, dotData, Dot } from './rulesDotsController';
import { getUnityXY } from '../board/board';
import { FlexCenter } from '../../../css/commonCss';
import { RuleHeaderStyle } from './rules1'

const cellNumber = 4;
const boardSize = 200
const {unitX, unitY} = getUnityXY(boardSize, 1/cellNumber);

const rule1:DotDataType[] = [
	dotData(0,2,"black",""),
	dotData(1,2,"black",""),
	dotData(2,2,"black",""),
	dotData(2,1,"black",""),
	dotData(2,0,"black",""),

	dotData(0,3,"white",""),
	dotData(1,3,"white",""),
	dotData(2,3,"white",""),
	dotData(3,3,"white",""),
	dotData(3,2,"white",""),
	dotData(3,1,"white",""),
	dotData(3,0,"white",""),
];
const rule2:DotDataType[] = [
	dotData(0,2,"black",""),
	dotData(1,2,"black",""),
	dotData(1,1,"black",""),
	dotData(2,1,"black",""),
	dotData(2,0,"black",""),

	dotData(2,2,"trans","?"),	

	dotData(0,3,"white",""),
	dotData(1,3,"white",""),
	dotData(2,3,"white",""),
	dotData(3,3,"white",""),
	dotData(3,2,"white",""),
	dotData(3,1,"white",""),
	dotData(3,0,"white",""),
];

export default function () {
	return <div style={{flexDirection:"column", ...FlexCenter}}>
		<h1 style={RuleHeaderStyle}> 9.) the game ends when there is no uncontested empty space left in the game </h1>
		<div style={{width:boardSize+"px", height:boardSize+"px", position:"relative"}}>
			<MakeBoard unitX={unitX} unitY={unitY} boardSize={cellNumber}/>
			{ rule1.map(function(dotData:DotDataType){ return <Dot unitX={unitX} unitY={unitY} data={dotData}/> })}
		</div>
		<div style={{width:boardSize+"px", height:boardSize+"px", position:"relative", marginTop:"20px"}}>
			<MakeBoard unitX={unitX} unitY={unitY} boardSize={cellNumber}/>
			{ rule2.map(function(dotData:DotDataType){ return <Dot unitX={unitX} unitY={unitY} data={dotData}/> })}
		</div>
	</div>
}
