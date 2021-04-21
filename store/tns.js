import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'tns', namespaced: true, stateFactory: true })
export default class TnsStore extends VuexModule {
  loading = false
  type = '-'
  name = '-'
  redshift = '-'
  activeRequest = null
  error = null

  @VuexMutation
  setType(val) {
    this.type = val
  }

  @VuexMutation
  setName(val) {
    this.name = val
  }

  @VuexMutation
  setError(val) {
    this.error = val
  }

  @VuexMutation
  setRedShift(val) {
    this.redshift = val
  }

  @VuexMutation
  setLoading(val) {
    this.loading = val
  }

  @VuexMutation
  setActiveRequest(val) {
    this.activeRequest = val
  }

  @VuexAction
  setDefaultValues() {
    this.setType('-')
    this.setName('-')
    this.setRedShift('-')
    this.setLoading(false)
  }

  @VuexAction({ rawError: true })
  async getTns(payload) {
    this.setLoading(true)
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())
    try {
      let tnsInformation = await this.store.$tnsApi.isInTNS(
        payload.ra,
        payload.dec
      )
      this.setActiveRequest(null)
      tnsInformation = tnsInformation.data
      this.setType(
        tnsInformation.object_type ? tnsInformation.object_type : '-'
      )
      this.setName(
        tnsInformation.object_name ? tnsInformation.object_name : '-'
      )
      this.setRedShift(
        tnsInformation.object_data ? tnsInformation.object_data.redshift : '-'
      )
      this.setLoading(false)
    } catch (error) {
      if (!error.message.startsWith('Cancel request')) {
        this.setError(error)
        this.setLoading(false)
      }
    }
  }
}
