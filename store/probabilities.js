import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation,
} from 'nuxt-property-decorator'

@Module({ name: 'probabilities', namespaced: true, stateFactory: true })
export default class ProbabilitiesStore extends VuexModule {
  loading = false
  probabilities = []

  @VuexMutation
  setProbabilities(val) {
    this.classifiers = val
  }

  @VuexMutation
  setLoading(val) {
    this.loading = val
  }

  @VuexAction({ rawError: true })
  async getProbabilities(val) {
    this.setLoading(true)
    const probabilities = await this.store.$ztfApi.getProbabilities(val)
    this.setProbabilities(probabilities.data)
    this.setLoading(false)
  }
}
