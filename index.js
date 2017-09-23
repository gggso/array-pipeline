"use strict"

/**
 * @param {Array|Object} data 导入数组
 * @param {options} path 选项配置
 */
function jsonPath(dataArray, options) {
   // 遍历选项并执行选项名称对应方法
   for (let name in options) {
      dataArray = new Methods(dataArray)[name](options[name])
   }
   return dataArray
}

class Methods {
   constructor(data) {
      this.data = data
      this.target
   }
   get(options) {

      let { data } = this

      // 遍历选项
      for (let path in options) {

         let value = options[path]
         let pathArray = path.split('.')

         let out = []

         // 遍历数据（只能使用for/in，for/of会导致内存溢出）
         for (let key in data) {

            let item = data[key]

            // 遍历 pathArray
            this.target = item
            for (let key in pathArray) {
               let name = pathArray[key]
               if (this.target[name]) {
                  this.target = this.target[name]// 迭代器
               } else if (name === '$') {
                  if (this.target instanceof Array) {
                     this.recursion(pathArray, key)
                  }
                  break
               } else {
                  this.target = undefined
                  break
               }
            }

            // 比对最终值
            if (this.target === value) {
               out.push(item)
            }

         }

         data = out

      }

      return data
   }
   set(assign) {

      let { data } = this

      for (let item of data) {
         for (let key in assign) {
            item[key] = assign[key]
         }
      }

      return data
   }
   recursion(pathArray, i) {

      // 遍历数据（只能使用for/in，for/of会导致内存溢出）
      for (let key in this.target) {

         // 迭代赋值
         this.target = this.target[key]

         for (i = ++i; i < pathArray.length; i++) {
            let name = pathArray[i]
            if (this.target[name]) {
               this.target = this.target[name]// 迭代器
            } else if (name === '$') {
               if (this.target instanceof Array) {
                  this.recursion(pathArray, i)
               }
               break
            } else {
               this.target = undefined
               break
            }
         }

      }

   }
}

module.exports = jsonPath