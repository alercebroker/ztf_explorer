import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation,
} from 'nuxt-property-decorator'

@Module({ name: 'probabilities', namespaced: true, stateFactory: true })
export default class ProbabilitiesStore extends VuexModule {
  loading = false
  error = null
  probabilities = []

  @VuexMutation
  setProbabilities(val) {
    this.classifiers = val
  }

  @VuexMutation
  setLoading(val) {
    this.loading = val
  }

  @VuexMutation
  setError(val) {
    this.error = val
  }

  @VuexAction({ rawError: true })
  async getProbabilities(val) {
    this.setLoading(true)
    try {
      const probabilities = await this.store.$ztfApi.getProbabilities(val)
      this.setProbabilities(probabilities.data)
      this.setError(null)
    } catch (error) {
      this.setError(error)
    }
    this.setLoading(false)
  }
}
