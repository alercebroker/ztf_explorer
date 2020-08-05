import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'features', namespaced: true, stateFactory: true })
export default class FeaturesStore extends VuexModule {
  loading = false
  features = []

  @VuexMutation
  setFeatures(val) {
    this.features = val
  }

  @VuexMutation
  setLoading(val) {
    this.loading = val
  }

  @VuexAction({ rawError: true })
  async getFeatures(val) {
    this.setLoading(true)
    this.setFeatures(await this.store.$ztfApi.getFeatures(val.data))
    this.setLoading(false)
  }
}
