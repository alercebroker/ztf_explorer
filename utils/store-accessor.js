/* eslint-disable */
import { getModule } from 'nuxt-property-decorator'
import Filters from '~/store/filters'
import Objects from '~/store/objects'
import Pagination from '~/store/pagination'

let filtersStore = null
let objectsStore = null
let paginationStore = null

function initialiseStores(store) {
  filtersStore = getModule(Filters, store)
  objectsStore = getModule(Objects, store)
  paginationStore = getModule(Pagination, store)
}

export { initialiseStores, filtersStore, objectsStore, paginationStore }
