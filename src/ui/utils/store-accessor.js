/* eslint-disable */
import { getModule } from 'nuxt-property-decorator'
import { FiltersStore } from '@ui/store/filter'
import { ObjectStore, ObjectsStore } from '@ui/store/object'
import Pagination from '@ui/store/pagination'
import LightCurveStore from '@ui/store/lightcurve'
import FeaturesStore from '@ui/store/features'
import ProbabilitiesStore from '@ui/store/probabilities'
import StatsStore from '@ui/store/stats'
import TnsStore from '@ui/store/tns'
import XmatchesStore from '@ui/store/xmatches'

let filtersStore = null
let objectStore = null
let objectsStore = null
let paginationStore = null
let lightCurveStore = null
let featuresStore = null
let probabilitiesStore = null
let statsStore = null
let tnsStore = null
let xmatchesStore = null

function initialiseStores(store) {
  filtersStore = getModule(FiltersStore, store)
  objectStore = getModule(ObjectStore, store)
  objectsStore = getModule(ObjectsStore, store)
  paginationStore = getModule(Pagination, store)
  lightCurveStore = getModule(LightCurveStore, store)
  featuresStore = getModule(FeaturesStore, store)
  probabilitiesStore = getModule(ProbabilitiesStore, store)
  statsStore = getModule(StatsStore, store)
  tnsStore = getModule(TnsStore, store)
  xmatchesStore = getModule(XmatchesStore, store)
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
  tnsStore,
  xmatchesStore,
}
