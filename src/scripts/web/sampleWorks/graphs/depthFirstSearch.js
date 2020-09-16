export function DFS (nodeList, target){
	let map = new Map();
	return recurrDPS(nodeList[0], target, map)	
}

function recurrDPS (node, target, map) {
	if(map.get(node)) return false;
	else{
		map.set(node, true);
		if(node === target) { return node; }
		else{
			let i=0;
			const end = node.adjacent.length;
			for(i; i<end; i++){
				if(recurrDPS(node.adjacent[i], target, map)){
					return node;
				}
			}
		}
	}
}