/** @module */
import FileUtil from './file'
import fs from 'fs'
import OsUtil from './os'
import path from 'path'
import RandomUtil from './random'

/**
 * api回复的工具类
 */
export default class ResponseUtil {
  static success (res, data) {
    res.json(ResponseUtil.assembleSucceedRes(data))
  }

  static assembleSucceedRes (data) {
    return {
      succeed: true,
      data
    }
  }

  static failed (res, err) {
    logger.error(err)
    res.json(ResponseUtil.assembleFailResp(err))
  }

  static assembleFailResp (err) {
    const errorCode = err instanceof Error ? err.getErrorCode() : 0
    return {
      succeed: false,
      error_message: (OsUtil.getEnv('NODE_ENV') === 'production' || err.getErrorMessage === undefined) ? 'INTERNAL_ERROR' : err.getErrorMessage(),
      error_code: errorCode,
      data: (err instanceof Error ? err.getErrorStorage() : null)
    }
  }

  static sendImageBuffer (res, buffer, ext) {
    let type = 'png'
    switch (ext) {
      case 'jpg':
        type = 'jpeg'
        break
      case 'gif':
        type = 'gif'
        break
    }
    res.header('Content-Type', `image/${type}`)
    res.send(buffer)
  }

  static sendFile (res, datas, filename = RandomUtil.getUniqueId()) {
    res.attachment(filename)
    res.send(datas)
  }

  static render (req, res, page, title = '', data = {}, version = null) {
    version = version || require(path.join(FileUtil.getStartFilePath(), 'package.json'))['version']
    let distPath = `./client/src`
    let html = fs.readFileSync(path.join(distPath, `template/index.html`), 'utf-8')
    html = html.replace(/\$\{page\}/g, `${page}_${version}`)
    html = html.replace(/\$\{title\}/g, title)
    html = html.replace(/\$\{manifest\}/g, `manifest_${version}`)
    html = html.replace(/\$\{vendor\}/g, `vendor_${version}`)
    // 传递数据
    html = html.replace(/\$\{bridge\}/g, `
        window._params_ = ${JSON.stringify(req['query'])}
        window._datas_ = ${JSON.stringify(data)}
      `)
    res.header('Content-Type', 'text/html;charset=utf-8')
    res.end(html)
  }
}
