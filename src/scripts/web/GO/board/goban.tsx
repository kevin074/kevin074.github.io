import React from 'react';
import { unitXYinfo } from './boardTStypes';
import { getXPosition, getYPosition}  from './dotController';

const rowColumn = (new Array(18)).fill(1).map(function(obj:any, index:number){ return index });

export default function (props: { unitXYinfo: unitXYinfo }) {
	const {unitX, unitY} = props.unitXYinfo;

	return <div style={{width:"100%", height:"100%"}}>
		<MakeBoard unitX={unitX} unitY={unitY} boardSize={18}/>
		{
			dotPlacement.map(function(XYarray){
				const [x,y] = XYarray
				return <div style={dotStyle(x,y, unitX, unitY)}></div>
			})
		}
	</div>
}


type MakeBoardProps = {
	unitX:number; 
	unitY:number;
	boardSize:number;
}
export function MakeBoard ( {unitX, unitY, boardSize}:MakeBoardProps ) {
	const boardNums = (new Array(boardSize)).fill(1).map(function(_, index:number){ return index})

	return <div style={{width:"100%", height:"100%"}}>
		{
			boardNums.map(function(num1:number){
				return <div key={'gobanrow'+num1} style={{height:unitY + 'px'}}> {
					boardNums.map(function(num2:number){
						return <div 
									key={'gobanrow'+num1+'col'+num2} 
									style={Object.assign({},cellStyle, {width:unitX + 'px'})}>
								</div>
					})
				} </div>
			})
		}
	</div>
}

const dotPlacement = function () {
	let xSum = 0;
	let ySum = 0;
	const array:number[][] = [];

	[3,6,6].forEach(function(x){
		xSum += x;
		ySum  = 0;
		[3,6,6].forEach(function(y){
			ySum += y;
			array.push([xSum,ySum]);
		})
	})

	return array;
}()

function dotStyle (x:number,y:number, unitX:number, unitY:number) {
	return {
		position:"absolute" as "absolute",
		left: getXPosition(unitX, x),
		top:  getYPosition(unitY, y),
		width:"10px",
		height:"10px",
		background:"black",
		borderRadius:"10px",
		transform: "translate(5px, 5px)", //because getXPosition and Y formula was made for width and height of 20px
	}
}

export const boardColor = "grey"
const cellStyle = {
	height: "100%",
	width: "0",
	background:boardColor,
	display: 'inline-block',
	borderLeft: '1px solid black',
	borderTop: '1px solid black',
	content: '',
	boxSizing: "border-box" as "border-box"
}
