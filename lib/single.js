module.exports = graphene

function sampling (v) {
	process.stdout.write('\r\x1b[Ksampling '+v)
}

// function that returns number
function graphene (f, s = 100, top = process.argv.includes('-top') ? process.stdout.rows - 5 : Infinity) {

	console.info('\x1Bc')

	if (top < 1) {
		console.info('no rows')
		return false
	}

	let results = new Map()
	let n = s
	while (n > 0) {
		// update sampling
		sampling(n --)
		let result = f()
		if (typeof result !== 'number') throw new TypeError(result+' is not a number')
		if (results.size < top || result > Math.min(...results.values())) {
			results.set(result, results.has(result) ? results.get(result) + 1 : 1)
		}
	}

	sampling('done\n')
	
	let rmin = Math.min(...results.keys())
	let rkey = Math.max(...results.keys())
	while (-- rkey > rmin) {
		if (!results.has(rkey)) results.set(rkey, 0)
	}

	let echo = new Map([...results].sort((r, rr) => r[0] - rr[0]))

	if (Number(top) > 0) {
		echo = new Map([...echo].sort((r, rr) => rr[1] - r[1]).slice(0, top).sort((r, rr) => r[0] - rr[0]))
	}

	let visualm = ''
	let w = process.stdout.columns - Math.max(...[...echo].map(e => String(e[0]).length)) - Math.max(...[...echo].map(e => String(e[1]).length)) - 2
	while (w --) {
		visualm += ' '
	}

	console.info('')
	for (let e of echo) {
		let r = visualm.length*e[1]/(process.argv.includes('-amp') ? Math.max(...[...echo.values()]) : s)
		let visual = ''
		while (r -- > 0) {
			visual += '|'
		}
		let x = (visualm + e[1]).slice(- Math.max(...[...echo.values()].map(v => String(v).length)))
		if (Number(x) === 0) x = ''
		console.info((visualm + e[0]).slice(- Math.max(...[...echo.keys()].map(k => String(k).length))), (visual + visualm).slice(0, visualm.length), x)
	}
	console.info('')

}
