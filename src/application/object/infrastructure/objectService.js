import { ObjectRepository } from '../domain/'
import ObjectParser from './objectParser'
const qs = require('qs')

export default class ObjectService extends ObjectRepository {
  constructor(api) {
    super()
    this.api = api
    this.parser = new ObjectParser()
  }

  /**
   * Gets an object from the API and parses to domain object wrapped in result object
   * @param { string } objectId is the object identifier
   * @return { Result } Result object
   */
  async getOne(objectId) {
    return await this.api.get({ url: `objects/${objectId}` }, this.parser)
  }

  /**
   * Gets a list of objects from the API and parses them to a list of domain objects
   * @param { Filter } searchParameters a Filter instance with the params passed to the API
   * @return { Array<Result> } an array of domain objects
   */
  async getMany(searchParameters) {
    const paramsSerializer = this._paramsSerializer
    return await this.api.get(
      {
        url: 'objects/',
        config: {
          params: searchParameters,
          paramsSerializer,
        },
      },
      this.parser
    )
  }

  _filterFunc(prefix, value) {
    if (value === '') {
      return
    }
    return value
  }

  _paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'repeat',
      skipNulls: true,
      filter: this._filterFunc,
    })
  }
}
