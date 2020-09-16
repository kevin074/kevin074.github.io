export const GraphNodes = function(value, maxConnections, adjacent){
	return {
		value,
		maxConnections,
		adjacent : adjacent ? adjacent : [],
	}
}