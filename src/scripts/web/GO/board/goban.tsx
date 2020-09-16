import React from 'react';
import { unitXYinfo } from './boardTStypes';


const rowColumn = (new Array(19)).fill(1).map(function(obj:any, index:number){ return index });

export default function (props: { unitXYinfo: unitXYinfo }) {

	return <div style={{width:"100%", height:"100%"}}>
		{
			rowColumn.map(function(num1:number){
				return <div key={'gobanrow'+num1} style={{height:props.unitXYinfo.unitY + 'px'}}> {
					rowColumn.map(function(num2:number){
						return <div 
									key={'gobanrow'+num1+'col'+num2} 
									style={Object.assign({},cellStyle, {width:props.unitXYinfo.unitX + 'px'})}>
								</div>
					})
				} </div>
			})
		}
	</div>
}

const cellStyle = {
	height: "100%",
	width: "0",
	background:"grey",
	display: 'inline-block',
	borderLeft: '1px solid black',
	borderTop: '1px solid black',
	content: '',
}
