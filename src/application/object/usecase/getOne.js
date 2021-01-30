/**
 * Gets an object given an objectId
 * @param { ObjectService } service an ObjectService that performs API calls
 * @param { string } objectId the identifier for the object
 * @return { Object_ } an object instance
 */
async function getOne(service, objectId) {
  try {
    return await service.getOne(objectId)
  } catch (error) {
    throw new Error(error)
  }
}

export { getOne }
