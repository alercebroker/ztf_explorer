import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation,
} from 'nuxt-property-decorator'

@Module({ name: 'asyncComponents', namespaced: true, stateFactory: true })
export default class ComponentsStore extends VuexModule {
  sideBarLoaded = false

  @VuexMutation
  setSideBarLoad(val) {
    this.sideBarLoaded = val
  }

  @VuexAction({ rawError: true })
  setSideBarLoadingAction(val) {
    this.setSideBarLoad(val)
  }
}
