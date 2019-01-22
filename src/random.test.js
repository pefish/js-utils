import 'node-assist'
import assert from 'assert'
import RandomUtil from './random'

describe('randomUtil', () => {

  it('getRandomFromWeightArray', async () => {
    try {
      const result = RandomUtil.getRandomFromWeightArray([
        ['a', 60],
        [676, 10],
        [{a: 'uui'}, 30]
      ])
      logger.error(result)
      // assert.strictEqual(tx['outputWithIndex'][0]['address'], 'moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP')
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })
})

