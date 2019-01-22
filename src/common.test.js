import 'node-assist'
import assert from 'assert'
import CommonUtil from './common'

describe('commonUtil', () => {

  it('compareVersion', async () => {
    try {
      const result = CommonUtil.compareVersion(['0.9.6', '0.6.3', '0.10.6.5', '0.8.5', '0.10.6.7'], 1)
      // logger.error(result)
      assert.strictEqual(result, '0.10.6.7')
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })
})

