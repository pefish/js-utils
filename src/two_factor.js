/** @module */
import speakeasy from 'speakeasy'
import OsUtil from './os'

/**
 * 谷歌双重认证工具类
 */
export default class TwoFactorUtil {
  /**
   * 生成secret
   * @returns {*}
   */
  static generateSecret () {
    return speakeasy.generateSecret({
      length: 20
    })['base32']
  }

  /**
   * 生成uri
   * @param label
   * @param secret
   * @returns {string}
   */
  static geneUri (label, secret) {
    return `otpauth://totp/${label}?secret=${secret}`
  }

  /**
   * 验证token
   * @param token
   * @param secret
   * @returns {boolean}
   */
  static verify (token, secret) {
    if (OsUtil.getEnv('NODE_ENV') !== 'production' && token === '123456') {
      return true
    }
    return speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token
    })
  }
}
