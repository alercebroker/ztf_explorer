import { Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'
const defaultState = {
  list: [],
  noDataText: 'No data available',
}
@Module({ name: 'objects', namespaced: true, stateFactory: true })
export default class Objects extends VuexModule {
  list = []
  noDataText = 'Results will appear here'

  @VuexMutation
  set(val) {
    this.list = val
    this.noDataText = defaultState.noDataText
  }

  @VuexMutation
  setNoDataText(val) {
    this.noDataText = val
  }
}
