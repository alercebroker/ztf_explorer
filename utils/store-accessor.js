/* eslint-disable */
import { getModule } from 'nuxt-property-decorator'
import Filters from '~/store/filters'
import Object_ from '~/store/object'
import Objects from '~/store/objects'
import Pagination from '~/store/pagination'
import LightCurveStore from '~/store/lightcurve'
import FeaturesStore from '~/store/features'
import ProbabilitiesStore from '~/store/probabilities'
import StatsStore from '~/store/stats'
import XmatchesStore from '~/store/xmatches'
import AvroStore from '~/store/avro'
import DataReleaseStore from '~/store/datarelease'
import UserStore from '~/store/user'

let filtersStore = null
let objectStore = null
let objectsStore = null
let paginationStore = null
let lightCurveStore = null
let featuresStore = null
let probabilitiesStore = null
let statsStore = null
let xmatchesStore = null
let avroStore = null
let datareleaseStore = null
let userStore = null

function initialiseStores(store) {
  filtersStore = getModule(Filters, store)
  objectStore = getModule(Object_, store)
  objectsStore = getModule(Objects, store)
  paginationStore = getModule(Pagination, store)
  lightCurveStore = getModule(LightCurveStore, store)
  featuresStore = getModule(FeaturesStore, store)
  probabilitiesStore = getModule(ProbabilitiesStore, store)
  statsStore = getModule(StatsStore, store)
  xmatchesStore = getModule(XmatchesStore, store)
  avroStore = getModule(AvroStore, store)
  datareleaseStore = getModule(DataReleaseStore, store)
  userStore = getModule(UserStore, store)
}

export {
  initialiseStores,
  filtersStore,
  objectStore,
  objectsStore,
  paginationStore,
  lightCurveStore,
  featuresStore,
  probabilitiesStore,
  statsStore,
  xmatchesStore,
  avroStore,
  datareleaseStore,
  userStore
}
