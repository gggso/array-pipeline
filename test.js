"use strict"

let jsonPath = require('./index')

let product = [
   { uid: 11, b: "name" },
   { uid: 88, b: "name" },
   { uid: 23, b: "age" },
   { uid: 342454, b: "age" },
   { uid: 88, b: "test" },
   { uid: 553, b: "pp", c: undefined },
]


let getData = jsonPath(product, {
   filter: {
      'uid': 342454,
      'b': "age",
   },
   // set: {
   //    'jid': 8888,
   //    'hxs': 484848,
   // }
})


console.log(getData)