import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { FlexCenter } from '../../css/commonCss';


export default function ({open, onclose, children} : {open:boolean, onclose:any, children:any}) {
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
			<Fade in={open}><div style={ModalContainerStyle}>
				{children}
			</div></Fade>
		</Modal>
}

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
