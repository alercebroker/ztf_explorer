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
  htmx = null
  selected = ''
  selectedDetection = null
  activeRequest = null

  @VuexMutation
  setHTMX(val) {
    this.htmx = val
  }

  @VuexMutation
  setSelected(val) {
    this.selected = val
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
  setActiveRequest(req) {
    this.activeRequest = req
  }

  @VuexAction
  changeSelected(req) {
    this.selected = req
    this.getLightCurveHTMX(this.$route.params.oid)
  }

  @VuexAction({ rawError: true })
  async getLightCurveHTMX(val) {
    this.setLoading(true)
    this.setHTMX('')

    // making ztf sync request
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())

    try {
      const lightCurveHTMX = await this.store.$ztfApi.getLightCurveHTMX(
        val,
        this.selected,
        this.activeRequest
      )
      this.setActiveRequest(null)
      this.setHTMX(lightCurveHTMX.data)
      this.setError(null)
      this.setLoading(false)
    } catch (error) {
      if (error.response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token')
        await this.context.dispatch('user/refreshToken', refreshToken, {
          root: true,
        })
        this.getLightCurveHTMX(val)
        return
      }
      if (!error.message.startsWith('Cancel request')) {
        this.setError(error)
      }
      this.setLoading(false)
    }
  }

  @VuexMutation
  setDetections(val) {
    this.detections = val
  }

  @VuexMutation
  setNonDetections(val) {
    this.nonDetections = val
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
    this.setDetections([])
    this.setNonDetections([])

    // making ztf sync request
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())

    try {
      const lightCurve = await this.store.$ztfApi.getLightCurve(
        val,
        'ztf',
        this.activeRequest
      )
      this.setActiveRequest(null)
      this.setDetections(lightCurve.data.detections)
      this.setNonDetections(lightCurve.data.non_detections)
      this.setSelectedDetection(null)
      this.setError(null)
      this.setLoading(false)
    } catch (error) {
      if (error.response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token')
        await this.context.dispatch('user/refreshToken', refreshToken, {
          root: true,
        })
        this.getLightCurve(val)
        return
      }
      if (!error.message.startsWith('Cancel request')) {
        this.setError(error)
      }
      this.setLoading(false)
    }

    // making atlas sync request
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())

    try {
      const lightCurve = await this.store.$ztfApi.getLightCurve(
        val,
        'atlas',
        this.activeRequest
      )
      this.setActiveRequest(null)
      this.setDetections(this.detections.concat(lightCurve.data.detections))
      this.setError(null)
      this.setLoading(false)
    } catch (error) {
      if (error.response.status === 401) {
        const refreshToken = localStorage.getItem('refresh_token')
        await this.context.dispatch('user/refreshToken', refreshToken, {
          root: true,
        })
        this.getLightCurve(val)
        return
      }
      if (
        !error.message.startsWith('Cancel request') &&
        error.response.status !== 404 &&
        error.response.status !== 403
      ) {
        this.setError(error)
      }
      this.setLoading(false)
    }
  }
}
