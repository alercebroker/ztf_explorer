import {
  apiObjectsMock,
  apiSingleObjectMock,
} from '@shared/http/httpService.mock'
import { ParseError } from '@shared/error'
import { mockObjects } from '@app/object/domain'
import ObjectParser from '../objectParser'

describe('ObjectParser', () => {
  describe('toDomain', () => {
    it('should convert response with multiple items to domain object', () => {
      const parser = new ObjectParser()
      const result = parser.toDomain(apiObjectsMock())
      if (result.isFailure) throw new ParseError(result.error.message)
      const objs = result.getValue()
      expect(objs).toStrictEqual(mockObjects())
    })
    it('should convert response with single item to domain object', () => {
      const parser = new ObjectParser()
      const result = parser.toDomain(apiSingleObjectMock())
      const obj = result.getValue()
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
    it('should return ParseError if response contain undefined fields', () => {
      const parser = new ObjectParser()
      const objMock = apiSingleObjectMock()
      objMock.oid = undefined
      const result = parser.toDomain(objMock)
      expect(result.isFailure).toBeTruthy()
      expect(result.error).toBeInstanceOf(ParseError)
    })
    it('should return ParseError if response has at least one object with missing fields', () => {
      const parser = new ObjectParser()
      const objMock = apiObjectsMock()
      objMock.items[1].oid = undefined
      const result = parser.toDomain(objMock)
      expect(result.isFailure).toBeTruthy()
      expect(result.error).toBeInstanceOf(ParseError)
    })
    it('should raise ParseError if response contain missing fields', () => {
      const parser = new ObjectParser()
      const objMock = {}
      const result = parser.toDomain(objMock)
      expect(result.isFailure).toBeTruthy()
      expect(result.error).toBeInstanceOf(ParseError)
    })
  })
})
