"use strict"

/**
 * 导入待处理数据
 * @param {Array|Object} data 导入数据
 * @param {String} path 数据路径
 */
function jsonPath(data, path) {
   if (data instanceof Object) {
      if (data instanceof Array) {
         return new _Array(data)
      } else {
         return new _Object(data)
      }
   }
}

class Method {
   constructor(data) {
      this.data = data
   }
   get(path) {
      return
   }
   set(path, value) {
      return
   }
}

module.exports = jsonPath