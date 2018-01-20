"use strict"

/**
 * 构建方法
 * @param {Array|Object} data 导入数组
 * @param {options} path 选项参数
 */
function pipelining(data, options) {
   let methods = new Methods(data)
   // 选项模式
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
 * 递归path，获取path对应值
 * @data {*}  数据
 * @pathArray {Array} 数据路径
 */
function pathData(data, pathArray = []) {
   if (data instanceof Object) {
      for (let key in pathArray) {
         let name = pathArray[key]
         // 精确匹配对象中的key
         if (data[name]) {
            return pathData(data[name], pathArray.slice(Number(key) + 1))
         }
         // 模糊匹配数组中的key
         else if (name === '*' && data instanceof Array) {
            pathArray = pathArray.slice(Number(key) + 1)
            for (let subKey in data) {
               let item = data[subKey]
               let subData = pathData(item, pathArray)
               if (subData) {
                  return subData
               }
            }
         }
         // key不存在
         else {
            return undefined
         }
      }
   } else {
      return data
   }
}

/**
 * options预处理
 * 将options对象转为数组类型，分解options中的path为数组
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
   and(options) {

      let data = []

      let optionsArray = pathToArray(options)

      // 遍历数据列表
      for (let item of this.data) {

         let isMatch = true

         // 遍历选项
         for (let option of optionsArray) {

            let { pathArray, value } = option

            let current = pathData(item, pathArray)

            // 比对最终结果是否匹配，只要有一个条件不符合就停止
            if (current !== value) {
               isMatch = false
               break
            }

         }

         if (isMatch) {
            data.push(item)
         }

      }

      this.data = data

      return this
   }
   /**
    * in相当于在and基础上提供了多值验证。以数组的方式定义多个匹配值，只要命中其中之一，即表示匹配。
    */
   in(options) {

      let data = []

      let optionsArray = pathToArray(options)

      // 遍历数据列
      for (let item of this.data) {

         let isMatch = true

         // 遍历选项
         for (let option of optionsArray) {

            let { pathArray, value } = option

            let current = pathData(item, pathArray)

            if (value.indexOf(current) === -1) {
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
    * 提取仅满足一个或多个条件的数据
    */
   or(options) {

      let data = []

      let optionsArray = pathToArray(options)

      // 遍历数据列
      for (let item of this.data) {

         // 遍历选项
         for (let option of optionsArray) {

            let { pathArray, value } = option

            let current = pathData(item, pathArray)

            if (current === value) {
               data.push(item)
               break
            }

         }

      }

      this.data = data

      return this
   }
   /**
    * 分组
    * 按照指定的键对数据进行分组
    */
   group(path) {

      let data = {}
      let pathArray = path.split('.')
      for (let item of this.data) {
         let current = pathData(item, pathArray)
         if (current) {
            if (!data[current]) {
               data[current] = []
            }
            data[current].push(item)
         }
      }

      let dataArray = []
      for (let name in data) {
         dataArray.push(data[name])
      }

      this.data = dataArray

      return this

   }
   /**
    * 合并
    * 用于按条件合并两个数组，类似sql数据库的join操作，将两个数组通过公共键合并为一个数组。
    */
   join(data, options) {
      for (let item of this.data) {

      }
      return this
   }
   /**
    * 赋值
    * 搜索符合条件的path，执行批量替换操作，如果值不存在时会创建新的key/value
    */
   set(options) {

      let optionsArray = pathToArray(options)

      for (let item of this.data) {
         for (let key in options) {
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
                        current = pathData(current, pathArray, key)
                     }
                     break
                  } else {
                     current = undefined
                     break
                  }
               }

            }
         }
      }

      return this
   }
}

module.exports = pipelining