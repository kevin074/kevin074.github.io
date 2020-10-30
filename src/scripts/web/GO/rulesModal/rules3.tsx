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
	dotData(2,2,"black",""),
	dotData(2,1,"trans","1"),
	dotData(3,2,"trans","2"),
	dotData(2,3,"trans","3"),

	dotData(1,2,"white",""),
	dotData(1,1,"trans","1"),
	dotData(0,2,"trans","2"),
	dotData(1,3,"trans","3"),
];

export default function () {
	return <div style={{flexDirection:"column", ...FlexCenter}}>
		<h1 style={RuleHeaderStyle}> 3.) if an opposite color dot is placed on a life spot of another, both lose one life </h1>
		<div style={{width:boardSize+"px", height:boardSize+"px", position:"relative"}}>
			<MakeBoard unitX={unitX} unitY={unitY} boardSize={cellNumber}/>
			{ rule1.map(function(dotData:DotDataType){ return <Dot unitX={unitX} unitY={unitY} data={dotData}/> })}
		</div>
	</div>
}

