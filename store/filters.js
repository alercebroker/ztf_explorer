import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'
import { filterSortClassifiers } from '../utils/classifier_sort'
import { objectsStore, paginationStore } from '~/store'
const defaultState = {
  oid: [],
  selectedClassifier: null,
  selectedClass: null,
  classifiers: [],
  classes: [],
  probability: 0,
  ranking: 1,
  ndet: [null, null],
  firstmjd: [null, null],
  limitNdet: [1, 2000],
  limitMjd: [null, null],
  ra: null,
  dec: null,
  radius: null,
  targetName: null,
  searching: false,
  error: null,
}

const qs = require('qs')

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
  limitNdet = defaultState.limitNdet
  limitMjd = defaultState.limitMjd
  ra = defaultState.ra
  dec = defaultState.dec
  radius = defaultState.radius
  searching = defaultState.searching
  error = defaultState.error
  ranking = defaultState.ranking
  activeRequest = null

  @VuexMutation
  setSearching(val) {
    this.searching = val
  }

  @VuexMutation
  setError(val) {
    this.error = val
  }

  get generalFilters() {
    return {
      oid: this.oid,
      selectedClassifier: this.selectedClassifier,
      selectedClass: this.selectedClass,
      probability: this.probability > 0 ? this.probability : null,
      ndet: this.ndet,
      ranking: this.ranking,
    }
  }

  get defaultGeneralFilters() {
    return {
      oid: defaultState.oid,
      selectedClassifier: defaultState.selectedClassifier,
      selectedClass: defaultState.selectedClass,
      probability:
        defaultState.probability > 0 ? defaultState.probability : null,
      ndet: defaultState.ndet,
      ranking: defaultState.ranking,
    }
  }

  get querystring() {
    return qs.stringify(
      {
        ...this.generalFilters,
        ...this.dateFilters,
        ...this.conesearchFilters,
        ...paginationStore.pageFilters,
      },
      {
        arrayFormat: 'repeat',
        skipNulls: true,
        filter: (prefix, value) => (value === '' ? null : value),
      }
    )
  }

  get defaultQuerystring() {
    return qs.stringify(
      {
        ...this.defaultGeneralFilters,
        ...this.defaultDateFilters,
        ...this.defaultConesearchFilters,
        ...paginationStore.defaultPageFilters,
      },
      {
        arrayFormat: 'repeat',
        skipNulls: true,
        filter: (prefix, value) => (value === '' ? null : value),
      }
    )
  }

  @VuexMutation
  setNdet(val) {
    this.ndet = val
  }

  @VuexMutation
  setFirstMjd(val) {
    this.firstmjd = val
  }

  @VuexMutation
  setLimitNdet(val) {
    this.limitNdet = val
  }

  @VuexMutation
  setLimitMjd(val) {
    this.limitMjd = val
  }

  @VuexMutation
  setGeneralFilters(filters) {
    this.oid = filters.oid
    if (filters.selectedClassifier !== this.selectedClassifier) {
      this.selectedClass = null
    }
    this.selectedClass = filters.selectedClass
    this.selectedClassifier = filters.selectedClassifier
    this.probability = filters.probability
    this.ndet = filters.ndet
    this.ranking = 1
    if (Array.isArray(this.oid)) {
      paginationStore.setSortBy(this.oid.length > 1 ? null : 'probability')
    }
  }

  get dateFilters() {
    return {
      firstmjd: this.firstmjd,
    }
  }

  get defaultDateFilters() {
    return {
      firstmjd: defaultState.firstmjd,
    }
  }

  @VuexMutation
  setDateFilters(filters) {
    this.firstmjd = [filters.minMjd, filters.maxMjd]
  }

  get conesearchFilters() {
    return {
      ra: this.ra,
      dec: this.dec,
      radius: this.radius,
      targetName: this.targetName,
    }
  }

  get defaultConesearchFilters() {
    return {
      ra: defaultState.ra,
      dec: defaultState.dec,
      radius: defaultState.radius,
      targetName: defaultState.targetName,
    }
  }

  @VuexMutation
  setConesearchFilters(filters) {
    this.ra = filters.ra
    this.dec = filters.dec
    this.radius = filters.radius
    this.targetName = filters.targetName
  }

  @VuexMutation
  setClassifiers(classifiers) {
    this.classifiers = classifiers.map((x) => {
      x.name = x.classifier_name
      return x
    })
    this.classifiers = filterSortClassifiers(this.classifiers)
  }

  @VuexMutation
  setClasses(classes) {
    this.classes = classes
  }

  @VuexAction({ rawError: true })
  setPaginationState(result) {
    paginationStore.setTotal(result.data.items.length + 1)
  }

  @VuexMutation
  setActiveRequest(request) {
    this.activeRequest = request
  }

  @VuexAction({ rawError: true })
  async search() {
    this.setSearching(true)
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())
    try {
      const result = await this.store.$ztfApi.search(
        {
          ...this.generalFilters,
          ...this.dateFilters,
          ...this.conesearchFilters,
          ...paginationStore.pageFilters,
        },
        this.activeRequest
      )
      this.setError(null)
      this.setActiveRequest(null)
      objectsStore.set(result.data.items)
      if (result.data.items.length === 0) {
        objectsStore.setNoDataText(
          'We could not find any object with the selected filters'
        )
      }
      this.setPaginationState(result)
      this.setSearching(false)
    } catch (error) {
      if (!error.message.startsWith('Cancel request')) {
        this.setError(error)
        this.setSearching(false)
      }
    }
  }

  @VuexAction({ rawError: true })
  async getClassifiers() {
    const result = await this.store.$ztfApi.getClassifiers()
    this.setClassifiers(result.data)
  }

  @VuexAction({ rawError: true })
  getClasses(selectedClassifier) {
    const classifier = this.classifiers.find(
      (c) => c.name === selectedClassifier
    )
    this.setClasses(classifier.classes)
  }

  @VuexAction({ rawError: true })
  getLimitValues() {
    // let resp = await this.store.$ztfApi.getLimitValues()
    // resp = resp.data
    const limitNdet = [1, 30000]
    const limitMjd = [10000, 80000]
    this.setLimitNdet(limitNdet)
    this.setLimitMjd(limitMjd)
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
    this.targetName = defaultState.targetName
    this.searching = defaultState.searching
    this.ranking = defaultState.ranking
  }

  @VuexAction({ rawError: true })
  clearFilters() {
    this.setDefaultState()
    this.getClassifiers()
  }
}
