const graph = require('../lib/graphene')

let times = 0
let collection = new Set()

function buy (max = Number(process.argv[2]) || 100) {
  	max = Math.floor(max)

	collection.add(Math.floor(Math.random() * max) + 1)
	
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

graph(buy, Number(process.argv[3]) || 1000000)
