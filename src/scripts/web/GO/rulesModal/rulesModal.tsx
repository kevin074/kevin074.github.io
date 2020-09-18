import React from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { FlexCenter } from '../../../css/commonCss';

import Rules1 from './rules1';
import Rules2 from './rules2';
import Rules3 from './rules3';
import Rules4 from './rules4';
import Rules5 from './rules5';
import Rules6 from './rules6';

export default function ({open, onclose} : {open:boolean, onclose:any}) {
	return <Modal
			  open={open}
			  onClose={onclose}
			  aria-labelledby="simple-modal-title"
			  aria-describedby="simple-modal-description"
	          closeAfterTransition
	          BackdropComponent={Backdrop}
        	  BackdropProps={{
    	        timeout: 500,
	          }}
	          style={ModalStyle}
			>
			<Body open={open}/>
	</Modal>
}

function Body ( {open} : {open:boolean} ) {
	return <Fade in={open}><div style={ModalContainerStyle}>
				<Rules1 />
				<Rules2 />
				<Rules3 />
				<Rules4 /> 
				<Rules5 />
				<Rules6 /> 
          </div></Fade>
}

//add animation: 
//rule4
//rule5
//rule6


const ModalStyle = {
	width:"100%",
	height:"100%",
	...FlexCenter
}

const ModalContainerStyle = {
	width:"50%", 
	height:"95%", 
	background:"white",
	overflow:"auto",
}
//rules of the game:
// 1.) a dot has 4 lives, up down, left right of spaces unoccupied. 
// 2.) for corner and side dots, they don't have 4 lives accordingly
// 3.) if an opposite color dot is placed on a life spot of another, both dots loses one life
// 4.) if life goes to zero, the dot is dead and has to be removed
// 5.) one cannot place a dot that is 0 life immediately, doing so loses the game 
// 6.) exception for #5 is if placing the dot makes the opposing colored dot life goes to 0, the color just placed takes precedence.
// 7.) a dot can extend its life by placing another same color dot next to it. 
// 		caveat is that connected dots share the lives spaces unoccupied, so it won't be 4+4, but 3+3 lives.
// 8.) if connected dots goes to life 0, all of them is removed together.
// 9.) the game ends when there is no uncontested empty space left in the game 
// 10.) the winner is the one that have more [# pieces on the board - # pieces taken offboard].

