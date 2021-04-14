import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'pagination', namespaced: true, stateFactory: true })
export default class Pagination extends VuexModule {
  total = null
  page = 1
  perPage = 20
  sortBy = 'probability'
  sortDesc = true
  count = 'false'

  @VuexMutation
  setTotal(val) {
    this.total = val
  }

  @VuexMutation
  setPage(val) {
    this.page = val
  }

  @VuexMutation
  setPerPage(val) {
    this.perPage = val
  }

  @VuexMutation
  setCount(val) {
    this.count = val
  }

  @VuexMutation
  setSortBy(val) {
    this.sortBy = val
  }

  @VuexMutation
  setSortDesc(val) {
    this.sortDesc = val
  }

  get pageFilters() {
    return {
      count: this.count,
      page: this.page,
      perPage: this.perPage,
      sortBy: this.sortBy,
      sortDesc: this.sortDesc,
    }
  }

  get defaultPageFilters() {
    return {
      count: 'false',
      page: 1,
      perPage: 20,
      ranking: 1,
      sortBy: 'probability',
      sortDesc: 'true',
    }
  }

  @VuexAction
  goToNext() {
    if (this.store.state.objects.list.length === this.perPage) {
      this.setPage(this.page + 1)
    }
  }

  @VuexAction
  goToPrev() {
    if (this.page > 1) {
      this.setPage(this.page - 1)
    }
  }

  @VuexAction
  changePage(val) {
    this.setPage(val)
  }
}
