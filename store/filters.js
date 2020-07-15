import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'
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
  classifiers = null
  classes = null
  probability = 0
  ndet = [0, 1000]
  minMjd = null
  maxMjd = null
  ra = null
  dec = null
  radius = null

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
      minMjd: this.minMjd,
      maxMjd: this.maxMjd,
    }
  }

  @VuexMutation
  setDateFilters(filters) {
    this.minMjd = filters.minMjd
    this.maxMjd = filters.maxMjd
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

  @VuexAction()
  async search() {
    const result = await this.store.$axios.$get(
      'http://3.212.59.238:8082/objects/',
      {
        params: {
          ...this.generalFilters,
        },
      }
    )
    objectsStore.set(result.items)
    paginationStore.setTotal(result.total)
    paginationStore.setPage(result.page)
    paginationStore.setNext(result.next)
    paginationStore.setPrev(result.prev)
    paginationStore.setHasNext(result.has_next)
    paginationStore.setHasPrev(result.has_prev)
  }
}
