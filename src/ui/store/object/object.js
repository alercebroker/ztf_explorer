import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'object', namespaced: true, stateFactory: true })
export default class ObjectStore extends VuexModule {
  loading = false
  object = null
  error = null
  bandMap = {
    '1': 'g',
    '2': 'r',
  }

  @VuexMutation
  setObject(val) {
    this.object = val
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
  async getObject(oid) {
    if (this.loading) return
    this.setLoading(true)
    await this.store.$services.objects.getOne.execute(oid, {
      returnSuccess: (object) => {
        this.setObject(object)
        this.setError(null)
        this.setLoading(false)
      },
      returnClientError: (error) => {
        this.setError(error.message)
        this.setObject(null)
        this.setLoading(false)
      },
      returnServerError: (error) => {
        this.setError(error.message)
        this.setObject(null)
        this.setLoading(false)
      },
      returnParseError: (error) => {
        this.setError(error.message)
        this.setObject(null)
        this.setLoading(false)
      },
    })
  }
}
