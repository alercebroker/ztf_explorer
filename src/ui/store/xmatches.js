import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'xmatches', namespaced: true, stateFactory: true })
export default class XmatchesStore extends VuexModule {
  loading = false
  error = null
  xmatches = []

  @VuexMutation
  setLoading(val) {
    this.loading = val
  }

  @VuexMutation
  setXmatches(val) {
    this.xmatches = val
  }

  @VuexMutation
  setError(val) {
    this.error = val
  }

  @VuexAction({ rawError: true })
  async getXmatch(payload) {
    this.setLoading(true)
    try {
      payload.radius = payload.radius ? payload.radius : 50
      const xmatches = await this.store.$catsHtmApi.xmatchall(
        payload.ra,
        payload.dec,
        payload.radius
      )
      this.setXmatches(xmatches.data)
      this.setError(null)
    } catch (error) {
      this.setError(error)
    }
    this.setLoading(false)
  }
}
