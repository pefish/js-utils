/** @module */

/**
 * 格式工具类
 */
export default class FormatUtil {
  /**
   * 二进制字符串转为十进制数值
   * @param binaryStr
   * @returns {number}
   */
  static binaryStrToDecimalNumber (binaryStr) {
    return parseInt(binaryStr, 2)
  }

  /**
   * buffer转datauri
   * @param ext
   * @param buffer
   * @returns {string}
   */
  static bufferToDataUri (ext, buffer) {
    return `data:image/${ext};base64,` + buffer.toString('base64')
  }

  /**
   * datauri转buffer
   * @param dataUriStr
   * @returns {{ext: *|string, buffer}}
   */
  static dataUriToBuffer (dataUriStr) {
    const regex = /^data:.+\/(.+);base64,(.*)$/
    const matches = dataUriStr.match(regex)
    const ext = matches[1]
    const data = matches[2]
    return {
      ext,
      buffer: new Buffer(data, 'base64')
    }
  }

  static stringToUtf8HexString () {
    let str = require('utf8').encode(this)
    let hex = ''
    str = str.replace(/^(?:\u0000)*/,'')
    str = str.split('').reverse().join('')
    str = str.replace(/^(?:\u0000)*/,'')
    str = str.split('').reverse().join('')

    for(let i = 0; i < str.length; i++) {
      const code = str.charCodeAt(i)
      const n = code.toString(16)
      hex += n.length < 2 ? '0' + n : n
    }

    return '0x' + hex
  }

  static utf8HexStringToString () {
    let str = ''
    let code = 0
    let hex = this.replace(/^0x/i,'')

    hex = hex.replace(/^(?:00)*/,'')
    hex = hex.split('').reverse().join('')
    hex = hex.replace(/^(?:00)*/,'')
    hex = hex.split('').reverse().join('')

    const l = hex.length

    for (let i=0; i < l; i+=2) {
      code = parseInt(hex.substr(i, 2), 16)
      str += String.fromCharCode(code)
    }

    return require('utf8').decode(str)
  }

  static urlEncode (charset = 'utf-8') {
    const urlencode = require('urlencode')
    return urlencode(this, charset)
  }

  static urlDecode (charset = 'utf-8') {
    const urlencode = require('urlencode')
    return urlencode.decode(this, charset)
  }
}