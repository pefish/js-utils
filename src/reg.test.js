import 'node-assist'
import assert from 'assert'
import RegUtil from "./reg";

describe('regUtil', () => {

  it('findAll', async () => {
    try {
      const result = RegUtil.findAll(/>bitcoin-core-(.*)\/<\/a>/, '<html>\r\n<head><title>Index of /bin/</title></head>\r\n<body bgcolor="white">\r\n<h1>Index of /bin/</h1><hr><pre><a href="../../../">../</a>\r\n<a href="bitcoin-core-0.10.0/">bitcoin-core-0.10.0/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.10.1/">bitcoin-core-0.10.1/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.10.2/">bitcoin-core-0.10.2/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.10.3/">bitcoin-core-0.10.3/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.10.4/">bitcoin-core-0.10.4/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.11.0/">bitcoin-core-0.11.0/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.11.1/">bitcoin-core-0.11.1/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.11.2/">bitcoin-core-0.11.2/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.12.0/">bitcoin-core-0.12.0/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.12.1/">bitcoin-core-0.12.1/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.13.0/">0.13.0/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.13.1/">bitcoin-core-0.13.1/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.13.2/">bitcoin-core-0.13.2/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.14.0/">bitcoin-core-0.14.0/</a>                               27-Mar-2017 19:45                   -\r\n<a href="bitcoin-core-0.14.1/">bitcoin-core-0.14.1/</a>                               19-Sep-2017 12:47                   -\r\n<a href="bitcoin-core-0.14.2/">bitcoin-core-0.14.2/</a>                               19-Sep-2017 12:47                   -\r\n<a href="bitcoin-core-0.15.0/">bitcoin-core-0.15.0/</a>                               19-Sep-2017 12:44                   -\r\n<a href="bitcoin-core-0.15.0.1/">bitcoin-core-0.15.0.1/</a>                             19-Sep-2017 12:37                   -\r\n<a href="bitcoin-core-0.15.1/">bitcoin-core-0.15.1/</a>                               11-Nov-2017 14:11                   -\r\n<a href="bitcoin-core-0.16.0/">bitcoin-core-0.16.0/</a>                               26-Feb-2018 07:33                   -\r\n<a href="bitcoin-core-0.16.1/">bitcoin-core-0.16.1/</a>                               30-May-2018 09:52                   -\r\n<a href="bitcoin-core-0.9.5/">bitcoin-core-0.9.5/</a>                                27-Mar-2017 19:45                   -\r\n<a href="block-chain/">block-chain/</a>                                       27-Mar-2017 19:45                   -\r\n<a href="insecure/">insecure/</a>                                          27-Mar-2017 19:45                   -\r\n</pre><hr></body>\r\n</html>\r\n')
      logger.error(result)
      // assert.strictEqual(tx['outputWithIndex'][0]['address'], 'moneyqMan7uh8FqdCA2BV5yZ8qVrc9ikLP')
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })

  it('test', async () => {
    try {
      const result = RegUtil.test(/^[a-z][a-z1-5\.]{0,10}([a-z1-5]|^\.)[a-j1-5]?$/, 'laijiyong123')
      // logger.error(result)
      assert.strictEqual(result, true)
    } catch (err) {
      logger.error(err)
      assert.throws(() => {
      }, err)
    }
  })
})

