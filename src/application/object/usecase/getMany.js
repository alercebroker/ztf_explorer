import HttpError from '../../../shared/error/httpError'
import { ParseError } from '../../../shared/error'
import { Result } from '../../../shared/result'

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
    const combined = Result.combine(results)
    if (combined.isFailure) {
      if (combined.error instanceof HttpError) {
        if (combined.error.isClientError()) {
          returnClientError(combined.error)
          return
        }
        if (combined.error.isServerError()) {
          returnServerError(combined.error)
          return
        }
      }
      if (combined.error instanceof ParseError) {
        returnParseError(combined.error)
        return
      }
    }
    return results.map((result) => result.getValue())
  }
}
