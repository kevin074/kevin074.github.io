import { Box, AppBar, Tabs, Tab }  from '@material-ui/core';
import {primaryColorBlue} from '../css/commonCss'
import {HOME, ARTICLE, SAMPLE_WORKS, GO} from './webViewConstants'
import React, { Dispatch, SetStateAction } from 'react';

const pageOrder = [HOME, ARTICLE, SAMPLE_WORKS, GO]

interface Props {
	appBarValue:string, 
	setAppBarValue:Dispatch<SetStateAction<string>>
}

export default function ({appBarValue, setAppBarValue}:Props){
	
	function setNewAppbarValue( event:React.ChangeEvent<any>, value:string) { //typeing not good for onChange for some reason
		setAppBarValue(event.target.innerText.split(" ").join("_").toLowerCase())
	};

	function returnHome () { setAppBarValue(HOME) }

	return <AppBar className="header" style={headerStyle}>

		<span style={homeStyle} onClick={returnHome}> KEVIN  TSENG </span>

		<Tabs value={pageOrder.indexOf(appBarValue)-1} onChange={setNewAppbarValue} style={{display:'inline-block',marginRight: "30px"}}> 
			{pageOrder.map(function(page, index){
				if(index ===0 ) return null
				return <Tab key={page} label={toDisplayValue(page)} />	
			})}
		</Tabs>

	</AppBar>

}

const headerStyle ={
	flexDirection: "row" as "row", 
	justifyContent: "space-between" as "space-between", 
	background:primaryColorBlue, 
	boxShadow: "none"
}

const homeStyle = {
	marginLeft: "30px", 
	lineHeight:"51px", 
	cursor:"pointer" as "pointer",
	fontWeight:"bold" as "bold",
}

function toDisplayValue (string:string) {
	return string
		.split('_')
		.map(function(str:string){ return str[0].toUpperCase() + str.substring(1) })
		.join(' ');
}
