import AssertUtil from 'p-js-assert'

export default class DecoratorUtil {

  static _getValue (baseObj, arr) {
    let temp = baseObj
    for (let name of arr) {
      temp = temp[name]
    }
    return temp
  }

  static parseParams (params, allParams) {
    const result = {}
    for (let [key, value] of Object.entries(params)) {
      let realValue = value['value'] && allParams[value['value'][0]] && allParams[value['value'][0]][value['value'][1]]
      if (value['type'] === 'direct') {
        realValue = value['value']
      } else if (value['type'] === 'global') {
        realValue = DecoratorUtil._getValue(global, value['value'])
        if (value['required'] === true) {
          AssertUtil.notEmpty(realValue, key)
        }
      } else if (value['type'] === 'string') {
        if (value['required'] === true) {
          AssertUtil.isType(realValue, value['type'], key)
        } else {
          realValue && AssertUtil.isType(realValue, value['type'], key)
        }
        realValue = `${value['prefix'] || ''}${realValue}${value['postfix'] || ''}`
      } else if (value['type'] === 'array') {
        if (value['required'] === true) {
          AssertUtil.isType(realValue, value['type'], key)
        } else {
          realValue && AssertUtil.isType(realValue, value['type'], key)
        }
      }
      result[key] = realValue
    }
    return result
  }
}
