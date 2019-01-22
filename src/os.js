/** @module */
import ErrorHelper from 'p-js-error'
import os from 'os'

/**
 * os工具类
 */
export default class OsUtil {

  static getArgv (index) {
    //index:获取第几个参数
    return process.argv[index + 1]
  }

  static getUniqueSign () {
    return require('uuid/v1')()
  }

  static getEnv (envName) {
    return process.env[envName]
  }

  static getArgsFromConsole (schema, promptMessage = 'prompt') {
    // const schema = {
    //   properties: {
    //     password: {
    //       description: 'Enter password',
    //       type: 'string',
    //       required: true,
    //       default: 9999999,
    //       hidden: true,
    //       replace: '*',
    //     }
    //   }
    // }
    const prompt = require('prompt')
    prompt.message = promptMessage
    return new Promise((resolve, reject) => {
      prompt.get(schema, (err, result) => {
        if (err) {
          reject(new ErrorHelper('失败', 0, null, err))
        } else {
          resolve(result)
        }
      })
    })
  }

  static getPid () {
    return process.pid
  }

  static getLocalIp () {
    const ipLib = require('ip')
    return ipLib.address()
  }

  static getMachineHash () {
    const crypto = require('crypto')
    return crypto.createHash('md5').update(os.hostname()).digest('hex')
  }

  static isMac () {
    return os.platform() === 'darwin'
  }

  static isLinux () {
    return os.platform() === 'linux'
  }

  /**
   * 获取进程的所有子进程
   * @param pid {number | string}
   */
  static getChildPids (pid) {
    let cmd = `ps -jlx|awk -v ppid=${pid} 'BEGIN {} {if($4==ppid){print $4;}} END{}'`
    if (OsUtil.isMac()) {
      cmd = `ps -jlx|awk -v ppid=${pid} 'BEGIN {} {if($3==ppid){print $2;}} END{}'`
    }
    const ShellHelper = require('../helpers/shell').default
    const result = new ShellHelper(false).execSyncForResult(cmd, {
      silent: true
    })
    return result['stdout'].split('\n').removeLastOne()
  }

  /**
   * 获取进程所在的进程组id
   * @param pid
   */
  static getGip (pid) {
    // ps -o pgid= ${pid}
    let cmd = `ps -jlx|awk -v pid=${pid} 'BEGIN {} {if($4==pid){print $6;}} END{}'`
    if (OsUtil.isMac()) {
      cmd = `ps -jlx|awk -v pid=${pid} 'BEGIN {} {if($2==pid){print $4;}} END{}'`
    }
    const ShellHelper = require('../helpers/shell').default
    const result = new ShellHelper(false).execSyncForResult(cmd, {
      silent: true
    })
    return result['stdout'].removeLastEnter() || null
  }

  /**
   * 获取进程的父进程id
   * @param pid
   */
  static getParentPid (pid) {
    // ps -o ppid= ${pid}
    let cmd = `ps -jlx|awk -v pid=${pid} 'BEGIN {} {if($4==pid){print $5;}} END{}'`
    if (OsUtil.isMac()) {
      cmd = `ps -jlx|awk -v pid=${pid} 'BEGIN {} {if($2==pid){print $3;}} END{}'`
    }
    const ShellHelper = require('../helpers/shell').default
    const result = new ShellHelper(false).execSyncForResult(cmd, {
      silent: true
    })
    return result['stdout'].removeLastEnter() || null
  }

  /**
   * 杀掉整个进程组
   * @param gid
   */
  static killProcessGroup (gid) {
    const ShellHelper = require('../helpers/shell').default
    new ShellHelper(false).execSyncInSilent(`kill -1 -- -${gid}`)
  }
}
