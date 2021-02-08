import Parser from '@@/src/shared/generic/parser'
import FilterParams from '../domain/filter'

export default class FilterParser extends Parser {
  toDomain(params) {
    return this.parseObject(params, FilterParams)
  }
}
