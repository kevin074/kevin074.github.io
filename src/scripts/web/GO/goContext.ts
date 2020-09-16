import React from 'react';
export const BoardContext = React.createContext<BoardContext>({
	color: 'black',
	toggleColor: ()=>{},
	winner:null,
	setWinner: (val:("black" | "white" | null))=>{},	
	addWhitesRemoved: ()=>{}, 
	addBlacksRemoved: ()=>{}

});

type BoardContext = {
	color: "black" | "white";
	toggleColor: ()=>void;
	winner:"black" | "white" | null;
	setWinner: (val:("black" | "white" | null))=>void;
	addWhitesRemoved: ()=>void, 
	addBlacksRemoved: ()=>void
}