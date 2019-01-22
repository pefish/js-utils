/** @module */

/**
 * 正则表达式工具类
 */
export default class RegUtil {
  static findAll (reg, str) {
    //查找所有匹配的内容
    if (!reg.flags.includes('g')) {
      console.log('没有使用g修饰，自动修正')
    }
    reg = new global.RegExp(reg, 'g')
    reg.compile(reg) //作用是能够对正则表达式进行编译，被编译过的正则在使用的时候效率会更高，适合于对一个正则多次调用的情况下
    let result = []
    let a = null
    while (a = reg.exec(str)) {  //数组中第0个元素是匹配的子字符串，第二个元素是正则中的第一个子分组匹配的结果（如果有子分组，即正则中存在用圆括号括起来的分组），第三个是正则中第二个子分组匹配的结果（如果有第二个子分组）
      result.push(a)
    }
    return result
  }

  static test (reg, str) {
    return reg.test(str)
  }
}
