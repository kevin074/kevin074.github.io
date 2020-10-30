import React from 'react';
import Board from './board/board'
import { BoardContext } from './goContext'
import { pointMap } from './board/initBoard';
import { countEndGame } from './goViewController';
import Modal from '@material-ui/core/Modal';
import RulesModal from './rulesModal/rulesModal';
import CodeExpModal from './codeExplain/codeExplainModal'


//rules of the game:
// 1.) a dot has 4 lives, up down, left right of spaces unoccupied. 
// 2.) for corner and side dots, they don't have 4 lives accordingly
// 3.) if an opposite color dot is placed right on one of the lives spot, the dot loses one life
// 4.) if life goes to zero, the dot is dead and has to be removed
// 5.) one cannot place a dot that is 0 life immediately, doing so loses the game 
// 6.) exception for #5 is if placing the dot makes the opposing colored dot life goes to 0, the color just placed takes precedence.
// 7.) a dot can extend its life by placing another same color dot next to it. 
// 8.) caveat of #7 is that connected dots share the lives spaces unoccupied, so it won't be 4+4, but 3+3 lives.
// 9.) if connected dots goes to life 0, all of them is removed.
// 10.) the game ends when there is no uncontested empty space left in the game 
// 11.) the winner is the one that have more [# pieces on the board - # pieces taken offboard].


export default function () {
	const [dotColor, setDotColor] = React.useState<'black'|'white'>('black');
	const [winner, setWinner] = React.useState<null|'black'|'white'>(null);
	const [blacksRemoved, setBlacksRemoved] = React.useState<number>(0);
	const [whitesRemoved, setWhitesRemoved] = React.useState<number>(0);
	const [isRulesOpen, setIsRulesOpen] = React.useState<boolean>(false);
	const [isCodeExpOpen, setisCodeExpOpen] = React.useState<boolean>(false);
	const [boardSize, setBoardSize] = React.useState(720);

	function toggleDotColor () { setDotColor( dotColor === 'black' ? 'white': 'black' ) }
	function addBlacksRemoved () { setBlacksRemoved( prevState =>  prevState+1 )} 
	function addWhitesRemoved () { setWhitesRemoved( prevState =>  prevState+1 )} 

	function windowResizeCB () {
		const availableSize = Math.min( window.innerWidth/2, window.innerHeight );
		const size = availableSize - 20;
		setBoardSize(size);
	}

	React.useLayoutEffect(function(){
		window.addEventListener('resize', windowResizeCB);
 		windowResizeCB()

 	 	return window.removeEventListener.bind(null,'resize', windowResizeCB) 
	}, [])



	return ( <BoardContext.Provider value={{color: dotColor, toggleColor: toggleDotColor, winner, setWinner, addWhitesRemoved, addBlacksRemoved}}>

		<div style={{width:"100%", height:"calc(100vh - 51px)"}}>
			<div className="infoContainer" style={InfoContainerStyle}>
					<div style={{height:boardSize+"px", padding: "0 2vw"}}>
						<div style={{fontSize:"4vw", fontWeight:"bold", marginBottom:"30px"}}>Go (Board Game)</div>

						<div style={ScoresStyle}>Turn: { dotColor }</div>
						<div style={{marginBottom:"30px"}}><button style={ButtonStyle} onClick={toggleDotColor}>pass</button></div>

						<div style={ScoresStyle}>
							<span style={{marginRight:"50px"}}>blacks: {blacksRemoved}</span>
							<span>whites: {whitesRemoved}</span>
						</div>

						<div>
							<button style={ButtonStyle} type="button" onClick={countEndGame.bind(null, pointMap, setWinner, blacksRemoved, whitesRemoved)}> End </button>
							<button style={ButtonStyle} type="button" onClick={setIsRulesOpen.bind(null, true)}> Rules</button>
							<button style={ButtonStyle} type="button" onClick={setisCodeExpOpen.bind(null, true)}> Code Explain </button>
						</div>

						{winner && 
							<div style={WinnerContainer}> 
								<div style={WinnerBlackDrop}></div>
								<div style={WinnerDiv}> Winner Is: { winner }</div> 
							</div> 
						}
					</div>
			</div>

			<Board boardSize={boardSize}/>

			<RulesModal open={isRulesOpen} onclose={setIsRulesOpen.bind(null, false)}/>
			<CodeExpModal open={isCodeExpOpen} onclose={setisCodeExpOpen.bind(null, false)}/>
		</div>
	</ BoardContext.Provider> )
}

const WinnerBlackDrop = {
	width:"100%",
	height: "100%",
	background:"black" as "black",
	opacity:0.8
}

const WinnerContainer = {
	width:  "100vw",
	height: "30vh",
	position: "fixed" as "fixed",
	top: "50vh",
	transform: "translate(0%, -50%)",
	left:0,
    zIndex: 99999,
}

const WinnerDiv = {
	width:  "50vw",
	height: "15vh",
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	textAlign: "center" as "center",
    zIndex: 99999,
    background: "grey" as "grey",
    color: "white" as "white",
    lineHeight: "15vh",
    fontSize: "5vh",
    borderRadius:"15px",
}

const InfoContainerStyle = {
	width:"45vw", 
	height:"100%", 
	display:"inline-flex", 
	verticalAlign:"top", 
	justifyContent:"center", 
	alignItems:"center"
}

const ScoresStyle = { 
	fontSize:"2vw",
	marginBottom:"10px"
};

const ButtonStyle = {
	fontSize:"2vw",
    border: "0",
	background: "rgb(140,140,155)",
	marginRight:"10px",
	padding:"5px 15px",
	borderRadius:"10px",
	color:"white" as "white",
	outline:"none" as "none",
	cursor: "pointer" as "pointer",
}