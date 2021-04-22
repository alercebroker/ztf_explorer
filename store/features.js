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
  activeRequest = null

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

  @VuexMutation
  setActiveRequest(val) {
    this.activeRequest = val
  }

  @VuexAction({ rawError: true })
  async getFeatures(val) {
    this.setLoading(true)
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())
    try {
      this.setFeatures(
        await this.store.$ztfApi.getFeatures(val, this.activeRequest)
      )
      this.setActiveRequest(null)
      this.setError(null)
      this.setLoading(false)
    } catch (error) {
      if (!error.message.startsWith('Cancel request')) {
        this.setError(error)
        this.setLoading(false)
      }
    }
  }
}
