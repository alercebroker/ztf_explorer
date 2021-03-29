import { ObjectService } from '@app/object/infrastructure'
import HttpError from '@shared/http/httpError'
import { ParseError } from '@shared/error'
import { Result } from '@shared/result'
import { mockObjects } from '@app/object/domain'
import { getMany } from '../getMany'

jest.mock('../../infrastructure/objectService')

describe('getMany', () => {
  it('should call service and execute success callback', async () => {
    const service = new ObjectService()
    service.getMany.mockResolvedValue(Result.ok(mockObjects()))
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
    service.getMany.mockResolvedValue(Result.fail(new ParseError()))
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
