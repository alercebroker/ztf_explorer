import { ObjectRepository } from '../domain/objectRepository'
import { ObjectParser } from './objectParser'

class ObjectService extends ObjectRepository {
  constructor(api) {
    super()
    this.api = api
    this.parser = new ObjectParser()
  }

  /**
   * Gets an object from the API and uses ObjectParser to convert to domain object
   * @param { string } objectId is the object identifier
   * @return { Object_} domain object instance
   */
  async getOne(objectId) {
    const resp = await this.api.get(`objects/${objectId}`)
    return this.parser.toDomain(resp)
  }

  /**
   * Gets a list of objects from the API and parses them to a list of domain objects
   * @param { Filter } searchParameters a Filter instance with the params passed to the API
   * @return { Array<Object_> } an array of domain objects
   */
  getAll(searchParameters) {
    const paramsSerializer = this.api.paramsSerializer
    const resp = this.api.get('objects/', {
      params: searchParameters,
      paramsSerializer,
    })
    return this.parser.toDomain(resp)
  }
}

export { ObjectService }
