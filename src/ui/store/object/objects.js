import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'
import { provideVuex, consume } from 'provide-consume-decorator'
import { provideObject } from '@app/object/provider'

@Module({ name: 'objects', namespaced: true, stateFactory: true })
@provideVuex({
  test: 'test',
})
export default class ObjectsStore extends VuexModule {
  @consume('test') tp

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
    await this.service.objects.getMany.execute(params, {
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
