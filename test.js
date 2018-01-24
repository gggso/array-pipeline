"use strict"

let pipeline = require('.')

let data = [
   // { id: 13, b: "name" },
   // { id: 11, b: "kk" },
   // { id: 88, b: "test" },
   // { id: 13, b: "xxx" },
   // { id: 23, b: "age" },
   // { id: 11, b: "name" },
   // {
   //    id: 553,
   //    b: {
   //       xx: {
   //          jj: {
   //             ss: { vv: 888 }
   //          }
   //       },
   //       xxx: {
   //          jj: {
   //             ss: {
   //                vv: 666,
   //                vvv: 888,
   //             }
   //          }
   //       },
   //       s: 666
   //    }
   // },
   {
      id: 553,
      b: [
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
                           yy: 666,
                        }
                     ]
                  },
                  jj: 888
               }
            ],
            xx: 666,
            ss: 888
         },
         {
            jj: [
               {
                  ss: {
                     dd: [
                        {
                           ss: 666,
                        },
                        {
                           oo: 888,
                        }
                     ]
                  },
               }
            ],
            ss: 666,
            xx: 88,
         },
      ],
   },
   {
      id: 555,
      cid: 3,
      b: [{
         kk: [{
            ss: [{
               ss: 666,
            }],
         }],
         jj: 888,
         xx: 12
      }],
      oo: {
         o1: 99,
         o2: 81
      }
   },
   {
      id: 555,
      cid: 15,
      oo: {
         o1: 34,
         o2: 56
      }
   },
   {
      id: 555,
      cid: 666,
      oo: {
         o1: 485,
         o2: 66
      }
   },
]

// let a = pipeline(data, {
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


let b = pipeline(data)
   // .and({
   //    'id': 553,
   //    'b.*.jj.*.ss.dd.*.ss': 666,
   // })
   // .or({
   //    'id': 555,
   //    'b.*.jj.*.ss.dd.*.ss': 666,
   // })
   // .in({
   //    'id': [553, 2321],
   //    'b.*.jj.*.ss.dd.*.ss': [666, 389],
   // })
   // .set({
   //    'id': 555,
   //    'hxs': 484848,
   // })
   .group('id')
   // .join({
   //    'data': [],
   //    'path': {
   //       'b.*.kk.*.ss.dd.*.ss': 'k.*.kk.*.ss.dd.*.ss',
   //    }
   // })
   // .sort({
   //    'id': 'DESC',
   //    'cid': 'DESC',
   //    // 'b.*.xx': 'ASE',
   //    // 'b.*.kk.*.ss.dd.*.xx': 'ASE',
   //    // 'd.*.uu.*.jj.dd.*.ll': 'ASE',
   //    // 'b.*.ss': 'ASE',
   //    'oo.o1': 'DESC'
   // })

   console.log(b)
