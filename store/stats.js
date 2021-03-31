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

  @VuexAction({ rawError: true })
  async getStats(val) {
    this.setLoading(true)
    try {
      const stats = await this.store.$ztfApi.getStats(val)
      this.setStats(stats.data)
      this.setError(null)
    } catch (error) {
      this.setError(error)
    }
    this.setLoading(false)
  }
}
