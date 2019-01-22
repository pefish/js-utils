import 'node-assist'
import assert from "assert"
import JsonFormatter from './json_formatter'

describe('JsonFormatter', () => {
  it('format', async () => {
    try {
      const result = JsonFormatter.format(JSON.stringify({
        haha: '7363'
      }))
      // logger.error(result)
      assert.strictEqual(result, `{\n\t"haha": "7363"\n}`)
    } catch (err) {
      logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})
