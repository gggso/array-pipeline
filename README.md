## Installation

      npm install json-pipelining --save

## 使用方法

    let pipelining = require('json-pipelining')
    
    let { error, data, $, ... } = pipelining(data, options)

## 示例

### 测试数据

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

### 使用对象表达式风格

      let test = pipelining(product, {
         filter: {
            'id': 553,
            'b.$.kk.$.ss.dd.$.ss': 666,
         },
         and: {
            'id': 553,
            'b.$.kk.$.ss.dd.$.ss': 666,
         },
         or: {
            'id': 553,
            'b.$.kk.$.ss.dd.$.ss': 666,
         },
         in: {
            'id': [553, 8881],
            'b.$.kk.$.ss.dd.$.ss': [666, 2323],
         },
         join: {
            'data': [],
            'path': {
               'b.$.kk.$.ss.dd.$.ss': 'k.$.kk.$.ss.dd.$.ss',
            },
         },
         set: {
            'jid': 8888,
            'hxs': 484848,
         },
         sort: {
            'a.b.$.s': 'DESC',
            'a.x.$.s': 'DESC'
         },
         limit: 12,
      })

      console.log(test)

### 使用链式风格

      let { data } = pipelining(product)
         .filter({
            'id': 553,
            'b.$.kk.$.ss.dd.$.ss': 666,
         })
         .and({
            'id': 553,
            'b.$.kk.$.ss.dd.$.ss': 666,
         })
         .or({
            'id': 553,
            'b.$.kk.$.ss.dd.$.ss': 666,
         })
         .in({
            'id': [553, 8881],
            'b.$.kk.$.ss.dd.$.ss': [666, 2323],
         })
         .set({
            'jid': 8888,
            'hxs': 484848,
         })

      console.log(data)

