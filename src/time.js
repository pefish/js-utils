/** @module */
import moment from 'moment'

/**
 * 时间工具类
 * 2018-03-04T22:51:40+08:00 表示 2018-03-04 22:51:40 是utc时间+8之后的时间，utc时间是2018-03-04 14:51:40
 */
export default class TimeUtil {

  /**
   * 异步
   * @param fun
   * @param interval
   * @param command
   * @param logErr
   */
  static setInterval(fun, interval, command = 1, logErr = true) {
    // 1正常运行、0停止、2忽略下一次执行
    setTimeout(async () => {
      try {
        if (command === 0) {
          // logger.error('task已停止')
        } else if (command === 1) {
          const result = await fun()
          command = (result !== undefined ? result : 1)
        } else if (command === 2) {
          command = 1
          // logger.info('此次循环被忽略')
        } else if (command === -1) {
          return  // 终止定时器
        }
      } catch (err) {
        logErr === true && logger.error(err)
      }
      TimeUtil.setInterval(fun, interval, command)
    }, interval)
  }

  /**
   * await 可同步
   * @param fun
   * @param interval
   * @param exitIfErr
   * @param logErr
   * @returns {Promise<void>}
   */
  static async setIntervalV2 (fun, interval, exitIfErr = false, logErr = true) {
    while (true) {
      try {
        const result = await fun()
        if (result === 0) {
          break
        }
      } catch (err) {
        logErr === true && logger.error(err)
        if (exitIfErr === true) {
          throw err
        }
      }
      await TimeUtil.sleep(interval)
    }
  }

  /**
   * 一直阻塞，等待信号
   * @param globalName {string} 代表信号的全局变量  0 终止阻塞  1 继续阻塞
   * @param msg
   * @returns {Promise<void>}
   */
  static async sleepSyncFor (globalName = 'signal', msg = 'blocking...') {
    while (global[globalName] === 1) {
      msg && logger.info(msg)
      await TimeUtil.sleep(3000)
    }
  }

  static async sleepFor (globalSignalName = 'signal', globalRunningNumName = 'runningNum', msg = 'blocking...') {
    global[globalSignalName] = 1 // 指示所有程序该停了
    while (global[globalRunningNumName] !== 0 && global[globalRunningNumName] !== undefined) {
      msg && logger.info(msg, `running: ${global[globalRunningNumName]}`)
      await TimeUtil.sleep(2000)
    }
  }

  static sleep (sleep) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, sleep)
    })
  }

  /**
   * utc标准时间字符串转化为时间戳
   * @param mysqlDateTime
   * @returns {number}
   */
  static utcStandardStrToTimestamp (mysqlDateTime) {
    return moment(mysqlDateTime).valueOf()
  }

  /**
   * 时间戳转换为UTC字符串
   * @param timestamp
   * @param format
   * @returns {string}
   */
  static toUtcStr (timestamp, format = 'YYYY-MM-DD HH:mm:ss:SSS') {
    return moment.utc(timestamp).format(format)
  }

  static toUtcStandardStr (timestamp) {
    return moment.utc(timestamp).toISOString(false)
  }

  /**
   * 生成utc标准时间字符串
   * @param year
   * @param month
   * @param day
   * @param hour
   * @param minute
   * @param second
   * @param millisecond
   * @param keepOffset {boolean} true的话就是2018-03-04T22:51:40.952+08:00, false就是2018-03-04T14:51:40.952Z
   * @returns {string}
   */
  static geneUtcStandardStr (year, month = 2, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0, keepOffset = true) {
    return moment.utc(new Date(year, month - 1, day, hour, minute, second, millisecond)).toISOString(keepOffset)
  }

  static toObject (timeStr) {
    return moment(timeStr).toObject()
  }

  /**
   * 生成utc时间字符串
   * @param year
   * @param month
   * @param day
   * @param hour
   * @param minute
   * @param second
   * @param millisecond
   * @param format
   * @returns {string}
   */
  static geneUtcStr (year, month = 2, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment.utc(new Date(year, month - 1, day, hour, minute, second, millisecond)).format(format)
  }

  /**
   * utc时间转化为本地时间
   * @param date Date对象或者utc标准时间字符串
   * @param format
   * @returns {string}
   */
  static toLocalStr (date, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment.utc(date).local().format(format)
  }

  /**
   * 获取现在时刻的utc标准字符串
   */
  static getCurrentUtcStandardStr (keepOffset = true) {
    return moment.utc(new Date()).toISOString(keepOffset)
  }

  /**
   * 当前时间
   * @returns {*|moment.Moment}
   */
  static now () {
    return moment()
  }

  /**
   * 时间减
   * @param momentObj {object}
   * @param num {number}
   * @param unit {string}
   * @returns {moment.Moment}
   */
  static sub (momentObj, num, unit) {
    return momentObj.subtract(num, unit)
  }

  static add (momentObj, num, unit) {
    return momentObj.add(num, unit)
  }

  /**
   * 小于
   * @param momentObj
   * @param time {Moment|String|Number|Date|Array}
   * @returns {*|boolean}
   */
  static lt (momentObj, time) {
    return momentObj.isBefore(time)
  }

  static gt (momentObj, time) {
    return momentObj.isAfter(time)
  }

  static gtAndLt (momentObj, startTime, endTime) {
    return momentObj.isBetween(startTime, endTime)
  }

  static toMomentObj (str) {
    return moment(str)
  }

  /**
   * 比较两个时间相差多少, 前者减后者
   * @param momentObj1 {object}
   * @param momentObj2 {object}
   * @param unit {string} years, months, weeks, days, hours, minutes, seconds
   * @returns {*|number}
   */
  static diff (momentObj1, momentObj2, unit) {
    return momentObj1.diff(momentObj2, unit)
  }

  static utcStandardStrToMomentObj (mysqlDateTime) {
    return moment(mysqlDateTime)
  }
}
