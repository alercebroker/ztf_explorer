/* eslint-disable */
import { getModule } from 'nuxt-property-decorator'
import Filters from '~/store/filters'
import Object_ from '~/store/object'
import Objects from '~/store/objects'
import Pagination from '~/store/pagination'

let filtersStore = null
let objectStore = null
let objectsStore = null
let paginationStore = null

function initialiseStores(store) {
  filtersStore = getModule(Filters, store)
  objectStore = getModule(Object_, store)
  objectsStore = getModule(Objects, store)
  paginationStore = getModule(Pagination, store)
}

export { initialiseStores, filtersStore, objectStore, objectsStore, paginationStore }
