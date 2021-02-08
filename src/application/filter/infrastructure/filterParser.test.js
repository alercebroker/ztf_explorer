import { ParseError } from '@@/src/shared/error'
import { mockFiltersData, mockFilters } from '../domain'
import FilterParser from './filterParser'

describe('FilterParser', () => {
  describe('toDomain', () => {
    it('should convert valid params to domain instance', () => {
      const parser = new FilterParser()
      const result = parser.toDomain(mockFiltersData())
      expect(result.isSuccess).toBeTruthy()
      expect(result.getValue()).toStrictEqual(mockFilters())
    })
    it('should raise parse error if invalid arguments', () => {
      const parser = new FilterParser()
      const mockData = mockFiltersData()
      mockData.firstmjd = [2, 1]
      const result = parser.toDomain(mockData)
      expect(result.isFailure).toBeTruthy()
      expect(result.error).toBeInstanceOf(ParseError)
    })
  })
})
