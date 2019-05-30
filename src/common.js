/** @module */

import FileUtil from '../../js-util-file/src/file'
import path from 'path'
import ErrorHelper from 'p-js-error'

/**
 * 公共工具类
 */
export default class CommonUtil {

  static getErrorMessage (code) {
    for (let [errorMessage, errorCode] of Object.entries(require('../constants/error_codes').default)) {
      if (errorCode === code) {
        return errorMessage
      }
    }
    return null
  }

  static onExiting (onExiting) {
    process.on('SIGINT', () => {
      onExiting()
    })
  }

  static getAppName () {
    return require(path.join(FileUtil.getStartFilePath(), 'package.json'))['name']
  }

  static getAppVersion () {
    return require(path.join(FileUtil.getStartFilePath(), 'package.json'))['version']
  }

  static getAppValueByKey (key) {
    return require(path.join(FileUtil.getStartFilePath(), 'package.json'))[key]
  }

  /**
   * 比较版本号
   * @param versions
   * @param type {number} 0 获取最小版本 1 获取最大版本
   */
  static compareVersion (versions, type) {
    const compareVersions = require('compare-versions')
    const sorted = versions.sort(compareVersions)
    if (type === 0) {
      return sorted.getFirstOne()
    } else if (type === 1) {
      return sorted.getLastOne()
    } else {
      throw new ErrorHelper('type指定不对')
    }
  }

  static getClassName (classObj) {
    return classObj.constructor.name
  }
}
