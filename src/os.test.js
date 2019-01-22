import 'node-assist'
import assert from 'assert'
import OsUtil from './os'

describe('OsUtil', () => {

  it('getGip', async () => {
    try {
      const result = OsUtil.getGip(97510)
      logger.error(result)
      // assert.strictEqual(tx['outputWithIndex'][0]['address'], 'moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP')
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })

  // it('getParentPid', async () => {
  //   try {
  //     const result = OsUtil.getParentPid(57734)
  //     logger.error(result)
  //     // assert.strictEqual(tx['outputWithIndex'][0]['address'], 'moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP')
  //   } catch (err) {
  //     logger.error(err)
  //     assert.throws(() => {
  //     }, err)
  //   }
  // })
  //
  // it('getChildPids', async () => {
  //   try {
  //     const result = OsUtil.getChildPids(313)
  //     logger.error(result)
  //     // assert.strictEqual(tx['outputWithIndex'][0]['address'], 'moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP')
  //   } catch (err) {
  //     logger.error(err)
  //     assert.throws(() => {
  //     }, err)
  //   }
  // })
  //
  // it('getMachineHash', async () => {
  //   try {
  //     const result = OsUtil.getMachineHash()
  //     logger.error(result)
  //     // assert.strictEqual(tx['outputWithIndex'][0]['address'], 'moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP')
  //   } catch (err) {
  //     logger.error(err)
  //     assert.throws(() => {
  //     }, err)
  //   }
  // })
})

