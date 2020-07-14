import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true, name: 'objects', stateFactory: true })
export default class Objects extends VuexModule {
  list = []
  selected = null

  @Mutation
  set(val) {
    this.list = val
  }
}
