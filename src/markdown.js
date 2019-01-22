/** @module */
import marked from 'marked'
import ErrorHelper from 'p-js-error'

/**
 * markdown工具类
 */
export default class MarkdownUtil {
  static toHtml (markdown) {
    return new Promise((resolve, reject) => {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        sanitizer: null,
        mangle: true,
        smartLists: false,
        silent: false,
        highlight: null,
        langPrefix: 'lang-',
        smartypants: false,
        headerPrefix: '',
        xhtml: false
      })
      marked(markdown, (err, content) => {
        if (err) {
          reject(new ErrorHelper('失败', 0, null, err))
        } else {
          resolve(content)
        }
      })
    })
  }
}