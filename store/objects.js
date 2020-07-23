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

  @VuexMutation
  set(val) {
    this.list = val
  }

  @VuexMutation
  select(val) {
    this.list = val
  }

  @VuexAction
  setSelected(item) {
    console.log(item)
    const indexItem = this.list.findIndex((element) => element.oid === item.oid)
    console.log(indexItem)
  }
}
