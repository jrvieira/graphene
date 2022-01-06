module.exports = graphene

const cluster = require('cluster')
const cores = require('os').cpus().length

// node --max-old-space-size=16384 simulation -amp -top -debug
let freemem = require('os').freemem()/1024/1024
require('v8').setFlagsFromString('--max-old-space-size='+Math.floor(freemem/cores))

if (!process.argv.includes('-debug')) console.log = function () {}

function graphene (f, s = 100, top = Infinity) {

   top = process.argv.includes('-top') ? process.stdout.rows - 3 : top

	if (cluster.isMaster) {

		if (top < 1) {
			console.info('no rows')
			return false
		}

		let results = new Map()

		let workers = {
			made: 0,
			done: 0
		}

		console.info('\x1Bc')

		process.stdout.write('\r\x1b[Ksampling...')

		while (workers.made ++ < cores) { console.log(`fork ${workers.made}/${cores}`)

			let worker = cluster.fork()

			worker.on('message', (m) => {

					results.set(m, results.has(m) ? results.get(m) + 1 : 1)

			})

			worker.on('exit', (code, signal) => {

				workers.done ++

				if (code !== 0 || signal) {

					throw new Error(`worker interrupted: ${code} \n ${signal}`)

				} else { console.log(`done ${workers.done}/${cores}`)

					if (workers.done === cores) {
						process.stdout.write('\r\x1b[Ksampling done\n')
						visualize()
						process.exit()
					}

				}

			})

		}

		function visualize () { console.log('printing')

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

	} else { console.log('sampling')

		let n = Math.ceil(s/cores)

		while (n -- > 0) {
			process.send(f())
		}

		process.exit()

	}

}
