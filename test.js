"use strict"

let pipelining = require('.')

let data = [
   { id: 11, b: "name" },
   { id: 13, b: "name" },
   { id: 23, b: "age" },
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
      b: [
         {
            jj: [{
               ss: {
                  dd: [{
                     ss: 666,
                  }]
               },
            }],
         },
         {
            kk: [
               {
                  oo: {
                     dd: [{
                        ss: 666,
                     }]
                  },
               },
               {
                  ss: {
                     dd: [
                        {
                           rr: 666,
                        },
                        {
                           ss: 666,
                        }
                     ]
                  },
               }
            ],
         }
      ],
   },
]


// let a = pipelining(data, {
//    and: {
//       'id': 553,
//       'b.*.kk.*.ss.dd.*.ss': 666,
//    },
//    or: {
//       'id': 553,
//       'b.*.kk.*.ss.dd.*.ss': 666,
//    },
//    in: {
//       'id': [553, 8881],
//       'b.*.kk.*.ss.dd.*.ss': [666, 2323],
//    },
//    join: {
//       'data': [],
//       'path': {
//          'b.*.kk.*.ss.dd.*.ss': 'k.*.kk.*.ss.dd.*.ss',
//       },
//    },
//    set: {
//       'jid': 8888,
//       'hxs': 484848,
//    },
//    sort: {
//       'a.b.*.s': 'DESC',
//       'a.x.*.s': 'DESC'
//    },
//    limit: 12,
// })

// console.log(a)


let b = pipelining(data)
   // .and({
   //    'id': 553,
   //    'b.*.kk.*.ss.dd.*.ss': 666,
   // })
   // .or({
   //    'id': 553,
   //    'b.*.kk.*.ss.dd.*.ss': 666,
   // })
   // .in({
   //    'id': [553, 8882321],
   //    'b.*.kk.*.ss.dd.*.ss': [666, 23231],
   // })
   .group('id')
   .join(data, { 'id': 'id' })
// .set({
//    'jid': 8888,
//    'hxs': 484848,
// })


console.log(b.data)


// let c = pipelining(data).group('id','b.*.kk.*.ss.dd.*.ss')

// console.log(c.data)