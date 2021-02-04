import { ObjectService } from '../../application/object/infrastructure'
import { HttpService } from '../../shared/interface'
import { getOne, getMany } from '../../application/object/usecase'

export default function (context, inject) {
  const httpService = new HttpService('https://dev.api.alerce.online/')
  const objectService = new ObjectService(httpService)
  const getOneObject = getOne(objectService)
  const getManyObject = getMany(objectService)
  inject('services', {
    objects: { getOne: getOneObject, getMany: getManyObject },
  })
}
