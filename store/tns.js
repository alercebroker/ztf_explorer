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
  reporter = null
  discoverer = null
  instrument = null

  @VuexMutation
  setType(val) {
    this.type = val
  }

  @VuexMutation
  setName(val) {
    this.name = val
  }

  @VuexMutation
  setRedShift(val) {
    this.redshift = val
  }

  @VuexMutation
  setReporter(val) {
    this.reporter = val
  }

  @VuexMutation
  setDiscoverer(val) {
    this.discoverer = val
  }

  @VuexMutation
  setLoading(val) {
    this.loading = val
  }

  @VuexMutation
  setInstrument(val) {
    this.instrument = val
  }

  @VuexAction
  setDefaultValues() {
    this.setType('-')
    this.setName('-')
    this.setRedShift('-')
    this.setReporter(null)
    this.setDiscoverer(null)
    this.setInstrument(null)
    this.setLoading(false)
  }

  @VuexAction({ rawError: true })
  async getTns(payload) {
    this.setLoading(true)
    let tnsInformation = await this.store.$tnsApi.isInTNS(
      payload.ra,
      payload.dec,
      payload.internal_name
    )
    tnsInformation = tnsInformation.data
    this.setType(tnsInformation.object_type ? tnsInformation.object_type : '-')
    this.setName(tnsInformation.object_name ? tnsInformation.object_name : '-')
    const objectData = tnsInformation.object_data
    this.setRedShift(objectData.redshift ? objectData.redshift : '-')
    if (objectData && objectData.reporter === 'ALeRCE') {
      this.setReporter(objectData.reporter)
      this.setDiscoverer(objectData.discoverer)
      this.setInstrument(objectData.discovery_data_source.group_name)
    } else {
      this.setReporter(null)
      this.setDiscoverer(null)
      this.setInstrument(null)
    }
    this.setLoading(false)
  }
}
