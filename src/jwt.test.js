import 'node-assist'
import assert from 'assert'
import JwtUtil from './jwt'

describe('JwtUtil', () => {

  it('geneJwt', async () => {
    try {
      const result = await JwtUtil.geneJwt({}, 'test')
      // logger.error(result)
      assert.strictEqual(result.getFirst(14), 'eyJhbGciOiJIUz')
    } catch (err) {
      logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('verifyJwt', async () => {
    try {
      const result = await JwtUtil.verifyJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzIzNDIyNzMuNDMxLCJpYXQiOjE1MzIzMzUwNzMuNDMxfQ.y7hPW9JYe7BqVArboykWzkVP1SbLLOEdcVHp_zXl5GY', 'test')
      // logger.error(result)
    } catch (err) {
      logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})

