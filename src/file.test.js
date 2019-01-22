import 'node-assist'
import assert from 'assert'
import FileUtil from './file'

describe('fileUtil', () => {
  // it('readSync', async () => {
  //   try {
  //     const result = await FileUtil.readSync('/Users/joy/Work/backend/js-common/tests/fixtures/sequelizeHelper.sql')
  //     // logger.error(result.toString())
  //     assert.strictEqual(result instanceof Buffer, true)
  //   } catch (err) {
  //     logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })

  // it('remove', async () => {
  //   try {
  //     FileUtil.remove('test.js')
  //     // assert.strictEqual(result instanceof Buffer, true)
  //   } catch (err) {
  //     logger.error(err)
  //     assert.throws(() => {}, err)
  //   }
  // })

  it('getAbsolutePath', async () => {
    try {
      const result = FileUtil.getAbsolutePath('FileUtil.js')
      logger.error(result.toString())
      // assert.strictEqual(result instanceof Buffer, true)
    } catch (err) {
      logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('getAbsolutePathOfModule', async () => {
    try {
      const result = FileUtil.getAbsolutePathOfModule('amqplib')
      logger.error(result.toString())
      // assert.strictEqual(result instanceof Buffer, true)
    } catch (err) {
      logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})
