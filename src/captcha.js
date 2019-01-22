/** @module */
import RandomUtil from './random'

/**
 * 图形验证码工具类
 */
class CaptchaUtil {

  /**
   * 获取code
   * @param length
   * @returns {string}
   */
  static getCode (length) {
    let text = ''
    const chars = 'ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz'
    for (let i = 0; i < length; i++) {
      text += RandomUtil.getRandomChar(chars)
    }
    return text
  }

  /**
   * 获取图形验证码buffer
   * @param config
   * @param text {string}
   * @returns {buffer}
   */
  static getCaptchaBuffer (config = {}, text = null) {
    const ccap = require('ccap')({
      ...config,
      generate: () => {
        return text
      }
    })
    return ccap.get()[1]
  }
}

export default CaptchaUtil
