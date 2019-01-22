/** @module */
import ErrorHelper from 'p-js-error'

/**
 * 断言类
 */
export default class AssertUtil {

  /**
   * 不能为空（包括null、undefined、''）
   * @param value {any} 检测对象
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static notEmpty (value, key = null, throw_ = true) {
    if ('' === value || null === value || undefined === value) {
      if (throw_ === true) {
        throw new ErrorHelper(`notEmpty -> value: ${value}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  static _isIllegal (value) {
    let result = false
    if (JSON.stringify(value).includes('$')) {
      result = true
    }
    return result
  }

  /**
   * 至少有一个大写字母
   * @param value {any} 检测对象
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static oneUpperAtLeast (value, key = null, throw_ = true) {
    if (!/[A-Z]/.test(value)) {
      if (throw_ === true) {
        throw new ErrorHelper(`oneUpperAtLeast -> value: ${value}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 不能有空格
   * @param value {any} 检测对象
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static noSpace (value, key = null, throw_ = true) {
    if ((/\s/.test(value))) {
      if (throw_ === true) {
        throw new ErrorHelper(`noSpace -> value: ${value}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 至少一个数字
   * @param value {any} 检测对象
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static oneNumberAtLeast (value, key = null, throw_ = true) {
    if (!/[0-9]/.test(value)) {
      if (throw_ === true) {
        throw new ErrorHelper(`oneNumberAtLeast -> value: ${value}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 至少一个标点符号
   * @param value {any} 检测对象
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static oneSymbolAtLeast (value, key = null, throw_ = true) {
    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) {
      if (throw_ === true) {
        throw new ErrorHelper(`oneSymbolAtLeast -> value: ${value}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  static _isType (value, typeName) {
    if (typeof typeName === 'function') {
      return value instanceof typeName
    }
    let result = false
    switch (typeName) {
      case 'boolean':
        result = (typeof value === typeName)
        break
      case 'string':
        result = (typeof value === 'string')
        break
      case 'number':
        result = (typeof value === 'number') && !isNaN(Number(value))
        break
      case 'integer':
        result = (typeof value === 'number') && Number.isInteger(Number(value))
        break
      case 'object':
        if (value instanceof Object) {
          result = true
        } else {
          result = false
        }
        break
      case 'array':
        result = value instanceof Array
        break
    }
    return result
  }

  /**
   * 能够强转
   * @param value {any} 检测对象
   * @param expectValue {string} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static canCast (value, expectValue, key = null, throw_ = true) {
    let result = false
    switch (expectValue) {
      case 'number':
        result = !isNaN(Number(value))
        break
      case 'integer':
        result = !isNaN(Number(value)) && Number.isInteger(Number(value))
        break
      case 'bignumber':
        try {
          const BigNumber = require('bignumber.js')
          const num1 = new BigNumber(value)
          result = true
        } catch (err) {
          result = false
        }
        break
    }
    if (result === false) {
      if (throw_ === true) {
        throw new ErrorHelper(`canCast -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 判断类型
   * @param value {any} 检测对象
   * @param expectValue {string} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static isType (value, expectValue, key = null, throw_ = true) {
    let result = false
    if (expectValue instanceof Array) {
      result = expectValue.some((type_) => {
        if (this._isIllegal(value)) {
          return false
        }
        return AssertUtil._isType(value, type_)
      })
    } else {
      result = AssertUtil._isType(value, expectValue)
    }
    if (result === false) {
      if (throw_ === true) {
        throw new ErrorHelper(`isType -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 检测注入
   * @param value {any} 检测对象
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static noInject (value, key = null, throw_ = true) {
    ['=', '{', '}', ',', ';', '|', '>', '<', '/', '"', '[', ']', '+', '\\'].forEach((symbol) => {
      if (value && value.toString().includes(symbol)) {
        if (throw_ === true) {
          throw new ErrorHelper(`noInject -> value: ${value}, key: ${key}`, 0)
        } else {
          return false
        }
      }
    })
    return true
  }

  /**
   * 大于指定值
   * @param value {any} 检测对象
   * @param expectValue {number} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static gt (value, expectValue, key = null, throw_ = true) {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      if (value.toString().lte(expectValue)) {
        if (throw_ === true) {
          throw new ErrorHelper(`gt -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
        } else {
          return false
        }
      }
    } else {
      if (throw_ === true) {
        throw new ErrorHelper(`gt -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 大于或等于指定值
   * @param value {any} 检测对象
   * @param expectValue {number} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static gte (value, expectValue, key = null, throw_ = true) {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      if (value.toString().lt(expectValue)) {
        if (throw_ === true) {
          throw new ErrorHelper(`gte -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
        } else {
          return false
        }
      }
    } else {
      if (throw_ === true) {
        throw new ErrorHelper(`gte -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 小于指定值
   * @param value {any} 检测对象
   * @param expectValue {number} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static lt (value, expectValue, key = null, throw_ = true) {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      if (value.toString().gte(expectValue)) {
        if (throw_ === true) {
          throw new ErrorHelper(`lt -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
        } else {
          return false
        }
      }
    } else {
      if (throw_ === true) {
        throw new ErrorHelper(`lt -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 小于或等于指定值
   * @param value {any} 检测对象
   * @param expectValue {number} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static lte (value, expectValue, key = null, throw_ = true) {
    if (typeof value === 'number' || !isNaN(Number(value))) {
      if (value.toString().gt(expectValue)) {
        if (throw_ === true) {
          throw new ErrorHelper(`lte -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
        } else {
          return false
        }
      }
    } else {
      if (throw_ === true) {
        throw new ErrorHelper(`lte -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 长度小于指定值
   * @param value {any} 检测对象
   * @param expectValue {number} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static lengthLt (value, expectValue, key = null, throw_ = true) {
    if (value.toString().length >= expectValue) {
      if (throw_ === true) {
        throw new ErrorHelper(`lengthLt -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 长度小于或等于指定值
   * @param value {any} 检测对象
   * @param expectValue {number} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static lengthLte (value, expectValue, key = null, throw_ = true) {
    if (value.toString().length > expectValue) {
      if (throw_ === true) {
        throw new ErrorHelper(`lengthLte -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 长度大于指定值
   * @param value {any} 检测对象
   * @param expectValue {number} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static lengthGt (value, expectValue, key = null, throw_ = true) {
    if (value.toString().length <= expectValue) {
      if (throw_ === true) {
        throw new ErrorHelper(`lengthGt -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 长度大于或等于指定值
   * @param value {any} 检测对象
   * @param expectValue {number} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static lengthGte (value, expectValue, key = null, throw_ = true) {
    if (value.toString().length < expectValue) {
      if (throw_ === true) {
        throw new ErrorHelper(`lengthGte -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 是否以指定字符串开头
   * @param value {any} 检测对象
   * @param expectValue {string} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static startsWith (value, expectValue, key = null, throw_ = true) {
    if (!value.toString().startsWith(expectValue)) {
      if (throw_ === true) {
        throw new ErrorHelper(`startsWith -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 长度等于指定值
   * @param value {any} 检测对象
   * @param expectValue {number} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static lengthEq (value, expectValue, key = null, throw_ = true) {
    if (expectValue instanceof Array) {
      if (!expectValue.includes(value.toString().length)) {
        if (throw_ === true) {
          throw new ErrorHelper(`lengthEq -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
        } else {
          return false
        }
      }
    } else {
      if (value.toString().length !== expectValue) {
        if (throw_ === true) {
          throw new ErrorHelper(`lengthEq -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
        } else {
          return false
        }
      }
    }
    return true
  }

  /**
   * 元素存在于指定数组中
   * @param value {any} 检测对象
   * @param expectValue {array} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static in (value, expectValue, key = null, throw_ = true) {
    if (!expectValue.includes(value)) {
      if (throw_ === true) {
        throw new ErrorHelper(`in -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 强等于
   * @param value {any} 检测对象
   * @param expectValue {any} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static is (value, expectValue, key = null, throw_ = true) {
    if (value !== expectValue) {
      if (throw_ === true) {
        throw new ErrorHelper(`is -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }

  /**
   * 是否是某自定义类型，如email、mobile
   * @param value {any} 检测对象
   * @param expectValue {string} 期望值
   * @param key {string} 表示检测对象的key
   * @param throw_ {boolean} 是否抛错
   * @returns {boolean}
   */
  static isCustomType(value, expectValue, key = null, throw_ = true) {
    const regexList = {
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      mobile: /^1[34578]\d{9}$/,
    }
    let result
    if (expectValue instanceof Array) {
      result = expectValue.map(regex => regexList[regex]).some(regex => regex.test(value))
    } else {
      result = regexList[expectValue].test(value)
    }

    if (result === false) {
      if (throw_ === true) {
        throw new ErrorHelper(`isCustomType -> value: ${value}, expectValue: ${expectValue}, key: ${key}`, 0)
      } else {
        return false
      }
    }
    return true
  }
}
