import HttpError from '@shared/http/httpError'
import { ParseError } from '@shared/error'
import { Result } from '@shared/result'

/**
 * Gets an object given an objectId
 * @param { ObjectService } service an ObjectService that performs API calls
 * @param { searchParams } Object the filters
 * @return { Array<Object_> } an array of object instances
 */
export function getMany(service) {
  return { execute }
  async function execute(
    searchParams,
    { returnSuccess, returnClientError, returnServerError, returnParseError }
  ) {
    const results = await service.getMany(searchParams)
    if (results.isFailure) {
      if (results.error instanceof HttpError) {
        if (results.error.isClientError()) {
          returnClientError(results.error)
          return
        }
        if (results.error.isServerError()) {
          returnServerError(results.error)
          return
        }
      }
      if (results.error instanceof ParseError) {
        returnParseError(results.error)
        return
      }
    }
    return results.getValue()
  }
}
