import Vuex from 'vuex'
import { getModule } from 'nuxt-property-decorator'
import { FiltersStore } from '@ui/store/filter'
import { ObjectsStore } from '@ui/store/object'
import { createLocalVue } from '@vue/test-utils'

const Vue = createLocalVue()
Vue.use(Vuex)

const factory = () => {
  console.log('call factory')
  const store = new Vuex.Store({
    modules: {
      filters: FiltersStore,
      objects: ObjectsStore,
    },
  })
  const objectsStore = getModule(ObjectsStore, store)
  const filtersStore = getModule(FiltersStore, store)
  return { filtersStore, objectsStore }
}

export { factory }
