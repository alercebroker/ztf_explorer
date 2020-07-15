import { Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'

@Module({ name: 'pagination', namespaced: true, stateFactory: true })
export default class Pagination extends VuexModule {
  total = null
  page = null
  next = null
  prev = null
  hasNext = null
  hasPrev = null

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
}
