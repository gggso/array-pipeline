"use strict"

/**
 * 构建方法
 * @param {Array} data 导入数组
 * @param {options} path 选项参数
 */
function pipeline(data, options) {
   let methods = new Methods(data)
   // 对象模式
   if (options) {
      // 遍历选项并执行选项名称对应的方法
      for (let name in options) {
         if (methods[name]) {
            methods[name](options[name])
         }
      }
      return methods.data
   }
   // 管道模式
   else {
      return methods
   }
}

/**
 * options预处理，将options对象转为数组类型，分解options中的path为数组
 * @param {Object} options 
 */
function pathToArray(options) {

   let optionsArray = []
   for (let path in options) {
      optionsArray.push({
         pathArray: path.split('.'),
         value: options[path],
      })
   }

   return optionsArray

}

/**
 * 通过path取值，递归获取path对应值
 * @param {Object|Array} data 递归数据
 * @param {Array} pathArray 数据路径
 * @param {Function} func 仅包含嵌套数组时使用，每个单项的回调函数。对于内嵌数组会出现多项匹配，未定义func时为惰性匹配，定义func时根据返回值动态控制循环匹配次数，当返回值为true时会停止遍历，否则为全量匹配
 */
function pathGetValue(data, pathArray = [], func) {

   if (data instanceof Object) {

      let iteration = data

      for (let i in pathArray) {
         // 精确匹配对象或数组时，使用循环迭代
         let key = pathArray[i]
         let item = iteration[key]
         if (item instanceof Object) {
            iteration = item
         }
         // 模糊匹配数组时停止迭代，将剩余子集转交给数组逻辑处理
         else if (key === '*' && iteration instanceof Array) {
            let subPathArray = pathArray.slice(Number(i) + 1)
            if (subPathArray.length) {

               // 循环获取可能匹配到多项
               for (let item of iteration) {

                  let pathValue
                  if (item instanceof Object) {
                     pathValue = pathGetValue(item, subPathArray, func)
                  } else {
                     pathValue = item
                  }

                  if (func) {
                     // func存在时由返回值决定是否继续遍历
                     if (func(pathValue)) {
                        return pathValue
                     }
                  } else if (pathValue !== undefined) {
                     // 值不为空时停止遍历
                     return pathValue
                  }

               }

            } else {
               return iteration
            }
            break
         }
         // 非对象时停止迭代并返回结果
         else {
            return item
         }
      }
   }

}

/**
 * 多级排序
 * @param {*} array 
 * @param {*} options 
 */
function sort(array = [], options) {
   array.sort(function (a, b) {
      // 将多个sort条件叠加
      let difference
      for (let { type, path } of options) {
         let $a = a, $b = b
         // 迭代获取多层对象值
         for (let key of path) {
            if ($a instanceof Object) { $a = $a[key] }
            if ($b instanceof Object) { $b = $b[key] }
         }
         if (type === 'DESC') {
            difference = difference || $b - $a
         } else {
            difference = difference || $a - $b
         }
      }
      return difference
   })
}

