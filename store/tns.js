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
  setLoading(val) {
    this.loading = val
  }

  @VuexAction({ rawError: true })
  async getTns(payload) {
    this.setLoading(true)
    const tnsInformation = await this.store.$tnsApi.isInTNS(
      payload.ra,
      payload.dec
    )
    this.setType(tnsInformation.object_type ? tnsInformation.object_type : '-')
    this.setName(tnsInformation.object_name ? tnsInformation.object_name : '-')
    this.setRedShift(
      tnsInformation.object_data ? tnsInformation.object_data.redshift : '-'
    )
    this.setLoading(false)
  }
}
