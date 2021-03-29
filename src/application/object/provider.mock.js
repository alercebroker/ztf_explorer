import { getOne, getMany } from '@app/object/usecase'
import { mockObjectService } from './infrastructure/__tests__/objectService.mock'
const getOneObject = getOne(mockObjectService())
const getManyObject = getMany(mockObjectService())
export const mockProvide = () => ({
  objects: { getOne: getOneObject, getMany: getManyObject },
})
