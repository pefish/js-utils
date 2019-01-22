import SimpleJsonFormatter from 'simple-json-formatter'

export default class JsonFormatter {
  static format (jsonStr) {
    return SimpleJsonFormatter.format(jsonStr, '\t')
  }
}
