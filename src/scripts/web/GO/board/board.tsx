import React from 'react';
import Goban from './goban';
import Dots from './dots';

let topOffset = 0;
let parentWidth = 0;
let parentHeight = 0;

export default function () {
	const [unitXYinfo, setUnitXYinfo] = React.useState({
														unitX:0,
														unitY:0,
														topOffset:0
													});

	const myRef = React.useRef() as React.MutableRefObject<HTMLDivElement>;;

	function mouseMove (event:any) {
		const clientX = event.clientX;
		const clientY = event.clientY; 
	}

	React.useEffect(function(){
		window.addEventListener('resize', setBoardConfigs.bind(null, myRef, setUnitXYinfo));
 		setBoardConfigs(myRef, setUnitXYinfo);
	}, [myRef])

	return <div style={{width:"100%", height:"100%"}} onMouseMove={mouseMove} >
			<div style={{margin:"0 auto", width:"720px", height: '720px', position:"relative"}} ref={myRef}>
				<Goban unitXYinfo={unitXYinfo} />
				<Dots  unitXYinfo={unitXYinfo} />
			</div>
		</div>
}

function setBoardConfigs (myRef:{current:HTMLDivElement}, setUnitXYinfo:any) { 
	setUnitXYinfo({
		topOffset: myRef.current.offsetTop,
		...getUnityXY(
			myRef.current.offsetWidth, 
			myRef.current.offsetHeight, 
			1/18
		)
	})
}

export function getUnityXY (width:number, height:number, factor:number){
	// factor is determined by 1 over how many squares
	return {
		unitX: roundTo2(width * factor),
		unitY: roundTo2(width * factor)
	}
} 

function roundTo2 (float:number) {
	const rounded = (Math.round(float * 100) / 100).toFixed(2)
	return parseFloat(rounded)
}