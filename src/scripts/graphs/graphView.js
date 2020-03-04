import React from 'react';
import {GraphNodes} from './graphNodes';
import {getRandomInt, isRandom50Percent } from '../utils';

export default function(){

	return <div>
		<button onClick={createGraph}> New Graph </button>
	</div>
}

function createGraph (){
	const size = 10;
	let nodeList = [];

	while (nodeList.length < size) {
		nodeList.push(new GraphNodes(  
				getRandomInt(0, 1000), 
				getRandomInt(1,3) 
			)
		)
	}

	const availableNodes = nodeList.slice();

	nodeList.forEach(function(node){
		const nodeIndex = nodeList.indexOf(node);
		
		while (node.maxConnections - node.adjacent.length > 0 && availableNodes.length > 1){
			const connectedNode = availableNodes[getRandomInt(0, availableNodes.length-1)];

			if(node === connectedNode || 
			   node.adjacent.includes(connectedNode) || 
			   connectedNode.adjacent.length+1 > connectedNode.maxConnections ){ continue }
			else {
				connectedNode.adjacent.push(node);
				node.adjacent.push(connectedNode);

				if(node.adjacent.length === node.maxConnections){
					availableNodes.splice(availableNodes.indexOf(node),1)
				}

				if(connectedNode.adjacent.length === connectedNode.maxConnections){
					availableNodes.splice(availableNodes.indexOf(connectedNode),1)
				}
			}	
		}
	})

	console.log(nodeList)
}