class Methods {
   constructor(data = []) {
      this.data = data
   }
   /**
    * and方法的别名
    */
   filter(options) {
      this.and(options)
      return this
   }
   /**
    * 提取同时满足所有条件的数据
    */
   and(options = {}) {

      let optionsArray = pathToArray(options)

      let data = []

      // 遍历数据列表
      for (let item of this.data) {

         let isMatchAll = true

         // 遍历选项
         for (let option of optionsArray) {

            let { pathArray, value } = option

            let pathValue = pathGetValue(item, pathArray, function (item) {
               if (item === value) {
                  return item
               }
            })

            // 只要有一项没有返回值即表示不符合条件，停止遍历
            if (pathValue !== value) {
               isMatchAll = false
               break
            }

         }

         if (isMatchAll) {
            data.push(item)
         }

      }

      this.data = data

      return this
   }
   /**
    * 提取仅满足一个或多个条件的数据
    */
   or(options = {}) {

      let optionsArray = pathToArray(options)

      // 判断optionsArray是否为空的目的是当options为空时依然可以原样返回数组
      if (optionsArray.length) {

         let data = []

         // 遍历数据列
         for (let item of this.data) {

            // 遍历选项
            for (let option of optionsArray) {

               let { pathArray, value } = option

               let pathValue = pathGetValue(item, pathArray, function (item) {
                  if (item === value) {
                     return item
                  }
               })

               if (pathValue === value) {
                  data.push(item)
                  break
               }

            }

         }

         this.data = data

      }

      return this

   }
   /**
    * in相当于在and基础上提供了多值验证。以数组的方式定义多个匹配值，只要命中其中之一，即表示匹配。
    */
   in(options = {}) {

      let data = []

      let optionsArray = pathToArray(options)

      // 遍历数据列
      for (let item of this.data) {

         let isMatch = true

         // 遍历选项
         for (let option of optionsArray) {

            let { pathArray, value } = option

            let pathValue = pathGetValue(item, pathArray, function (item) {
               if (value.indexOf(item) > -1) {
                  return item
               }
            })

            if (value.indexOf(pathValue) === -1) {
               isMatch = false
               break
            }

         }

         // 比对最终值
         if (isMatch) {
            data.push(item)
         }

      }

      this.data = data

      return this
   }
   /**
    * 合并一个或多个数组
    * 用于按条件合并两个数组，类似sql数据库的join操作，将两个数组通过公共键合并为一个数组。
    */
    join(options = {}) {
      for (let item of this.data) {

      }
      return this
   }
   /**
    * 分组
    * 按照指定的键对数据进行分组
    */
   group(path) {

      let dataObj = {}
      let pathArray = path.split('.')
      for (let item of this.data) {
         let pathValue = pathGetValue(item, pathArray)
         if (pathValue) {
            if (!dataObj[pathValue]) {
               dataObj[pathValue] = []
            }
            dataObj[pathValue].push(item)
         }
      }

      let dataArray = []
      for (let name in dataObj) {
         dataArray.push(dataObj[name])
      }

      this.data = dataArray

      return this

   }
   /**
    * 批量赋值
    * 搜索符合条件的path，如果值不存在时会创建新的key/value
    */
   set(options = {}) {

      let optionsArray = pathToArray(options)

      for (let item of this.data) {

         // 遍历选项
         for (let option of optionsArray) {

            let { pathArray, value } = option

            // 每循环一次更新current
            let current = item

            // 遍历pathArray
            for (let key in pathArray) {
               let name = pathArray[key]
               if (current[name]) {
                  current = current[name]
               } else if (name === '*') {
                  if (current instanceof Array) {
                     current = pathGetValue(current, pathArray, key)
                  }
                  break
               } else {
                  current = undefined
                  break
               }
            }

         }

      }

      return this
   }
   /**
    * 排序
    */
   sort(options = {}) {

      // 参数解析与分组，合并同一个数组的多个排序条件
      let pathObj = {}
      for (let path in options) {
         let type = options[path]
         // 补全不完整的path起始路径*.
         let pathArray = ('*.' + path).split('.')
         let pathId = pathArray.lastIndexOf('*') + 1
         let pathBefore = pathArray.slice(0, pathId)
         let pathAfter = pathArray.slice(pathId)
         let pathKey = pathBefore.join('.')
         if (pathObj[pathKey]) {
            pathObj[pathKey].sort.push({
               type: type,
               path: pathAfter,
            })
         } else {
            pathObj[pathKey] = {
               path: pathBefore,
               sort: [{
                  type: type,
                  path: pathAfter,
               }],
            }
         }
      }

      // 数据获取与排序
      for (let key in pathObj) {
         let item = pathObj[key]
         let array = pathGetValue(this.data, item.path, function (array) {
            sort(array, item.sort)
         })
         sort(array, item.sort)
      }

      return this

   }
}

module.exports = pipeline