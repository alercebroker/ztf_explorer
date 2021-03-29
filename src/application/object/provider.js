import { ObjectService } from '@app/object/infrastructure'
import { HttpService } from '@shared/http'
import { getOne, getMany } from '@app/object/usecase'
import { mockProvide } from './provider.mock'
const { NODE_ENV } = process.env

function getProvider() {
  if (NODE_ENV === 'production') {
    const httpService = new HttpService('https://dev.api.alerce.online/')
    const objectService = new ObjectService(httpService)
    const getOneObject = getOne(objectService)
    const getManyObject = getMany(objectService)

    const provide = () => ({
      objects: { getOne: getOneObject, getMany: getManyObject },
    })
    return provide
  }

  if (NODE_ENV === 'test') {
    return mockProvide
  }
}

export const provide = getProvider()
