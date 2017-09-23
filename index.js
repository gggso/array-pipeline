"use strict"

/**
 * 构造函数
 * @param {Array|Object} data 导入数据
 * @param {options} path 选项
 */
function jsonPath(data, options) {
   // 遍历选项名称执行对应数据处理方法
   for (let name in options) {
      data = Methods[name](data, options[name])
   }
   return data
}

let Methods = {
   recursion(path) {
   },
   filter(data, options) {

      // 遍历选项
      for (let path in options) {

         let value = options[path]
         let pathArray = path.split('.')

         let out = []

         // 遍历数据（只能使用for/in，for/of会导致内存溢出）
         for (let key in data) {

            let item = data[key]

            // 遍历pathArray
            let target = item
            for (let key in pathArray) {
               let name = pathArray[key]
               if (target[name]) {
                  target = target[name]// 迭代
               } else if (name === '$') {
                  if (target instanceof Array) {
                     // for (let i = key; i < pathArray.length, i++) {

                     // }
                  } else {
                     target = undefined
                     break
                  }
                  break
               } else {
                  target = undefined
                  break
               }

            }

            if (target === value) {
               out.push(item)
            }

         }

         data = out// 迭代

      }

      return data
   },
   set(data, assign) {

      for (let item of data) {
         for (let key in assign) {
            item[key] = assign[key]
         }
      }

      return data
   }
}


function recursively(data, pathArray) {

   let out = []

   // 遍历数据（使用for/of会导致内存溢出）
   for (let key in data) {

      let item = data[key]

      // 遍历pathArray
      let target = item
      for (let key of pathArray) {

         if (target[key]) {
            target = target[key]
         } else if (key === '$') {
            if (target instanceof Array) {

            } else {
               target = undefined
               break
            }
            break
         } else {
            target = undefined
            break
         }

      }

      if (target === value) {
         out.push(item)
      }

   }

   return out
}

module.exports = jsonPath