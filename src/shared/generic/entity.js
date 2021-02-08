import { METHOD_NOT_IMPLEMENTED } from '../error'

export default class Entity {
  validate() {
    throw new Error(METHOD_NOT_IMPLEMENTED)
  }

  serialize() {
    return { ...this }
  }
}
