/*

How many random packs of X items we have to buy to complete a collection of Y

*/

let X = 24
let Y = 2

const graph = require('../lib/graphene')

let times = 0
let collection = new Set()

function buy (max = X) {
  	max = Math.floor(max)

  	let pack = Y

  	while (pack --) {
		collection.add(Math.floor(Math.random() * max) + 1)  		
  	}
	
	times ++
	if (collection.size >= max) {
		let result = times
		times = 0
		collection.clear()
		return result
	} else {
		return buy(max)
	}
}

graph(buy, Number(process.argv[2]) || 1000000)
