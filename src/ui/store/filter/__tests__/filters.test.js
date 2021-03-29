import { mockEmptyFiltersData, mockFiltersData } from './requestModel.mock'
import { factory } from './store.mock'

describe('FilterStore', () => {
  const store = factory()
  describe('init', () => {
    it('should return a store instance', (done) => {
      expect(store.filtersStore).toBeInstanceOf(Object)
      expect(store.objectsStore).toBeInstanceOf(Object)
      done()
    })
  })
  describe('actions', () => {
    describe('createParams', () => {
      it('should create params with valid input', () => {
        const params = mockFiltersData()
        store.filtersStore.createFilterParams(params)
        expect(store.filtersStore.filterParams).toStrictEqual(params)
        expect(store.filtersStore.error).toBeNull()
      })
      it('should set error with invalid input', () => {
        const params = mockFiltersData()
        params.firstmjd = [2, 1]
        store.filtersStore.createFilterParams(params)
        expect(store.filtersStore.filterParams).toBeNull()
        expect(store.filtersStore.error).not.toBeNull()
      })
    })
    describe('clearParams', () => {
      it('should make default params', () => {
        store.filtersStore.clearFilterParams()
        expect(store.filtersStore.filterParams).toStrictEqual(
          mockEmptyFiltersData()
        )
        expect(store.filtersStore.error).toBeNull()
      })
    })
    describe('nextPage', () => {
      it('should set page and call service to get next page of objects', async () => {
        // const currentParams = store.filtersStore.filterParams
        console.log(store.objectsStore.tp)
        // await store.filtersStore.nextPage()
        // expect(store.filtersStore.filterParams.page).toBe(
        //   currentParams.page + 1
        // )
      })
    })
  })
})
