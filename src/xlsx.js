/** @module */

/**
 * xlsx工具类
 */
export default class XlsxUtil {
  static loadDatas (filename) {
    const xlsx = require('xlsx')
    const results = {}
    const wb = xlsx.readFile(filename)
    wb['SheetNames'].forEach((sheetName) => {
      results[sheetName] = xlsx.utils.sheet_to_json(wb.Sheets[sheetName])
    })
    return results
  }
}
