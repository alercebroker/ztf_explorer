import { METHOD_NOT_IMPLEMENTED } from '@@/src/shared/error'

class ObjectRepository {
  /**
   * Gets one object by objectId
   * @param { string } oid the object identifier
   */
  getOne(oid) {
    throw new Error(METHOD_NOT_IMPLEMENTED)
  }

  /**
   * Gets one object by objectId
   * @param { Filter } searchParameters parameters used to filter objects
   */
  getMany(searchParameters) {
    throw new Error(METHOD_NOT_IMPLEMENTED)
  }
}

export { ObjectRepository }
