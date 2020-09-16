import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

const MENTALITY = 'mentality';
const PROGRAMMING_INHERITANCE = 'programmingInheritance';
const WEB_ACCOUNTABILITY = 'webAccountability';
const WORLDS_WRONG = 'worldsWrong';
const COMPETITION_AND_PROGRAMMING = 'competitionAndProgramming'

type ArticlesMap = { [key:string]: 
	{src:string, text:string, title:string} 
} 

const articlesMap:ArticlesMap = {
	[COMPETITION_AND_PROGRAMMING]: {src:'./CompetitionAndProgramming.txt', text : '', title: "Looking at Programming Through the Lens of Competitive Gaming"},
	[MENTALITY] : {src: './Mentality.txt', text: '', title:"The Mentality for Improving"},
	[PROGRAMMING_INHERITANCE] : {src: './programmingInheritance.txt', text: '', title:"The Irony of Constant Innovation"},
	[WEB_ACCOUNTABILITY] : {src: './webAccountability.txt', text: '', title:'Accountability on the Internet'},
	[WORLDS_WRONG] : {src: './worldsWrong.txt', text: '', title:"What's Wrong with the World"},
}

function Article (props:{article:ArticlesMap[string]}) {
	if(!props.article) return null;
	
	return <article style={{width:"80%", margin: "0 auto", fontSize:'20px'}}>
		{ 
			props.article.text.split('\n\t').map(function(line:string, index:number){
				return <div key={index} style={{marginBottom: "10px", lineHeight:"2em"}}><Indent />{line}</div>
			})
		}
	</article>
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

	return <div>

		<h1>
			<Button aria-controls="customized-menu" aria-haspopup="true" variant="contained" color="primary" onClick={openTitleMenu}>
				{articlesMap[currentArticle].title}
			</Button>
		</h1>

		<Menu
		  id="fade-menu"
		  anchorEl={titleMenueEl}
		  keepMounted
		  open={Boolean(titleMenueEl)}
		  onClose={closeTitleMenue.bind(null, null)}
		  TransitionComponent={Fade}
		>
	  		{Object.keys(articlesMap).map(function(key:string){
		  		return <MenuItem key={key} onClick={closeTitleMenue.bind(null, key)} selected={currentArticle === key}>
		  					{articlesMap[key].title}
		  				</MenuItem>
		  	})}
		</Menu>

		 <Article article={articles[currentArticle]} />
		
	</div>
}

const Indent = function (){ return <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>};
