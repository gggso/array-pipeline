"use strict"

/**
 * @param {Array|Object} data 导入数组
 * @param {options} path 选项参数
 */
function jsonPath(data, options) {
   let methods = new Methods(data)
   // 选项模式
   if (options) {
      // 遍历选项并执行选项名称对应方法
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

class Methods {
   constructor(data) {
      this.data = data
      this.target
   }
   filter(options) {
      this.and(options)
      return this
   }
   and(options) {

      let outData = []

      // 选项预处理
      let optionsArray = []
      for (let path in options) {
         optionsArray.push({
            path: path.split('.'),
            value: options[path],
         })
      }

      // 遍历数据列
      for (let item of this.data) {

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

      return this
   }
   or(options) {

      let outData = []

      // 选项预处理
      let optionsArray = []
      for (let path in options) {
         optionsArray.push({
            path: path.split('.'),
            value: options[path],
         })
      }

      // 遍历数据列
      for (let item of this.data) {

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

            if (this.target === value) {
               outData.push(item)
               break
            }

         }

      }

      this.data = outData

      return this
   }
   in(options) {

      let outData = []

      // 选项预处理
      let optionsArray = []
      for (let path in options) {
         optionsArray.push({
            path: path.split('.'),
            value: options[path],
         })
      }

      // 遍历数据列
      for (let item of this.data) {

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

            if (value.indexOf(this.target) === -1) {
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

      return this
   }
   join(options) {
      
   }
   set(assign) {

      for (let item of this.data) {
         for (let key in assign) {
            item[key] = assign[key]
         }
      }

      return this
   }
   /**
    * 递归path
    * @data {Array}  
    * @path {Array} 数据路径
    * @i {Number} path数组中指针位置
    */
   recursion(data, path, i) {

      // 遍历数据（测试for/of动态赋值时会导致内存溢出）
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