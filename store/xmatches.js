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
  activeRequest = null

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

  @VuexMutation
  setActiveRequest(req) {
    this.activeRequest = req
  }

  @VuexAction({ rawError: true })
  async getXmatch(payload) {
    this.setLoading(true)
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())
    try {
      payload.radius = payload.radius ? payload.radius : 50
      const xmatches = await this.store.$catsHtmApi.xmatchall(
        payload.ra,
        payload.dec,
        payload.radius
      )
      this.setActiveRequest(null)
      this.setXmatches(xmatches.data)
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
