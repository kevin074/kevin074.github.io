import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

export type ArticlesMap = { [key:string]: 
	{src:string, text:string, title:string, date:string} 
} 

interface Props {
	article:ArticlesMap[string]
}

export default function Article ({article}: Props) {
	const {src, text,title, date} = article
	if(!src) return null;
	
	return <article style={{width:"60%", margin: "0px auto", fontSize:'20px', padding:"100px 100px", background:"rgb(255,255,255,0.9)"}}>
		<section className="titleDiv" style={{marginBottom: "50px"}}>
			<h4>{title}</h4>
			<div style={{marginTop:"20px"}}> By: Kevin Tseng </div>
			<div> Published: {date} </div>
		</section>
		{ 
			text.split('\n\t').map(function(line:string, index:number){
				return <div key={index} style={{marginBottom: "10px", lineHeight:"2em"}}><Indent />{line}</div>
			})
		}
	</article>
}

const Indent = function (){ return <span style={{fontSize:"4em"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>};
