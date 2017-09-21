"use strict"

/**
 * 构造函数
 * @param {Array|Object} data 导入数据
 * @param {options} path 选项
 */
function jsonPath(data, options) {
   for (let key in options) {
      data = Method[key](data, options[key])
   }
   return data
}

let Method = {
   recursion(path) {
   },
   filter(data, options) {

      // path解析
      let optionsArray = []
      for (let path in options) {
         optionsArray.push({
            path: path.split('.'),
            value: options[path]
         })
      }

      // 遍历选项
      for (let option of optionsArray) {

         let out = []
         let { path, value } = option

         // 遍历数据（使用for/of会导致内存溢出）
         for (let key in data) {

            let item = data[key]

            // 遍历path
            let target = item
            for (let key of path) {

               if (target[key]) {
                  target = target[key]
               } else if (key === '$') {
                  target = undefined
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

         data = out

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

module.exports = jsonPath