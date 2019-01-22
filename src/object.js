/** @module */

/**
 * Object工具类
 */
export default class ObjectUtil {
  static toTwoDimenArray (target, spliceNum) {
    // {
    //   a: 7,
    //   b: 6,
    //   c: 4
    // }
    // [ { a: 7, b: 6 }, { c: 4 } ]
    const entries = Object.entries(target)
    const length = entries.length
    let newArrays = [], tempObj = {}
    for (let i = 0; i < length; i++) {
      const [key, value] = entries[i]
      if (i === spliceNum * (newArrays.length + 1)) {
        newArrays.push(tempObj)
        tempObj = {}
      }
      tempObj[key] = value
      if (i === length - 1) {
        newArrays.push(tempObj)
      }
    }
    return newArrays
  }

  static removeEmpty (target) {
    for (let [key, value] of Object.entries(target)) {
      if (value === null || value === undefined) {
        delete target[key]
      }
    }
    return target
  }

  static assign (target, obj) {
    Object.assign(target, obj)
    return target
  }

  static toArray (target) {
    return Object.entries(target)
  }

  static getKeys (target) {
    return Object.keys(target)
  }

  static getValues (target) {
    return Object.values(target)
  }

  static getEntries (target) {
    return Object.entries(target)
  }

  static remove (target, key) {
    const b = {}
    Object.assign(b, target)
    delete b[key]
    return b
  }

  static has (target, key) {
    return target[key] !== undefined
  }

  /**
   * 对对象进行排序，输出结果为二维数组
   * @param obj
   * @param fun
   * @returns {Array}
   */
  static sort (obj, fun) {
    const sortable = []
    for (let [key, value] of Object.entries(obj)) {
      sortable.push([key, value])
    }
    sortable.sort(fun)
    return sortable
  }

  /**
   * 深copy
   * @param target
   * @returns {*}
   */
  static deepCopy (target) {
    return Object.assign({}, target)
  }

  /**
   * 取对象中的值
   * @param target {object} 目标对象
   * @param arrKey {array} example: ['one', 'two']
   * @returns {*} example: target['one']['two']
   */
  static getValueFromArrKey (target, arrKey) {
    let result = target
    arrKey.forEach((key) => {
      result = result[key]
    })
    return result
  }
}
