"use strict"

let jsonPath = require('./index')

let product = [
   { id: 11, b: "name" },
   { id: 88, b: "name" },
   { id: 23, b: "age" },
   { id: 342454, b: "age" },
   { id: 88, b: "test" },
   {
      id: 553,
      b: {
         xx: {
            jj: {
               ss: { vv: 888 }
            }
         },
         xxx: {
            jj: {
               ss: {
                  vv: 666,
                  vvv: 888,
               }
            }
         }
      }
   },
   {
      id: 553,
      b: [{
         kk: [{
            ss: [{
               ss: 666,
            }],
         }],
         jj: 888,
      }],
   },
   {
      id: 553,
      b: [{
         kk: [{
            ss: {
               dd: [{
                  ss: 666,
               }]
            },
         }],
      }],
   },
]


let getData = jsonPath(product, {
   filter: {
      'id': 553,
      'b.$.kk.$.ss.dd.$.ss': 666,
   },
   // filterAnd: {
   //    'id': 553,
   //    'b.$.kk.$.ss.dd.$.ss': 666,
   // },
   // filterOr: {
   //    'id': 553,
   //    'b.$.kk.$.ss.dd.$.ss': 666,
   // },
   // filterOne: {
   //    'id': 553,
   //    'b.$.kk.$.ss.dd.$.ss': 666,
   // },
   set: {
      'jid': 8888,
      'hxs': 484848,
   }
})

console.log(getData)