import HttpError from '../../../shared/error/httpError'
import { ParseError } from '../../../shared/error'

/**
 * Gets an object given an objectId
 * @param { ObjectService } service an ObjectService that performs API calls
 * @param { string } objectId the identifier for the object
 * @return { Object_ } an object instance
 */
export function getOne(service, objectId) {
  return { execute }

  async function execute({
    returnSuccess,
    returnClientError,
    returnServerError,
    returnParseError,
  }) {
    const result = await service.getOne(objectId)
    if (result.isFailure) {
      if (result.error instanceof HttpError) {
        if (result.error.isClientError()) {
          returnClientError()
          return
        }
        if (result.error.isServerError()) {
          returnServerError()
          return
        }
      }
      if (result.error instanceof ParseError) {
        returnParseError()
        return
      }
    }
    returnSuccess(result.getValue())
  }
}
