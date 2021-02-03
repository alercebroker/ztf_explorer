import HttpService from '../../../shared/interface/httpService'
import { Result } from '../../../shared/result'
import HttpError from '../../../shared/error/httpError'
import { ParseError } from '../../../shared/error'
import { mockObjects } from '../domain/object.mock'
import ObjectService from './objectService'

jest.mock('../../../shared/interface/httpService')

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  HttpService.mockClear()
})

describe('ObjectService', () => {
  describe('getOne', () => {
    it('should call api and return a single result', async () => {
      const api = new HttpService('falseApiUrl')
      api.get.mockResolvedValue(Result.ok(mockObjects()[0]))
      const objectService = new ObjectService(api)
      const result = await objectService.getOne('ZTF19aanfyey')
      expect(result).toBeInstanceOf(Result)
      const obj = result.getValue()
      expect(obj).toStrictEqual(mockObjects()[0])
    })
    it('should return an errored result if api call fails', async () => {
      const api = new HttpService('falseApiUrl')
      api.get.mockResolvedValue(Result.fail(new HttpError(404)))
      const objectService = new ObjectService(api)
      const results = await objectService.getOne({})
      expect(results.isFailure).toBeTruthy()
      expect(results.error).toBeInstanceOf(HttpError)
    })
    it('should return an errored result if parsing fails', async () => {
      const api = new HttpService('falseApiUrl')
      api.get.mockResolvedValue(Result.fail(new ParseError()))
      const objectService = new ObjectService(api)
      const results = await objectService.getOne({})
      expect(results.isFailure).toBeTruthy()
      expect(results.error).toBeInstanceOf(ParseError)
    })
  })
  describe('getMany', () => {
    it('should call api and return array of results', async () => {
      const api = new HttpService('falseApiUrl')
      const mockResults = mockObjects().map((obj) => Result.ok(obj))
      api.get.mockResolvedValue(mockResults)
      const objectService = new ObjectService(api)
      const results = await objectService.getMany({})
      expect(results.length).toBe(mockResults.length)
      const objects = results.map((result) => result.getValue())
      expect(objects).toStrictEqual(mockObjects())
    })
    it('should return an errored result if api call fails', async () => {
      const api = new HttpService('falseApiUrl')
      api.get.mockResolvedValue(Result.fail(new HttpError(404)))
      const objectService = new ObjectService(api)
      const results = await objectService.getMany({})
      expect(results.isFailure).toBeTruthy()
      expect(results.error).toBeInstanceOf(HttpError)
    })
    it('should return an errored result if parsing fails', async () => {
      const api = new HttpService('falseApiUrl')
      api.get.mockResolvedValue(Result.fail(new ParseError()))
      const objectService = new ObjectService(api)
      const results = await objectService.getMany({})
      expect(results.isFailure).toBeTruthy()
      expect(results.error).toBeInstanceOf(ParseError)
    })
  })
})
