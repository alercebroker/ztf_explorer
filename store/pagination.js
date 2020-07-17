import { Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'

@Module({ name: 'pagination', namespaced: true, stateFactory: true })
export default class Pagination extends VuexModule {
  total = null
  page = 1
  next = null
  prev = null
  hasNext = null
  hasPrev = null
  perPage = 20
  count = 'true'

  @VuexMutation
  setTotal(val) {
    this.total = val
  }

  @VuexMutation
  setPage(val) {
    this.page = val
  }

  @VuexMutation
  setNext(val) {
    this.next = val
  }

  @VuexMutation
  setPrev(val) {
    this.prev = val
  }

  @VuexMutation
  setHasNext(val) {
    this.hasNext = val
  }

  @VuexMutation
  setHasPrev(val) {
    this.hasPrev = val
  }

  @VuexMutation
  setPerPage(val) {
    this.perPage = val
  }

  @VuexMutation
  setCount(val) {
    this.count = val
  }

  get pageFilters() {
    return {
      count: this.count,
      page: this.page,
      page_size: this.perPage,
    }
  }
}
