import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'objects', namespaced: true, stateFactory: true })
export default class ObjectsStore extends VuexModule {
  objectList = []
  loading = false
  error = null

  @VuexMutation
  setObjectList(val) {
    this.objectList = val
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
  async getObjectList(params) {
    if (this.loading) return
    this.setLoading(true)
    await this.store.$services.objects.getMany.execute(params, {
      returnSuccess: (objects) => {
        this.setObjectList(objects)
        this.setError(null)
        this.setLoading(false)
      },
      returnClientError: (error) => {
        this.setError(error.message)
        this.setObjectList([])
        this.setLoading(false)
      },
      returnServerError: (error) => {
        this.setError(error.message)
        this.setObjectList([])
        this.setLoading(false)
      },
      returnParseError: (error) => {
        this.setError(error.message)
        this.setObjectList([])
        this.setLoading(false)
      },
    })
  }
}
