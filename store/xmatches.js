import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'xmatches', namespaced: true, stateFactory: true })
export default class XmatchesStore extends VuexModule {
  loading = false
  xmatches = []

  @VuexMutation
  setLoading(val) {
    this.loading = val
  }

  @VuexMutation
  setXmatches(val) {
    this.xmatches = val
  }

  @VuexAction({ rawError: true })
  async getXmatch(payload) {
    this.setLoading(true)
    payload.radius = payload.radius ? payload.radius : 50
    const xmatches = await this.store.$catsHtmApi.xmatchall(
      payload.ra,
      payload.dec,
      payload.radius
    )
    this.setXmatches(xmatches.data)
    this.setLoading(false)
  }
}
