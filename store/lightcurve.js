import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'lightcurve', namespaced: true, stateFactory: true })
export default class LightCurveStore extends VuexModule {
  loading = false
  error = null
  detections = []
  nonDetections = []
  selectedDetection = null
  activeRequest = null

  @VuexMutation
  setDetections(val) {
    this.detections = val
  }

  @VuexMutation
  setNonDetections(val) {
    this.nonDetections = val
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
  setSelectedDetection(val) {
    this.selectedDetection = val
  }

  @VuexAction
  changeDetection(val) {
    this.setSelectedDetection(val)
  }

  @VuexMutation
  setActiveRequest(req) {
    this.activeRequest = req
  }

  @VuexAction({ rawError: true })
  async getLightCurve(val) {
    this.setLoading(true)
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())
    try {
      const lightCurve = await this.store.$ztfApi.getLightCurve(
        val,
        this.activeRequest
      )
      this.setActiveRequest(null)
      this.setDetections(lightCurve.data.detections)
      this.setNonDetections(lightCurve.data.non_detections)
      this.setSelectedDetection(null)
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
