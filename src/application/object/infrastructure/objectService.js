import { Result } from '@@/src/shared/result'
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
   * @return { Result<Object> } Result object represented in serialized JSON
   */
  async getOne(objectId) {
    let result = await this.api.get({ url: `objects/${objectId}` }, this.parser)
    if (result.isSuccess) {
      result = Result.ok(result.getValue().serialize())
    }
    return result
  }

  /**
   * Gets a list of objects from the API and parses them to a list of domain objects
   * @param { Object } searchParameters Filter instance with the params passed to the API
   * @return { Result<Object[]> } Result with value containing array of serialized objects
   */
  async getMany(searchParameters) {
    const paramsSerializer = this._paramsSerializer
    let result = await this.api.get(
      {
        url: 'objects/',
        config: {
          params: searchParameters,
          paramsSerializer,
        },
      },
      this.parser
    )
    if (result.isSuccess) {
      result = Result.ok(result.getValue().map((x) => x.serialize()))
    }
    return result
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
