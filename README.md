## Installation

      npm install array-pipeline --save

## 使用

> 使用方法同时支持函数和对象声明两种风格。

> path中的“*”号通配符表示匹配当前路径下数组中的所有key，即匹配数组中的每个子项，同时也可以通过指定具体的key来精确匹配某个单项。

    let pipeline = require('array-pipeline')
   
    // 使用对象表达式风格
    let result = pipeline(data, options)

    // 使用函数风格
    let { data } = pipeline(data).filter(options)

## 选项或方法

数据以管道流的方式依次传递，一个方法执行完后，会将处理结果转给下一个方法。

### filter

> and方法的别名

### and

> 提取同时满足所有条件的数据

### or

> 提取仅满足一个或多个条件的数据

### in

> in相当于在and基础上提供了多值验证。以数组的方式定义多个匹配值，只要命中其中之一，即表示匹配。

### group

> 按照指定的键路径对数据进行分组，路径中不能包含*号。

> 需要注意的是分组后的数组将被转为对象结构，因此会脱离管道流，但对于分组而言对象结构更有利于后续处理。

### join

> 用于按条件合并两个数组，类似sql数据库的join操作，将两个数组通过公共键合并为一个数组。

### set

> 搜索符合条件的path，执行批量替换操作，如果值不存在时会创建新的key/value

### sort

> 数组排序，支持多列排序和嵌套数组排序。多层嵌套数组排序不会改变父级顺序，只是对多个嵌套数组本身的排序

### limit

> 限制返回处理结果数量

## 示例

### 测试数据

      let data = [
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

      let test = pipeline(data, {
         filter: {
            'id': 553,
            'b.*.kk.*.ss.dd.*.ss': 666,
         },
         and: {
            'id': 553,
            'b.*.kk.*.ss.dd.*.ss': 666,
         },
         or: {
            'id': 553,
            'b.*.kk.*.ss.dd.*.ss': 666,
         },
         in: {
            'id': [553, 8881],
            'b.*.kk.*.ss.dd.*.ss': [666, 2323],
         },
         join: {
            'data': [],
            'path': {
               'b.*.kk.*.ss.dd.*.ss': 'k.*.kk.*.ss.dd.*.ss',
            },
         },
         set: {
            'jid': 8888,
            'hxs': 484848,
         },
         sort: {
            'id': 'DESC',
            'cid': 'DESC',
            'b.*.xx': 'ASE',
            'b.*.kk.*.ss.dd.*.xx': 'ASE',
            'oo.o1': 'DESC'
         },
         limit: 12,
      })

      console.log(test)

### 使用链式风格

      let { data } = pipeline(data)
         .filter({
            'id': 553,
            'b.*.kk.*.ss.dd.*.ss': 666,
         })
         .and({
            'id': 553,
            'b.*.kk.*.ss.dd.*.ss': 666,
         })
         .or({
            'id': 553,
            'b.*.kk.*.ss.dd.*.ss': 666,
         })
         .in({
            'id': [553, 8881],
            'b.*.kk.*.ss.dd.*.ss': [666, 2323],
         })
         .set({
            'jid': 8888,
            'hxs': 484848,
         })

      console.log(data)

