//@ts-nocheck
//ts no check because Tabs typing is broken from material ui.

import React from 'react';
import { Box, AppBar, Tabs, Tab }  from '@material-ui/core';
import Introductions from './home/introduction';
import ArticleDisplay from './articles/aricleDisplay'
import WorksView from './sampleWorks/worksView'
import GOView from './GO/goView';

const HOME = 'home';
const ARTICLE = 'article';
const SAMPLE_WORKS = 'sample_works';
const GO = 'go_(board_game)';

const pageOrder = [HOME, ARTICLE, SAMPLE_WORKS, GO]

function toDisplayValue (string:string) {
	return string
		.split('_')
		.map(function(str:string){ return str[0].toUpperCase() + str.substring(1) })
		.join(' ');
}

export default () => { 
	const [appBarValue, setAppBarValue] = React.useState(HOME);

	function setNewAppbarValue(event:React.ChangeEvent<HTMLElement>, value:string) {
		setAppBarValue(event.target.innerText.split(" ").join("_").toLowerCase())
	};

	return <Box className="webViewContainer" style={{width:"100%", height:"100%"}}>
		<AppBar className="header" >
			<Tabs value={pageOrder.indexOf(appBarValue)} onChange={setNewAppbarValue}> 
				{pageOrder.map(function(page){
					return <Tab key={page} label={toDisplayValue(page)} />	
				})}
			</Tabs>
		</AppBar>;


		<main style={mainStyle}>
			<MainView appBarValue={appBarValue}	/>
		</main>
	</Box>

}

function MainView (props:{appBarValue:string}) {
	
	if (props.appBarValue === HOME) { 	 return  <Introductions /> }
	if (props.appBarValue === ARTICLE) { return  <ArticleDisplay /> }
	if (props.appBarValue === SAMPLE_WORKS) { return  <WorksView /> }
	if (props.appBarValue === GO) { return  <GOView /> }

	return  <Introductions />
}

const mainStyle = {
	marginTop:"50px",
	height: "calc(100% - 50px)"
}