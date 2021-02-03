import { ObjectService } from '../infrastructure'
import HttpError from '../../../shared/error/httpError'
import { ParseError } from '../../../shared/error'
import { Result } from '../../../shared/result'
import { mockObjects } from '../domain'
import { getOne } from './getOne'
import { getMany } from './getMany'

jest.mock('../infrastructure/objectService')

describe('getOne', () => {
  it('should call service and execute success callback', async () => {
    const service = new ObjectService()
    service.getOne.mockResolvedValue(Result.ok(mockObjects()[0]))
    const mockCallbacks = {
      returnSuccess: (value) => {
        expect(value).toStrictEqual(mockObjects()[0])
      },
      returnClientError: jest.fn(),
      returnServerError: jest.fn(),
      returnParseError: jest.fn(),
    }
    await getOne(service).execute('someOid', mockCallbacks)
  })
  it('should call service and execute clientError callback', async () => {
    const service = new ObjectService()
    service.getOne.mockResolvedValue(Result.fail(new HttpError(404)))
    const mockCallbacks = {
      returnSuccess: jest.fn(),
      returnClientError: (error) => {
        expect(error).toBeInstanceOf(HttpError)
        expect(error.status).toBe(404)
      },
      returnServerError: jest.fn(),
      returnParseError: jest.fn(),
    }
    await getOne(service).execute('someOid', mockCallbacks)
  })
  it('should call service and execute serverError callback', async () => {
    const service = new ObjectService()
    service.getOne.mockResolvedValue(Result.fail(new HttpError(500)))
    const mockCallbacks = {
      returnSuccess: jest.fn(),
      returnClientError: jest.fn(),
      returnServerError: (error) => {
        expect(error).toBeInstanceOf(HttpError)
        expect(error.status).toBe(500)
      },
      returnParseError: jest.fn(),
    }
    await getOne(service).execute('someOid', mockCallbacks)
  })
  it('should call service and execute parseError callback', async () => {
    const service = new ObjectService()
    service.getOne.mockResolvedValue(Result.fail(new ParseError()))
    const mockCallbacks = {
      returnSuccess: jest.fn(),
      returnClientError: jest.fn(),
      returnServerError: jest.fn(),
      returnParseError: (error) => {
        expect(error).toBeInstanceOf(ParseError)
      },
    }
    await getOne(service).execute('someOid', mockCallbacks)
  })
})
describe('getMany', () => {
  it('should call service and execute success callback', async () => {
    const service = new ObjectService()
    service.getMany.mockResolvedValue(
      mockObjects().map((obj) => Result.ok(obj))
    )
    const mockCallbacks = {
      returnSuccess: (value) => {
        expect(value).toStrictEqual(mockObjects())
      },
      returnClientError: jest.fn(),
      returnServerError: jest.fn(),
      returnParseError: jest.fn(),
    }
    await getMany(service).execute({}, mockCallbacks)
  })
  it('should call service and execute clientError callback', async () => {
    const service = new ObjectService()
    service.getMany.mockResolvedValue(Result.fail(new HttpError(404)))
    const mockCallbacks = {
      returnSuccess: jest.fn(),
      returnClientError: (error) => {
        expect(error).toBeInstanceOf(HttpError)
        expect(error.status).toBe(404)
      },
      returnServerError: jest.fn(),
      returnParseError: jest.fn(),
    }
    await getMany(service).execute({}, mockCallbacks)
  })
  it('should call service and execute serverError callback', async () => {
    const service = new ObjectService()
    service.getMany.mockResolvedValue(Result.fail(new HttpError(500)))
    const mockCallbacks = {
      returnSuccess: jest.fn(),
      returnClientError: jest.fn(),
      returnServerError: (error) => {
        expect(error).toBeInstanceOf(HttpError)
        expect(error.status).toBe(500)
      },
      returnParseError: jest.fn(),
    }
    await getMany(service).execute({}, mockCallbacks)
  })
  it('should call service and execute parseError callback', async () => {
    const service = new ObjectService()
    service.getMany.mockResolvedValue([
      Result.ok('someValue'),
      Result.fail(new ParseError()),
    ])
    const mockCallbacks = {
      returnSuccess: jest.fn(),
      returnClientError: jest.fn(),
      returnServerError: jest.fn(),
      returnParseError: (error) => {
        expect(error).toBeInstanceOf(ParseError)
      },
    }
    await getMany(service).execute({}, mockCallbacks)
  })
})
