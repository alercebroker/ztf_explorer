class ObjectRepository {
  /**
   * Gets one object by objectId
   * @param { string } oid the object identifier
   */
  getOne(oid) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }

  /**
   * Gets one object by objectId
   * @param { Filter } searchParameters parameters used to filter objects
   */
  getAll(searchParameters) {
    throw new Error('ERR_METHOD_NOT_IMPLEMENTED')
  }
}

export { ObjectRepository }
