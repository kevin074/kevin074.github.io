import React from 'react';
import Button from '@material-ui/core/Button';
import Menu, {MenuProps} from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Article, {ArticlesMap} from './articleDisplay';
import { withStyles } from '@material-ui/core/styles';
import {primaryColorBlue, primaryColorGrey} from '../../css/commonCss'


const MENTALITY = 'mentality';
const PROGRAMMING_INHERITANCE = 'programmingInheritance';
const WEB_ACCOUNTABILITY = 'webAccountability';
const WORLDS_WRONG = 'worldsWrong';
const COMPETITION_AND_PROGRAMMING = 'competitionAndProgramming'

const articlesMap:ArticlesMap = {
	[COMPETITION_AND_PROGRAMMING]: {
		src:'./CompetitionAndProgramming.txt', 
		text : '', 
		title: "Understand Programming Through Competitive Gaming",
		date: "08/28/2020"
	},
	[MENTALITY] : {
		src: './Mentality.txt', 
		text: '', 
		title:"The Mentality for Improving",
		date: "07/24/2020"
	},
	[PROGRAMMING_INHERITANCE] : {
		src: './programmingInheritance.txt', 
		text: '', 
		title:"The Downside of Innovation",
		date: "08/10/2020"
	},
	[WEB_ACCOUNTABILITY] : {
		src: './webAccountability.txt', 
		text: '', 
		title:'Accountability on the Internet',
		date: "08/2/2020"
	},
	[WORLDS_WRONG] : {
		src: './worldsWrong.txt', 
		text: '', 
		title:"What's Wrong with the World",
		date: "07/2/2020"
	},
}


export default function () {
	const [articles, setArticles] = React.useState(articlesMap)
	const [currentArticle, setCurrentArticle] = React.useState(PROGRAMMING_INHERITANCE);
	const [titleMenueEl, setTitleMenueEl] = React.useState<null | HTMLElement>(null);

	const openTitleMenu = (event:{currentTarget:HTMLElement}) => {
	    setTitleMenueEl(event.currentTarget);
	};
    const closeTitleMenue = function(selectedArticle:string|null) {
    	if(selectedArticle) { setCurrentArticle(selectedArticle);}
    	setTitleMenueEl(null);
    }
	
	React.useEffect(()=>{
		Promise.all(Object.keys(articlesMap).map(function(key:string){
			return fetch(articlesMap[key].src)
						.then(response => response.text())
						.then(text => { return { key, text } })
		})).then(function(keyTextObjectArray: {key:string, text:string}[]){
			keyTextObjectArray.forEach(function(keyText:{key:string, text:string}){
				articlesMap[keyText.key].text = keyText.text
			})

			setArticles(Object.assign({},articlesMap));
		})
	}, []);

	return <div style={{background:primaryColorBlue, position:"relative"}}>
		<Button aria-controls="customized-menu" aria-haspopup="true" variant="contained" style={MenuButtonStyle} onClick={openTitleMenu}>
			Read Others
		</Button>

		<StyledMenu
		  id="fade-menu"
		  anchorEl={titleMenueEl}
		  keepMounted
		  open={Boolean(titleMenueEl)}
		  onClose={closeTitleMenue.bind(null, null)}
		  TransitionComponent={Fade}
		>
	  		{Object.keys(articlesMap).map(function(key:string){
		  		return <MenuItem style={MenuItemStyle} key={key} onClick={closeTitleMenue.bind(null, key)} selected={currentArticle === key}>
		  					{articlesMap[key].title}
		  				</MenuItem>
		  	})}
		</StyledMenu>

		 <Article article={articles[currentArticle]} />
		
	</div>
}

const MenuItemStyle = {
	background:primaryColorBlue,
	color:"white",
}

const MenuButtonStyle = {
	position:"absolute" as "absolute",
	background:primaryColorBlue,
	color:"white",
	marginLeft:"-7px",
	boxShadow:"none",
	left: "20px",
}

const StyledMenu = withStyles({
  paper: {
  	background:primaryColorBlue,
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


