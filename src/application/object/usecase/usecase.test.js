import { ObjectService } from '../infrastructure'
import { mockObjects } from '../domain/object.mock'
import { getOne } from './getOne'
import { getMany } from './getMany'

jest.mock('../infrastructure/objectService')

describe('getOne', () => {
  it('should call service and return a single object instance', async () => {
    const service = new ObjectService()
    service.getOne.mockResolvedValue(mockObjects()[0])
    const resp = await getOne(service, 'someOid')
    expect(resp).toStrictEqual(mockObjects()[0])
  })
})
describe('getMany', () => {
  it('should call service and return an array of object instances', async () => {
    const service = new ObjectService()
    service.getMany.mockResolvedValue(mockObjects())
    const resp = await getMany(service, {})
    expect(resp).toStrictEqual(mockObjects())
  })
})
