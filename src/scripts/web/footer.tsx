import {Link} from '@material-ui/core';
import React from 'react';

export default function ({styleOverride}:any) { 
	return <div style={Object.assign({}, bottomFooterStyle, styleOverride)}>
		<div style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly"}}>
			<FooterLinks href="https://www.linkedin.com/in/kevin-tseng-b1b46516/">LinkedIn</FooterLinks>
			<FooterLinks href="https://github.com/kevin074/kevin074.github.io">GitHub</FooterLinks>
			<FooterLinks href="https://dev.to/kevin074">Dev.to</FooterLinks>
		</div>
	</div>
}

const bottomFooterStyle = {
	height:"50vh",
	background: "linear-gradient(90deg, #26263D 0%, #707070 100%)",
	display:"flex",
	justifyContent:"center",
}

function FooterLinks (props:any) {
	return <Link 
				style={{color:"white", marginBottom: "10px"}}
				variant="body2"
				target="_blank"
				rel="noreferrer"
				href={props.href}
			>
				{props.children}
		</Link>
}