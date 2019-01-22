/** @module */

import FileUtil from './file'
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

  /**
   * 执行async方法
   * @param method {function} async方法
   * @param errCb {function} 发生错误的回调
   * @param exitIfFinish {boolean} async方法执行完是否退出 default: true
   * @param logErr {boolean} 是否打印错误日志 default: true
   */
  static startAsync (method, errCb = null, exitIfFinish = true, logErr = true) {
    method().then(() => {
      exitIfFinish === true && process.exit(0)
    }).catch(async (err) => {
      logErr === true && logger.error(err)
      errCb && (await errCb())
    })
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
