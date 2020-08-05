import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'
import { objectsStore, paginationStore } from '~/store'
const defaultState = {
  oid: null,
  selectedClassifier: null,
  selectedClass: null,
  classifiers: [],
  classes: [],
  probability: 0,
  ndet: [0, 1000],
  firstmjd: [null, null],
  ra: null,
  dec: null,
  radius: null,
  searching: false,
}

@Module({
  name: 'filters',
  namespaced: true,
  stateFactory: true,
})
export default class Filters extends VuexModule {
  oid = defaultState.oid
  selectedClassifier = defaultState.selectedClassifier
  selectedClass = defaultState.selectedClass
  classifiers = defaultState.classifiers
  classes = defaultState.classes
  probability = defaultState.probability
  ndet = defaultState.ndet
  firstmjd = defaultState.firstmjd
  ra = defaultState.ra
  dec = defaultState.dec
  radius = defaultState.radius
  searching = defaultState.searching

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
      const result = await this.store.$ztfApi.search({
        ...this.generalFilters,
        ...this.dateFilters,
        ...this.conesearchFilters,
        ...paginationStore.pageFilters,
      })
      objectsStore.set(result.data.items)
      this.setPaginationState(result.data)
    } catch (error) {
      if (error.response.status === 404) {
        this.store.$toast
          .show(
            'Your search did not return any object. Try refining your query'
          )
          .goAway(3000)
      }
    }
    this.setSearching(false)
  }

  @VuexAction({ rawError: true })
  async getClassifiers() {
    const result = await this.store.$ztfApi.getClassifiers()
    this.setClassifiers(result.data)
  }

  @VuexAction
  getClasses(selectedClassifier) {
    const classifier = this.classifiers.find(
      (c) => c.name === selectedClassifier
    )
    this.setClasses(classifier.classes)
  }

  @VuexMutation
  setDefaultState() {
    this.oid = defaultState.oid
    this.selectedClassifier = defaultState.selectedClassifier
    this.selectedClass = defaultState.selectedClass
    this.classifiers = defaultState.classifiers
    this.classes = defaultState.classes
    this.probability = defaultState.probability
    this.ndet = defaultState.ndet
    this.firstmjd = defaultState.firstmjd
    this.ra = defaultState.ra
    this.dec = defaultState.dec
    this.radius = defaultState.radius
    this.searching = defaultState.searching
  }

  @VuexAction()
  clearFilters() {
    this.setDefaultState()
    this.getClassifiers()
  }
}
