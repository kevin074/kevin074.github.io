export function BFS (nodeList, target){
	const visited = new Map();
	const toCheckQueue = [nodeList[0]];
	
	while(toCheckQueue.length){
		const currentNode = toCheckQueue.shift();
		
		if(visited.get(currentNode)){ continue; }

		if(currentNode.value === target.value){
			return true;
		}
		else{
			visited.set(currentNode, true);
			currentNode.adjacent.forEach(function(child){
				toCheckQueue.push(child);
			})
		}
	}
}