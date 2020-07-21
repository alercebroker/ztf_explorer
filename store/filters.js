import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'
import { search, getClassifiers, getClasses } from '../api/ztf_api'
import { objectsStore, paginationStore } from '~/store'

@Module({
  name: 'filters',
  namespaced: true,
  stateFactory: true,
})
export default class Filters extends VuexModule {
  oid = null
  selectedClassifier = null
  selectedClass = null
  classifiers = []
  classes = []
  probability = 0
  ndet = [0, 1000]
  firstmjd = [null, null]
  ra = null
  dec = null
  radius = null
  searching = false

  @VuexMutation
  setSearching(val) {
    this.searching = val
  }

  get generalFilters() {
    return {
      oid: this.oid,
      selectedClassifier: this.selectedClassifier,
      selectedClass: this.selectedClass,
      probability: this.probability,
      ndet: this.ndet,
    }
  }

  @VuexMutation
  setGeneralFilters(filters) {
    this.oid = filters.oid
    this.selectedClass = filters.selectedClass
    this.selectedClassifier = filters.selectedClassifier
    this.probability = filters.probability
    this.ndet = filters.ndet
  }

  get dateFilters() {
    return {
      firstmjd: this.firstmjd,
    }
  }

  @VuexMutation
  setDateFilters(filters) {
    this.firstmjd[0] = filters.minMjd
    this.firstmjd[1] = filters.maxMjd
  }

  get conesearchFilters() {
    return {
      ra: this.ra,
      dec: this.dec,
      radius: this.radius,
    }
  }

  @VuexMutation
  setConesearchFilters(filters) {
    this.ra = filters.ra
    this.dec = filters.dec
    this.radius = filters.radius
  }

  @VuexMutation
  setClassifiers(classifiers) {
    this.classifiers = classifiers.map((x) => {
      x.name = x.classifier_name
      delete x.classifier_name
      return x
    })
  }

  @VuexMutation
  setClasses(classes) {
    this.classes = classes
  }

  @VuexAction()
  setPaginationState(result) {
    if (result.total) {
      paginationStore.setTotal(result.total)
    }
    paginationStore.setPage(result.page)
    paginationStore.setNext(result.next)
    paginationStore.setPrev(result.prev)
    paginationStore.setHasNext(result.has_next)
    paginationStore.setHasPrev(result.has_prev)
    paginationStore.setCount('true')
  }

  @VuexAction({ rawError: true })
  async search() {
    this.setSearching(true)
    try {
      const result = await search({
        ...this.generalFilters,
        ...this.dateFilters,
        ...this.conesearchFilters,
        ...paginationStore.pageFilters,
      })
      objectsStore.set(result.data.items)
      this.setPaginationState(result.data)
    } catch (e) {
      // TODO Handle error here
      // Maybe error can be handled outside this module in API module
      // and then trigger a specific mutation on this state given the error
      // this.handleSearchError(e)
      console.log(e)
    }
    this.setSearching(false)
  }

  handleSearchError() {}

  @VuexAction({ rawError: true })
  async getClassifiers() {
    const result = await getClassifiers()
    this.setClassifiers(result.data)
  }

  @VuexAction({ rawError: true })
  async getClasses(selectedClassifier) {
    const result = await getClasses(selectedClassifier)
    this.setClasses(result.data)
  }
}
