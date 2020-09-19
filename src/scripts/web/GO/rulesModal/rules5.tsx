import React from 'react';
import { getXPosition, getYPosition}  from '../board/dotController';
import { MakeBoard } from '../board/goban';
import { DotDataType, dotData, Dot } from './rulesDotsController';
import { getUnityXY } from '../board/board';
import { FlexCenter } from '../../../css/commonCss';
import { RuleHeaderStyle } from './rules1'
import { EjectIconStyle } from './rules4'
import EjectIcon from '@material-ui/icons/Eject';

const cellNumber = 4;
const boardSize = 200
const {unitX, unitY} = getUnityXY(boardSize, boardSize, 1/cellNumber);

const rule1:DotDataType[] = [
	dotData(2,2,"black","", "fadeInOut"),
	dotData(2,1,"white",""),
	dotData(3,2,"white",""),
	dotData(2,3,"white",""),
	dotData(1,2,"white",""),
];

export default function () {
	return <div style={{flexDirection:"column", ...FlexCenter}}>
		<h1 style={RuleHeaderStyle}> 5.) one cannot place a dot that is 0 life immediately, doing so loses the game </h1>
		<div style={{width:boardSize+"px", height:boardSize+"px", position:"relative"}}>
			<MakeBoard unitX={unitX} unitY={unitY} boardSize={cellNumber}/>
			{ rule1.map(function(dotData:DotDataType){ return <Dot unitX={unitX} unitY={unitY} data={dotData}/> })}
			<EjectIcon className="fadeInOut" style={ThisEjectIconStyle}/>
			<div className="fadeInSecond" style={Alert}> Black Loses </div>
		</div>
	</div>
}

const ThisEjectIconStyle = Object.assign({}, EjectIconStyle, {
	top: unitY*2-35+"px",
	transform: "translate(-50%) rotate(180deg)",
})

const Alert = {
    width: "100px",
    height: "50px",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    textAlign: "center" as "center",
    lineHeight: "50px",
    borderRadius: "5px",
}
