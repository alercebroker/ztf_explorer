import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation,
} from 'nuxt-property-decorator'

@Module({ name: 'probabilities', namespaced: true, stateFactory: true })
export default class ProbabilitiesStore extends VuexModule {
  loading = false
  error = null
  probabilities = []
  activeRequest = null

  @VuexMutation
  setProbabilities(val) {
    this.probabilities = val
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
  async getProbabilities(val) {
    this.setLoading(true)
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())
    try {
      const probabilities = await this.store.$ztfApi.getProbabilities(
        val,
        this.activeRequest
      )
      this.setActiveRequest(null)
      this.setProbabilities(probabilities.data)
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
