export interface unitXYinfo {
	unitX:number,
	unitY:number,
	topOffset:number
}

export interface DotsProps {
	unitXYinfo: unitXYinfo
};

export interface DotProps { 
	unitX:number, unitY:number ,num1:number, num2:number, 

	currentColor:'black' | 'white' | null, 
	toggleColor:() => void, 
	setWinner:(val: "black" | "white" | null) => void ,
	winner:"black" | "white" | null,
	addWhitesRemoved:() => void, 
	addBlacksRemoved:() => void,
}; 

export type PointObject = {
	[key:string]:any,
	id:string,
	color: null | 'black' | 'white',
	isVisible: boolean,
	leader: string,
	lives: {[key:string]:boolean}
}

export type PointMap = {
	getPoint:		 (id:string) => PointObject|undefined ;
	readMap: 	 	 (id:string,value:string) => any;
	setMapColor: 	 (id:string,value:'white'|'black'|null) => void;
	setMapVisible: 	 (id:string,value:boolean) => void;
	setMapLeader: 	 (id:string,value:string) => void;
	setMapLives: 	 (id:string,key:string) => void;
	setMapLivesWhole: (id:string,value:{[key:string]:boolean}) => void;
	removeMapLive: 	 (id:string,key:string) => void;
	setWholeMap:	 (newMap:{[key:string]:PointObject})=>void;
	getKeys:		 () => string[];
	getDeepClone: 	 () => {[key:string]:PointObject};
}
