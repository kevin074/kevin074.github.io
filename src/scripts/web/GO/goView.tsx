import React from 'react';
import Board from './board/board'
import { BoardContext } from './goContext'
import { pointMap } from './board/initBoard';
import { countEndGame } from './goViewController';
import Modal from '@material-ui/core/Modal';
import RulesModal from './rulesModal/rulesModal';


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

	function toggleDotColor () { setDotColor( dotColor === 'black' ? 'white': 'black' ) }

	function addBlacksRemoved () { setBlacksRemoved( prevState =>  prevState+1 )} 
	function addWhitesRemoved () { setWhitesRemoved( prevState =>  prevState+1 )} 

	return ( <BoardContext.Provider value={{color: dotColor, toggleColor: toggleDotColor, winner, setWinner, addWhitesRemoved, addBlacksRemoved}}>
		<div style={{width:"100%", height:"100%"}}>
			{winner ? <div>winner is: { winner }</div> : <div></div>}

			<div>Turn: { dotColor }</div>
			<button>pass</button>

			<div>blacks: {blacksRemoved}</div>
			<div>whites: {whitesRemoved}</div>

			<button onClick={countEndGame.bind(null, pointMap, setWinner, blacksRemoved, whitesRemoved)}> End </button>
			<button type="button" onClick={setIsRulesOpen.bind(null, true)}> See Modal</button>
			<RulesModal open={isRulesOpen} onclose={setIsRulesOpen.bind(null, false)}/>

			<Board />
		</div>
	</ BoardContext.Provider> )
}