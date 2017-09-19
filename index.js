"use strict"

/**
 * 导入待处理数据
 * @param {Array|Object} data 导入数据
 * @param {String} path 数据路径
 */
function jsonPath(data, path) {
   return new Method(data)
}

class Method {
   constructor(data) {
      this.data = data
   }
   get(path, value) {
      let pathArray = path.split('.')
      let target = this.data
      for (let key of pathArray) {
         if (target[key]) {
            target = target[key]
         } else if (key === '$') {
            for (let itme of target) {
               itme = 666
            }
            break
         } else {
            target = undefined
            break
         }
      }
      return target
   }
   set(path, value) {
      return { path, value }
   }
}

module.exports = jsonPath