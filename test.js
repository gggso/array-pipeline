"use strict"

let jsonPath = require('./index')

let product = [
   { uid: 11, b: "name" },
   { uid: 123, b: "name" },
   { uid: 23, b: "age" },
   { uid: 342454, b: "age" },
   { uid: 2343, b: "test" },
   { uid: 553, b: "pp", c: undefined },
]

jsonPath(product).get('a.$.c.s')

jsonPath(product).set('a.$.c.s', 666)