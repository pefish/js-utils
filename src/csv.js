/** @module */

import json2csv from 'json2csv'
import FileUtil from '../../js-util-file/src/file'

/**
 * csv工具类
 */
export default class CsvUtil {
  static saveToCsv (filepath, datas, fields = null, del = ',', quotes = '', opts = {}) {
    // {
    //   hasCSVColumnTitle: false,
    //   defaultValue: '',
    //   eol: '',
    //   newLine: '\n',
    //   flatten: false,
    //   includeEmptyRows: false,
    //
    // }
    const csv = json2csv({
      data: datas,
      fields: fields,
      del: del,
      quotes: quotes,
      ...opts
    })
    FileUtil.writeSync(filepath, csv)
    return true
  }

  static jsonToCsv (datas, fields = null, del = ',', quotes = '', opts = {}) {
    return json2csv({
      data: datas,
      fields: fields,
      del: del,
      quotes: quotes,
      ...opts
    })
  }
}
