import { Result } from '../result'
import {
  ParseError,
  METHOD_NOT_IMPLEMENTED,
  PARSE_ENTITY_FAILED,
} from '../error'

export default class Parser {
  /**
   * Parses API response object(s) to domain data object
   * @param {*} response an axios response object returned from api call
   * @return { Object_ | Array<Object_> } a domain object or an array of objects
   */
  toDomain(response) {
    throw new Error(METHOD_NOT_IMPLEMENTED)
  }

  /**
   * Converts an Object to a domain entity
   * @param {Object} obj an Object to convert
   * @return { Entity } a domain entity
   * */
  _parseObject(obj, Entity, extra = {}) {
    try {
      const entity = new Entity({
        ...obj,
        ...extra,
      })
      return Result.ok(entity)
    } catch (error) {
      return Result.fail(new ParseError(PARSE_ENTITY_FAILED + error.message))
    }
  }
}
