import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
  getModule,
} from 'nuxt-property-decorator'
import { ObjectsStore } from '../object'
import FilterParams from './requestModel'
const qs = require('qs')

@Module({
  name: 'filters',
  namespaced: true,
  stateFactory: true,
})
export default class FiltersStore extends VuexModule {
  filterParams = { ...new FilterParams() }
  error = null

  @VuexMutation
  setError(val) {
    this.error = val
  }

  @VuexMutation
  setFilterParams(val) {
    this.filterParams = val
  }

  @VuexAction({ rawError: true })
  createFilterParams(params) {
    try {
      const filterParams = new FilterParams(params)
      this.setFilterParams({ ...filterParams })
      this.setError(null)
    } catch (error) {
      this.setError(error)
      this.setFilterParams(null)
    }
  }

  @VuexAction()
  clearFilterParams() {
    this.setFilterParams({ ...new FilterParams() })
    this.setError(null)
  }

  @VuexAction()
  async nextPage() {
    try {
      // const objects = getModule(ObjectsStore, this.store)
      this.setFilterParams({
        ...this.filterParams,
        page: this.filterParams.page + 1,
      })
      this.setError(null)
      await this.context.dispatch('objects/getObjectList', this.filterParams, {
        root: true,
      })
      // await objects.getObjectList(this.filterParams)
    } catch (error) {
      console.error(error)
      this.setError(error)
      this.setFilterParams(null)
    }
  }
}
