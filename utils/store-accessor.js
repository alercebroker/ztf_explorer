/* eslint-disable */
import { getModule } from 'vuex-module-decorators'
import Filters from '~/store/filters'
import Objects from '~/store/objects'

let filtersStore = null
let objectsStore = null

function initialiseStores(store) {
  filtersStore = getModule(Filters, store)
  objectsStore = getModule(Objects, store)
}

export { initialiseStores, filtersStore, objectsStore }
