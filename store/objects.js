import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'objects', namespaced: true, stateFactory: true })
export default class Objects extends VuexModule {
  list = []
  selected = null
  indexSelected = null

  @VuexMutation
  set(val) {
    this.list = val
  }

  @VuexMutation
  select(val) {
    this.list = val
  }

  @VuexMutation
  setSelected(val) {
    this.selected = val.oid
    this.indexSelected = this.list.findIndex(
      (element) => element.oid === val.oid
    )
  }

  @VuexMutation
  setIndexSelected(val) {
    this.indexSelected = val
    this.selected = this.list[val].oid
  }

  @VuexAction
  setItem(item) {
    this.setSelected(item)
  }
}
