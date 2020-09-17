import { unitXYinfo, DotsProps, DotProps, PointObject, PointMap } from './boardTStypes';

export function getXPosition (unitX:number, index:number):string {
	return unitX * index - 10 + 'px'
}
export function getYPosition (unitY:number, index:number):string {
	return unitY * index - 10 + 'px'
}

export function getNeighbors (id:string):string[] {
	const colI = id.indexOf('col');
	const i = parseInt(id.substring(3, colI));
	const j = parseInt(id.substring(colI+3));

	const neighbors:string[] = [];

	if( j-1 >= 0) { neighbors.push(`row${i}col${j-1}`)};
	if( i-1 >= 0) { neighbors.push(`row${i-1}col${j}`)};
	if( j+1 < 20) { neighbors.push(`row${i}col${j+1}`)};
	if( i+1 < 20) { neighbors.push(`row${i+1}col${j}`)};


	return neighbors
}

export function getNeighborsMap(id:string) {
	return getNeighbors(id).reduce( 
		function( acc:{[key:string]:boolean}, key:string) { 
			acc[key]=true; return acc 
		}, {}
	)
}

export function getUniqueNeighbors (id:string, idArray:string[]):string[] {
	const currentMap = getNeighborsMap(id);
	idArray.forEach(function(idString:string){ 
		delete currentMap[idString]
	});

	return Object.keys(currentMap);
}

export  function removeAndReAddLivesRecurr ( id:string, visited:{[key:string]: boolean}, pointMap:PointMap ) {

	if(visited[id] || !pointMap.getPoint(id)) { return };

	const idColor = pointMap.readMap(id, 'color');
	visited[id] = true;
	pointMap.setMapLeader(id, id);
	pointMap.setMapLivesWhole(id, getNeighborsMap(id));
	pointMap.setMapVisible(id, false);
	//	pointMap.setMapColor(id, null) was removed from this so that <Dot /> can have access of it for setState

	Object.keys(pointMap.readMap(id, 'lives')).forEach(function(neighborId:string){
		if(pointMap.readMap(neighborId, "color") === idColor) { removeAndReAddLivesRecurr(neighborId, visited, pointMap)}
		else {
			pointMap.setMapLives(neighborId, id)
		}
	})
}


export function countLives ( id:string, pointMap:PointMap ) {
	let stack = getNeighbors(id);
	const idColor = pointMap.readMap(id, "color");
	let idShifted = stack.shift();
	let shiftDot = null;
	const visited: {[key:string]: boolean} = {[id]: true};
	let pointColor:null|"black"|"white" = null;
	
	while (idShifted) {
		visited[idShifted] = true;
		pointColor = pointMap.readMap(idShifted, "color")
		
		if( pointColor && pointColor !== idColor) { //color has null case
			pointMap.removeMapLive(idShifted, id)
			
			if(Object.keys(pointMap.readMap(idShifted, "lives")).length === 0) {
				removeAndReAddLivesRecurr(idShifted, {}, pointMap)
			}

			else {
				pointMap.removeMapLive(id, idShifted);

				if(Object.keys(pointMap.readMap(id, "lives")).length === 0) {
					removeAndReAddLivesRecurr(id, {}, pointMap)
				}
			};

		}

		else if(pointColor === idColor) {
			stack = stack.concat(
				getNeighbors(idShifted)
					.filter( function(currentID:string) { return !visited[currentID] } )
			);

			pointMap.removeMapLive(id, idShifted);
			pointMap.removeMapLive(idShifted, id);

			Object.keys(pointMap.readMap(idShifted, 'lives')).forEach(function(key:string) {
				if(!visited[key]) { pointMap.setMapLives(id, key)}
			}) 
			
			pointMap.setMapLeader(idShifted, id);
			pointMap.setMapLivesWhole(idShifted, pointMap.readMap(id, "lives"));
		}

		idShifted = stack.shift();
	}
}

