import { mockFiltersData } from './requestModel.mock'
import FilterParams from '../requestModel'
describe('Filter', () => {
  describe('Initialize', () => {
    it('creates filters with valid arguments', () => {
      const params = mockFiltersData()
      const filters = new FilterParams(params)
      expect(filters).toBeInstanceOf(FilterParams)
    })
    it('creates empty filters on empty constructor params', () => {
      const filters = new FilterParams()
      expect(filters).toBeInstanceOf(FilterParams)
    })
    it('throws error if invalid ranking', () => {
      const params = mockFiltersData()
      params.ranking = 0
      expect(() => new FilterParams(params)).toThrow(
        "Ranking can't be lower than 1"
      )
    })
    it('throws error if invalid ndet', () => {
      const params = mockFiltersData()
      params.ndet = [-1]
      expect(() => new FilterParams(params)).toThrow(
        "number of detections can't be lower than 0"
      )
    })
    it('throws error if invalid ndet range', () => {
      const params = mockFiltersData()
      params.ndet = [2, 1]
      expect(() => new FilterParams(params)).toThrow(
        'Invalid range for number of detections'
      )
    })
    it('throws error if invalid ndet range length ', () => {
      const params = mockFiltersData()
      params.ndet = [1, 2, 3]
      expect(() => new FilterParams(params)).toThrow(
        'Invalid range for number of detections'
      )
    })
    it('throws error if invalid probability ', () => {
      const params = mockFiltersData()
      params.probability = -1
      expect(() => new FilterParams(params)).toThrow(
        "Probability can't be lower than 0"
      )
    })
    it('throws error if invalid firstmjd ', () => {
      const params = mockFiltersData()
      params.firstmjd = [-1]
      expect(() => new FilterParams(params)).toThrow(
        "firstmjd can't be lower than 0"
      )
    })
    it('throws error if invalid firstmjd range', () => {
      const params = mockFiltersData()
      params.firstmjd = [2, 1]
      expect(() => new FilterParams(params)).toThrow(
        'Invalid range for firstmjd'
      )
    })
    it('throws error if invalid firstmjd range length ', () => {
      const params = mockFiltersData()
      params.firstmjd = [1, 2, 3]
      expect(() => new FilterParams(params)).toThrow(
        'Invalid range for firstmjd'
      )
    })
    it('throws error if invalid lastmjd ', () => {
      const params = mockFiltersData()
      params.lastmjd = [-1]
      expect(() => new FilterParams(params)).toThrow(
        "lastmjd can't be lower than 0"
      )
    })
    it('throws error if invalid lastmjd range', () => {
      const params = mockFiltersData()
      params.lastmjd = [2, 1]
      expect(() => new FilterParams(params)).toThrow(
        'Invalid range for lastmjd'
      )
    })
    it('throws error if invalid lastmjd range length ', () => {
      const params = mockFiltersData()
      params.lastmjd = [1, 2, 3]
      expect(() => new FilterParams(params)).toThrow(
        'Invalid range for lastmjd'
      )
    })
    it('throws error if invalid page arg', () => {
      const params = mockFiltersData()
      params.page = 0
      expect(() => new FilterParams(params)).toThrow(
        "Page can't be lower than 1"
      )
    })
    it('throws error if invalid page_size arg', () => {
      const params = mockFiltersData()
      params.page_size = 0
      expect(() => new FilterParams(params)).toThrow(
        "Page size can't be lower than 1"
      )
    })
    it('throws error if invalid count arg', () => {
      const params = mockFiltersData()
      params.count = 'fail'
      expect(() => new FilterParams(params)).toThrow('Wrong value for count')
    })
    it('throws error if invalid order_by arg', () => {
      const params = mockFiltersData()
      params.order_by = 'fail'
      expect(() => new FilterParams(params)).toThrow('Wrong value for order_by')
    })
    it('should pass if null order_mode', () => {
      const params = mockFiltersData()
      params.order_mode = null
      const filters = new FilterParams(params)
      expect(filters).toBeInstanceOf(FilterParams)
    })
    it('throws error if invalid order_by arg', () => {
      const params = mockFiltersData()
      params.order_mode = 'fail'
      expect(() => new FilterParams(params)).toThrow(
        'Wrong value for order_mode'
      )
    })
  })
})
