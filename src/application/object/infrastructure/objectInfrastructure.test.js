import ZtfApi from '../../../shared/interface/ztfApi'
import {
  apiObjectsMock,
  apiSingleObjectMock,
} from '../../../shared/interface/ztfApi.mock'
import { ParseError } from '../../../shared/error'
import { mockObjects } from '../domain/object.mock'
import ObjectService from './objectService'
import ObjectParser from './objectParser'
const axios = require('axios')

jest.mock('axios')

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  axios.mockClear()
})

describe('ObjectService', () => {
  describe('getOne', () => {
    it('should call api and return a single domain item', async () => {
      axios.create.mockReturnValue({ get: jest.fn() })
      const api = new ZtfApi('falseApiUrl')
      api.axiosService.get.mockResolvedValue({ data: apiSingleObjectMock() })
      const objectService = new ObjectService(api)
      const obj = await objectService.getOne('ZTF19aanfyey')
      expect(obj.oid).toBe(mockObjects()[0].oid)
      expect(obj.grMax).toBe(mockObjects()[0].grMax)
      expect(obj.grMaxCorr).toBe(mockObjects()[0].grMaxCorr)
      expect(obj.grMean).toBe(mockObjects()[0].grMean)
      expect(obj.grMeanCorr).toBe(mockObjects()[0].grMeanCorr)
      expect(obj.stepIdCorr).toBe(mockObjects()[0].stepIdCorr)
      expect(obj.className).toBeUndefined()
      expect(obj.classifier).toBeUndefined()
      expect(obj.probability).toBeUndefined()
    })
  })
  describe('getMany', () => {
    it('should call api and return array of items', async () => {
      axios.create.mockReturnValue({ get: jest.fn() })
      const api = new ZtfApi('falseApiUrl')
      api.axiosService.get.mockResolvedValue({ data: apiObjectsMock() })
      const objectService = new ObjectService(api)
      const objects = await objectService.getMany({})
      expect(objects.length).toBe(apiObjectsMock().items.length)
      expect(objects).toStrictEqual(mockObjects())
    })
  })
})

describe('ObjectParser', () => {
  describe('toDomain', () => {
    it('should convert response with multiple items to domain object', () => {
      const parser = new ObjectParser()
      const objs = parser.toDomain({ data: apiObjectsMock() })
      expect(objs).toStrictEqual(mockObjects())
    })
    it('should convert response with single item to domain object', () => {
      const parser = new ObjectParser()
      const obj = parser.toDomain({ data: apiSingleObjectMock() })
      expect(obj.oid).toBe(mockObjects()[0].oid)
      expect(obj.grMax).toBe(mockObjects()[0].grMax)
      expect(obj.grMaxCorr).toBe(mockObjects()[0].grMaxCorr)
      expect(obj.grMean).toBe(mockObjects()[0].grMean)
      expect(obj.grMeanCorr).toBe(mockObjects()[0].grMeanCorr)
      expect(obj.stepIdCorr).toBe(mockObjects()[0].stepIdCorr)
      expect(obj.className).toBeUndefined()
      expect(obj.classifier).toBeUndefined()
      expect(obj.probability).toBeUndefined()
    })
    it('should raise ParseError if response contain undefined fields', () => {
      const parser = new ObjectParser()
      const objMock = apiSingleObjectMock()
      objMock.oid = undefined
      expect(() => parser.toDomain({ data: objMock })).toThrow('Invalid Object')
      expect(() => parser.toDomain({ data: objMock })).toThrow(ParseError)
    })
    it('should raise ParseError if response contain missing fields', () => {
      const parser = new ObjectParser()
      const objMock = {}
      expect(() => parser.toDomain({ data: objMock })).toThrow('Invalid Object')
      expect(() => parser.toDomain({ data: objMock })).toThrow(ParseError)
    })
  })
})
