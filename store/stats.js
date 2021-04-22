import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation,
} from 'nuxt-property-decorator'

@Module({ name: 'stats', namespaced: true, stateFactory: true })
export default class StatsStore extends VuexModule {
  stats = []
  loading = false
  error = null
  activeRequest = null

  @VuexMutation
  setStats(val) {
    this.stats = val
  }

  @VuexMutation
  setError(val) {
    this.error = val
  }

  @VuexMutation
  setLoading(val) {
    this.loading = val
  }

  @VuexMutation
  setActiveRequest(req) {
    this.activeRequest = req
  }

  @VuexAction({ rawError: true })
  async getStats(val) {
    this.setLoading(true)
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())
    try {
      const stats = await this.store.$ztfApi.getStats(val, this.activeRequest)
      this.setActiveRequest(null)
      this.setStats(stats.data)
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
