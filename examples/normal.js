const graph = require('../lib/graphene')

// Standard Normal variate using Box-Muller transform.
function boxmuller() {
	
	let u = Math.random()
	let v = Math.random()

	return Math.floor(10 * Math.sqrt( - 2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ))
}

graph(boxmuller, Number(process.argv[2]) || 1000000)