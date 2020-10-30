import React from 'react';
import { getXPosition, getYPosition}  from '../board/dotController';
import { MakeBoard } from '../board/goban';
import { DotDataType, dotData, Dot } from './rulesDotsController';
import { getUnityXY } from '../board/board';
import { FlexCenter } from '../../../css/commonCss';
import { RuleHeaderStyle } from './rules1'

import EjectIcon from '@material-ui/icons/Eject';

const cellNumber = 4;
const boardSize = 200
const {unitX, unitY} = getUnityXY(boardSize, 1/cellNumber);

const rule1:DotDataType[] = [
	dotData(2,2,"black","","fadeOutLate"),
	dotData(2,1,"white",""),
	dotData(3,2,"white",""),
	dotData(2,3,"white","","fadeInOut"),
	dotData(1,2,"white",""),
];

export default function () {
	return <div style={{flexDirection:"column", ...FlexCenter}}>
		<h1  style={RuleHeaderStyle}> 4.) if life goes to zero, the dot is dead and has to be removed </h1>
		<div style={{width:boardSize+"px", height:boardSize+"px", position:"relative"}}>
			<MakeBoard unitX={unitX} unitY={unitY} boardSize={cellNumber}/>
			{ rule1.map(function(dotData:DotDataType){ return <Dot unitX={unitX} unitY={unitY} data={dotData}/> })}
			<EjectIcon className="fadeInOut" style={EjectIconStyle}/>
		</div>
	</div>
}

export const EjectIconStyle = {
	top: unitY*3+10+"px",
	left:unitX*2+"px",
    transform: "translate(-50%)",
    position:"absolute" as "absolute"
}