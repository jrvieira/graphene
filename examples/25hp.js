/*

This is the famous 25 Horses Puzzle: Given 25 horses and 5 race tracks (no timer), how many races do you have to run to select the top 3 horses?
You can modulate the variables in the set object to test different variants of the simulation.

*/

const graph = require('../lib/graphene')

// SETUP

const set = {
	total: 25, // total number of horses
	racers: 5, // max number of horses per race
	top: 3, // how many horses to qualify
	samples: Number(process.argv[2]) || 0,
	pick: 'random'
}

// GLOBAL

let all = {
	get podium () {
		return new Set([...all.horses].filter(horse => horse.podium === true))
	}
}

let make = {}

// HORSE

all.horses = new Set()

function Horse (n) { //console.log('horse', n, all.horses.size)
	// static props
	this.n = n
}

Horse.prototype = {
	// dynamic props
	get rels () {
		return new Set([...all.rels].filter(rel => rel.horses.has(this)))
	},
	get fasterthan () {
		return new Set([...this.rels].filter(rel => rel.fast === this).map(rel => rel.slow))
	},
	get slowerthan () {
		return new Set([...this.rels].filter(rel => rel.slow === this).map(rel => rel.fast))
	},
	get out () {
		return this.slowerthan.size >= set.top
	},
	get podium () {
		return this.fasterthan.size >= set.total - set.top
	},
	beat: function (horses) {
		for (let horse of horses) {
			make.rel(this, horse)
		}
	}
}

make.horse = function (n) {
	// typecheck
	if (typeof n !== 'number') throw new TypeError()
	// make horse
	all.horses.add(new Horse(n))
}

// REL

all.rels = new Set()

function Rel (fast, slow) { console.log('rel', all.rels.size, fast.n, slow.n)
	// static props
	this.fast = fast
	this.slow = slow
	this.horses = new Set([fast, slow])
}

Rel.prototype = {
	// dynamic props
}

make.rel = function (fast, slow) { console.log('rel', '.', fast.n, slow.n)
	// typecheck
	if (!(fast instanceof Horse && slow instanceof Horse)) throw new TypeError()
	if (fast === slow) throw new Error('dupe horse')
	// dupe check
	let same = [...fast.rels].filter(rel => rel.horses.has(slow))
	if (same.length) {
		if (same.length > 1) throw new Error('dupe rel')
		if (same[0].fast !== fast) throw new Error('inconsistent rel')
	} else {
		// make rel
		all.rels.add(new Rel(fast, slow))
	}
}

// RACE

all.races = new Set()

function Race (racers) { console.log('race', all.races.size, ...[...racers].map(racer => racer.n))
	// static props
	this.racers = racers
	this.sorted = [...racers].sort((h, hh) => h.n - hh.n)
	while (this.sorted.length) {
		this.sorted.pop().beat(this.sorted)
	}
}

Race.prototype = {
	// dynamic props
}

make.race = function (racers) {
	if (!(racers instanceof Set)) throw new TypeError()
	if (racers.size === 0) throw new Error()
	if (racers.size > set.racers) throw new Error()
	all.races.add(new Race(racers))
}

// CYCLE

function cycle () { console.log('+ cycle', [...all.podium].sort((h, hh) => h.fasterthan.size - hh.fasterthan.size))
	// propagate rels
	for (let rel of all.rels) {
		rel.fast.beat(rel.slow.fasterthan)
	}
	// race
	make.race(pick[set.pick])
	// check podium
	let podium = all.podium
	if (podium.size < set.top) {
		return cycle()
	} else {
		if (podium.size > set.top) throw new Error('podium.size >', set.top)
		for (horse of podium) {
			if (horse.n <= set.total - set.top) throw new Error('wrong podium', podium)
		}
		let result = all.races.size
		reset()
		return result
	}
}

// INIT

let n = set.total
while (n) {
	make.horse(n)
	n --
}
shuffle()

function reset () {
	all.rels = new Set()
	all.races = new Set()
	shuffle()
}

function shuffle () { console.log('shuffling')
	let a = [...all.horses]
	let s = new Set()
	while (a.length) {
		s.add(a.splice([Math.floor(Math.random() * a.length)],1)[0])
	}
	all.horses = s
}

// PICK RACERS

let pick = {
	// random
	get random () {
		shuffle()
		let racers = new Set([...all.horses].filter(horse => horse.out === false).slice(- set.racers))
		return racers
	},
	get beta () {
		return new Set([...all.horses].filter(horse => horse.out === false).sort((h, hh) => h.slowerthan.size - hh.slowerthan.size).slice(- set.racers))
	},
	// race less reld
	get less () {
		return new Set([...all.horses].filter(horse => horse.out === false).sort((h, hh) => h.rels.size - hh.rels.size).slice(0, set.racers))
	}
}

// RUN

graph(cycle, set.samples || 100)
