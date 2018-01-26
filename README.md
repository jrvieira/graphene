# graphene
cli graphs

## Example

**graphene** produces a cli graph based on a collection of samples of a function that returns a number

```javascript
/* sample.js */

const graphene = require('graphene')

// Function that returns a pseudo-random number.
function boxmuller() {
	
	let u = Math.random()
	let v = Math.random()

	return Math.floor(10 * Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v ))
}

// By using the Box-Muller transform, a normal distribution is expected
graphene(boxmuller, Number(process.argv[2]))

```

Running:
```shell
node sample 1000000 -amp
```

We get something like:
```
-50 |                                                                                                   2
-49 |                                                                                                   1
-48                                                                                                 
-47                                                                                                 
-46 |                                                                                                   1
-45 |                                                                                                   1
-44 |                                                                                                   1
-43 |                                                                                                   7
-42 |                                                                                                   5
-41 |                                                                                                  16
-40 |                                                                                                  16
-39 |                                                                                                  19
-38 |                                                                                                  33
-37 |                                                                                                  51
-36 |                                                                                                  71
-35 |                                                                                                 114
-34 |                                                                                                 158
-33 |                                                                                                 206
-32 |                                                                                                 287
-31 |                                                                                                 395
-30 ||                                                                                                512
-29 ||                                                                                                678
-28 |||                                                                                               950
-27 |||                                                                                              1193
-26 ||||                                                                                             1575
-25 |||||                                                                                            1993
-24 |||||||                                                                                          2525
-23 ||||||||                                                                                         3263
-22 ||||||||||                                                                                       3961
-21 ||||||||||||                                                                                     4759
-20 |||||||||||||||                                                                                  6012
-19 ||||||||||||||||||                                                                               7304
-18 ||||||||||||||||||||||                                                                           8854
-17 |||||||||||||||||||||||||                                                                       10092
-16 |||||||||||||||||||||||||||||                                                                   12037
-15 ||||||||||||||||||||||||||||||||||                                                              13908
-14 |||||||||||||||||||||||||||||||||||||||                                                         15973
-13 ||||||||||||||||||||||||||||||||||||||||||||                                                    18388
-12 ||||||||||||||||||||||||||||||||||||||||||||||||||                                              20543
-11 |||||||||||||||||||||||||||||||||||||||||||||||||||||||                                         22934
-10 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||                                   25360
 -9 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||                             27927
 -8 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||                        30147
 -7 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||                   32166
 -6 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||              34118
 -5 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||          36001
 -4 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||      37277
 -3 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||    38451
 -2 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| 39582
 -1 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| 39788
  0 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| 39757
  1 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| 39562
  2 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||   38721
  3 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||      37680
  4 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||          35702
  5 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||             34543
  6 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||                   32150
  7 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||                        30118
  8 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||                             27764
  9 |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||                                   25420
 10 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||                                        23039
 11 ||||||||||||||||||||||||||||||||||||||||||||||||||                                              20626
 12 ||||||||||||||||||||||||||||||||||||||||||||                                                    18329
 13 |||||||||||||||||||||||||||||||||||||||                                                         16160
 14 ||||||||||||||||||||||||||||||||||                                                              14056
 15 |||||||||||||||||||||||||||||                                                                   11876
 16 |||||||||||||||||||||||||                                                                       10344
 17 |||||||||||||||||||||                                                                            8604
 18 ||||||||||||||||||                                                                               7282
 19 |||||||||||||||                                                                                  6050
 20 ||||||||||||                                                                                     4794
 21 ||||||||||                                                                                       3954
 22 ||||||||                                                                                         3171
 23 ||||||                                                                                           2445
 24 |||||                                                                                            1974
 25 ||||                                                                                             1580
 26 |||                                                                                              1195
 27 |||                                                                                               921
 28 ||                                                                                                668
 29 ||                                                                                                502
 30 |                                                                                                 373
 31 |                                                                                                 288
 32 |                                                                                                 213
 33 |                                                                                                 141
 34 |                                                                                                 133
 35 |                                                                                                  59
 36 |                                                                                                  52
 37 |                                                                                                  28
 38 |                                                                                                  27
 39 |                                                                                                  16
 40 |                                                                                                   9
 41 |                                                                                                  10
 42 |                                                                                                   3
 43 |                                                                                                   2
 44 |                                                                                                   1
 45                                                                                                 
 46 |                                                                                                   1
 47                                                                                                 
 48 |                                                                                                   2
 49
 50 |                                                                                                   1
```

## Flags
```shell
-top    limit output to x top values, where x is the number of lines available at the current terminal.
-amp    stretch the graph so that the max value occupies the full width of the current terminal. by default, bars stay proportional to the total number of samples.
-1      limit process to the node standard, currently 1 core @ 512mb on 32-bit systems or 1gb on 64-bit systems.
```


###### Licensed under MIT
