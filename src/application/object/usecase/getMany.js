import HttpError from '../../../shared/error/httpError'
import { ParseError } from '../../../shared/error'
import { Result } from '../../../shared/result'

/**
 * Gets an object given an objectId
 * @param { ObjectService } service an ObjectService that performs API calls
 * @param { searchParams } Object the filters
 * @return { Array<Object_> } an array of object instances
 */
export function getMany(service, searchParams) {
  return { execute }
  async function execute({
    returnSuccess,
    returnClientError,
    returnServerError,
    returnParseError,
  }) {
    const result = await service.getMany(searchParams)
    const combined = Result.combine(result)
    if (combined.isFailure) {
      if (combined.error instanceof HttpError) {
        if (combined.error.isClientError()) {
          returnClientError()
          return
        }
        if (combined.error.isServerError()) {
          returnServerError()
          return
        }
      }
      if (combined.error instanceof ParseError) {
        returnParseError()
      }
    }
    return result.map((x) => x.value())
  }
}
