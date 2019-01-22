/** @module */
import crypto from 'crypto'

/**
 * Buffer工具类
 */
export default class BufferUtil {
  getRandomBytes (size = 16) {
    return crypto.randomBytes(size)
  }

}