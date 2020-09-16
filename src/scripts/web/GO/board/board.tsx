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
			<div style={{margin:"0 auto", width:"800px", height: '800px', position:"relative"}} ref={myRef}>
				<Goban unitXYinfo={unitXYinfo} />
				<Dots  unitXYinfo={unitXYinfo} />
			</div>
		</div>
}

function setBoardConfigs (myRef:{current:HTMLDivElement}, setUnitXYinfo:any) { 
	parentWidth = myRef.current.offsetWidth;
	parentHeight = myRef.current.offsetHeight;

	topOffset = myRef.current.offsetTop;
	const unitX = roundTo2(parentWidth  * 0.05);
	const unitY = roundTo2(parentHeight * 0.05);
	
	setUnitXYinfo({unitX, unitY, topOffset})
}

function roundTo2 (float:number) {
	const rounded = (Math.round(float * 100) / 100).toFixed(2)
	return parseFloat(rounded)
}