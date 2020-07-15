import { Module, VuexModule, VuexMutation } from 'nuxt-property-decorator'

@Module({ name: 'objects', namespaced: true, stateFactory: true })
export default class Objects extends VuexModule {
  list = []
  selected = null

  @VuexMutation
  set(val) {
    this.list = val
  }

  @VuexMutation
  select(val) {
    this.list = val
  }
}
