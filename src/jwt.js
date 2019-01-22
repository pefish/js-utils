/** @module */
import jwt from 'jsonwebtoken'
import ErrorHelper from 'p-js-error'

/**
 * jwt工具类
 */
export default class JwtUtil {
  /**
   * 生成jwt
   * @param payload
   * @param jwtSecret
   * @param exp {number} 过期时间，单位ms
   * @param iat {number} 颁发时间，单位ms
   * @returns {Promise<void>}
   */
  static async geneJwt (payload, jwtSecret, exp = Date.now() + 2 * 60 * 60 * 1000, iat = Date.now()) {
    exp !== 0 && (payload['exp'] = exp / 1000)
    payload['iat'] = iat / 1000
    return jwt.sign(payload, jwtSecret)
  }

  /**
   * 解析jwt
   * @param jwtStr
   * @returns {Promise<*>}
   */
  static async parseJwt (jwtStr) {
    let jwtObj = jwt.decode(jwtStr, {complete: true})
    if (jwtObj) {
      return jwt.decode(jwtStr, {complete: true}).payload
    } else {
      throw new ErrorHelper('jwt 没有payload', 0)
    }
  }

  /**
   * 验证jwt
   * @param jwtStr
   * @param jwtSecret
   * @returns {Promise<any>}
   */
  static verifyJwt (jwtStr, jwtSecret) {
    return new Promise((resolve, reject) => {
      jwt.verify(jwtStr, jwtSecret, (err, decoded) => {
        if (err) {
          reject(new ErrorHelper('jwt 验证失败', 0, null, err))
        } else {
          resolve(decoded)
        }
      })
    })
  }
}
