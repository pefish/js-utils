import 'node-assist'
import assert from "assert"
import AssertUtil from './assert'

describe('AssertUtil', () => {


  before(async () => {

  })

  it('canCast', async () => {
    try {
      const result = AssertUtil.canCast('hgfhd', 'integer', null, false)
      assert.strictEqual(result, false)

      const result1 = AssertUtil.canCast('3566.6', 'integer', null, false)
      assert.strictEqual(result1, false)

      const result2 = AssertUtil.canCast('3566', 'integer', null, false)
      assert.strictEqual(result2, true)
    } catch (err) {
      logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})
