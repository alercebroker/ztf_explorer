import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import axios from '@nuxtjs/axios'
import { objectsStore } from '~/store'
@Module({
  namespaced: true,
  name: 'filters',
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

  @Mutation
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

  @Mutation
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

  @Mutation
  setConesearchFilters(filters) {
    this.ra = filters.ra
    this.dec = filters.dec
    this.radius = filters.radius
  }

  @Action()
  async search() {
    const x = await axios.$get('http://3.212.59.238:8082/objects')
    console.log(x, objectsStore.list)
  }
}
