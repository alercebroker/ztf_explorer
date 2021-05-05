import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'datarelease', namespaced: true, stateFactory: true })
export default class DataReleaseStore extends VuexModule {
  loading = false
  error = null
  activeRequest = null
  dataReleaseLightCurve = []

  @VuexMutation
  setActiveRequest(req) {
    this.activeRequest = req
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
  setDataReleaseLightcurve(val) {
    this.dataReleaseLightCurve = val
  }

  @VuexAction({ rawError: true })
  async getDataReleaseLightCurve(val) {
    this.setLoading(true)
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())
    try {
      const lightCurves = await this.store.$dataReleaseApi.getLightcurve(
        val,
        this.activeRequest
      )
      this.setDataReleaseLightcurve(lightCurves)
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
