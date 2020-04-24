const graph = require('../lib/graphene')

let run = function (word = 0) {
   let key = Math.floor(Math.random()*27)
   return key ? run(++word) : word
}

graph(run, Number(process.argv[2] || 100000))
