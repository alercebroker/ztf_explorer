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

  @VuexAction({ rawError: true })
  async getLightCurve(val) {
    this.setLoading(true)
    try {
      const lightCurve = await this.store.$ztfApi.getLightCurve(val)
      this.setDetections(lightCurve.data.detections)
      this.setNonDetections(lightCurve.data.non_detections)
      this.setSelectedDetection(null)
      this.setError(null)
    } catch (error) {
      this.setError(error)
    }
    this.setLoading(false)
  }
}
