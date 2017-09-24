"use strict"

/**
 * @param {Array|Object} data 导入数组
 * @param {options} path 选项参数
 */
function jsonPath(dataArray, options) {
   let methods = new Methods(dataArray)
   // 遍历选项并执行选项名称对应方法
   for (let name in options) {
      if (methods[name]) {
         dataArray = methods[name](options[name])
      }
   }
   return dataArray
}

class Methods {
   constructor(data) {
      this.data = data
      this.target
   }
   filter(options) {

      let { data } = this

      // 选项预处理
      let optionsArray = []
      for (let path in options) {
         optionsArray.push({
            path: path.split('.'),
            value: options[path],
         })
      }

      let outData = []

      // 遍历数据列
      for (let item of data) {

         let state = true

         // 遍历选项
         for (let option of optionsArray) {

            let { path, value } = option

            // 每遍历一个选项前需要重置target
            this.target = item

            // 遍历path
            for (let key in path) {
               let name = path[key]
               if (this.target[name]) {
                  this.target = this.target[name]
               } else if (name === '$') {
                  if (this.target instanceof Array) {
                     this.target = this.recursion(this.target, path, key)
                  }
                  break
               } else {
                  this.target = undefined
                  break
               }
            }

            if (this.target !== value) {
               state = false
               break
            }

         }

         // 比对最终值
         if (state) {
            outData.push(item)
         }

      }

      this.data = outData

      return outData
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
   /**
    * 递归path
    * @param {*} path 
    * @param {*} i 
    */
   recursion(data, path, i) {

      // 遍历数据（只能使用for/in，测试for/of动态赋值时会导致内存溢出）
      for (var item of data) {

         // 遍历path
         for (i = ++i; i < path.length; i++) {
            let name = path[i]
            if (item[name]) {
               item = item[name]// 迭代器
            } else if (name === '$') {
               if (item instanceof Array) {
                  item = this.recursion(item, path, i)
               }
               break
            } else {
               break
            }
         }

      }

      return item

   }
}

module.exports = jsonPath