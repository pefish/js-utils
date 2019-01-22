import 'node-assist'
import TimeUtil from './time'
import assert from 'assert'

describe('timeUtil', () => {

  it('now', async () => {
    try {
      const result = TimeUtil.now()
      // logger.error(result)
      // assert.strictEqual(tx['outputWithIndex'][0]['address'], 'moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP')
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })

  it('sub', async () => {
    try {
      const result = TimeUtil.sub(TimeUtil.now(), 1, 'd')
      // logger.error(result)
      // assert.strictEqual(tx['outputWithIndex'][0]['address'], 'moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP')
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })

  it('add', async () => {
    try {
      const result = TimeUtil.add(TimeUtil.now(), 1, 'd')
      // logger.error(result)
      // assert.strictEqual(tx['outputWithIndex'][0]['address'], 'moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP')
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })

  it('lt', async () => {
    try {
      const result = TimeUtil.lt(TimeUtil.now(), '2018-04-26 15:04:00')
      // logger.error(result)
      // assert.strictEqual(tx['outputWithIndex'][0]['address'], 'moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP')
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })

  it('diff', async () => {
    try {
      const result = TimeUtil.diff(TimeUtil.toMomentObj('2018-04-26 15:02:01'), TimeUtil.toMomentObj('2018-04-26 15:04:00'), 'minutes')
      // logger.error(result)
      assert.strictEqual(result, -1)
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })

  it('utcStandardStrToTimestamp', async () => {
    try {
      const result = TimeUtil.utcStandardStrToTimestamp('2018-05-18T09:06:03.000Z')
      // logger.error(result)
      assert.strictEqual(result, 1526634363000)
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })

  it('utcStandardStrToMomentObj', async () => {
    try {
      const result = TimeUtil.utcStandardStrToMomentObj('2018-05-18T09:06:03.000Z')
      // logger.error(result, TimeUtil.now())
      // assert.strictEqual(result, 1526634363000)
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })
})

