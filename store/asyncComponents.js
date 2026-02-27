import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation,
} from 'nuxt-property-decorator'

@Module({ name: 'asyncComponents', namespaced: true, stateFactory: true })
export default class ComponentsStore extends VuexModule {
  sideBarLoaded = false
  globalLoading = false
  loadingOid = ''

  @VuexMutation
  setSideBarLoad(val) {
    this.sideBarLoaded = val
  }

  @VuexMutation
  setGlobalLoading(val) {
    this.globalLoading = val
  }

  @VuexMutation
  setLoadingOid(val) {
    this.loadingOid = val
  }

  @VuexAction({ rawError: true })
  setSideBarLoadingAction(val) {
    this.setSideBarLoad(val)
  }

  @VuexAction({ rawError: true })
  setGlobalLoadingAction(val) {
    this.setGlobalLoading(val)
  }

  @VuexAction({ rawError: true })
  setLoadingOidAction(val) {
    this.setLoadingOid(val)
  }
}
