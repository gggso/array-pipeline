"use strict"

let Tools = require('./index')

let product = [
   { uid: 11, b: "name" },
   { uid: 123, b: "name" },
   { uid: 23, b: "age" },
   { uid: 342454, b: "age" },
   { uid: 2343, b: "test" },
   { uid: 553, b: "pp", c: undefined },
]

let category = [
   { uid: 11, b: "name" },
   { uid: 123, b: "name" },
   { uid: 23, b: "age" },
   { uid: 342454, b: "age" },
   { uid: 2343, b: "test" },
   { uid: 553, b: "pp", c: undefined },
]

let outData1 = Tools(product).Array({
   filter: {
      'name.$.uid': 1,
      'name.$.b': 2,
   },
   assign: {
      data: category,
      'a.b.$.k': 'j.s',
   },
   join: {
      data: category,
      'a.b.$.k': 'j.s',
   },
   sort: 'a.b.$.s',
   limit: 12,
   toObject: 'a.b.$.s',
})



// let outData2 = Tools(product)
//    .filter({
//       'name.$.uid': 1,
//       'name.$.b': 2,
//    })
//    .assign({
//       data: category,
//       'a.b.$.k': 'j.s',
//    })
//    .join({
//       data: category,
//       'a.b.$.k': 'j.s',
//    })
//    .sort('a.b.$.s')
//    .limit(12)
//    .toObject('a.b.$.s')


// console.log(outData2)

// Tools(product).count({
//    'name.$.uid': 1,
//    'name.$.b': 2,
// })

