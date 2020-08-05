import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'lightcurve', namespaced: true, stateFactory: true })
export default class LightCurveStore extends VuexModule {
  loading = false
  detections = []
  nonDetections = []

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
    this.setLoading = val
  }

  @VuexAction({ rawError: true })
  async getLightCurve(val) {
    this.setLoading(true)
    const lightCurve = await this.store.$ztfApi.getLightCurve(val)
    this.setDetections(lightCurve.data.detections)
    this.setNonDetections(lightCurve.data.non_detections)
    this.setLoading(false)
  }
}
