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

let data = jsonPath(product).get('$.b.s', "age")

console.log(data)

// jsonPath(product).set('$.uid', 553)