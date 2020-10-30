//@ts-nocheck
//ts no check because Tabs typing is broken from material ui.

import React from 'react';
import { Box, AppBar, Tabs, Tab }  from '@material-ui/core';
import Introductions from './home/introduction';
import ArticleView from './articles/articlesView'
import WorksView from './sampleWorks/worksView'
import GOView from './GO/goView';
import Footer from './footer'
import Header from './header'
import {HOME, ARTICLE, SAMPLE_WORKS, GO} from './webViewConstants'
import {primaryColorBlue} from '../css/commonCss'


export default () => { 
	const [appBarValue, setAppBarValue] = React.useState(GO);
		
	return <Box className="webViewContainer" style={{width:"100%", height:"100%"}}>

		<Header appBarValue={appBarValue} setAppBarValue={setAppBarValue}/>

		<main style={{marginTop:"51px"}}>
			<MainView appBarValue={appBarValue}	/>
		</main>

		<Footer/>
	</Box>

}

function MainView (props:{appBarValue:string}) {
	
	if (props.appBarValue === HOME) { 	 return  <Introductions /> }
	if (props.appBarValue === ARTICLE) { return  <ArticleView /> }
	if (props.appBarValue === SAMPLE_WORKS) { return  <WorksView /> }
	if (props.appBarValue === GO) { return  <GOView /> }

	return  <Introductions />
}

const homeStyle = {
	marginLeft: "30px", 
	lineHeight:"51px", 
	cursor:"pointer",
	fontWeight:"bold",
}