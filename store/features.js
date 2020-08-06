import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'features', namespaced: true, stateFactory: true })
export default class FeaturesStore extends VuexModule {
  loading = false
  error = false
  features = []

  @VuexMutation
  setFeatures(val) {
    this.features = val.data
  }

  @VuexMutation
  setLoading(val) {
    this.loading = val
  }

  @VuexMutation
  setError(val) {
    this.error = val
  }

  @VuexAction({ rawError: true })
  async getFeatures(val) {
    this.setLoading(true)
    try {
      this.setFeatures(await this.store.$ztfApi.getFeatures(val))
      this.setError(null)
    } catch (error) {
      this.setError(error)
    }
    this.setLoading(false)
  }
}
