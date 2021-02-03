import HttpError from '../../../shared/error/httpError'
import { ParseError } from '../../../shared/error'

/**
 * Gets an object given an objectId and executes callbacks
 * You should call getOne(service).execute(oid, {callbacks})
 * @param { ObjectService } service an ObjectService that performs API calls
 * @return {function} A function that executes callbacks
 */
export function getOne(service) {
  return { execute }
  /**
   * Calls service getOne and executes callbacks
   * @param { string } objectId the identifier for the object
   * @param { Object } callbacks Object that should contain a returnSuccess, returnClientError, returnServerError, returnParseError
   */
  async function execute(
    objectId,
    { returnSuccess, returnClientError, returnServerError, returnParseError }
  ) {
    const result = await service.getOne(objectId)
    if (result.isFailure) {
      if (result.error instanceof HttpError) {
        if (result.error.isClientError()) {
          returnClientError(result.error)
          return
        }
        if (result.error.isServerError()) {
          returnServerError(result.error)
          return
        }
      }
      if (result.error instanceof ParseError) {
        returnParseError(result.error)
        return
      }
    }
    returnSuccess(result.getValue())
  }
}
