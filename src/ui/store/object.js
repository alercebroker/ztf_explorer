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

  @VuexAction({ rawError: true })
  async changeItem(n) {
    const nextObjectIndex =
      this.store.state.objects.list.findIndex((x) => x.oid === this.objectId) +
      n
    if (
      nextObjectIndex >= 0 &&
      nextObjectIndex < this.store.state.objects.list.length
    ) {
      // set next object
      this.setObjectId(this.store.state.objects.list[nextObjectIndex].oid)
    } else if (nextObjectIndex > 0 && this.store.state.pagination.hasNext) {
      // get next page from API
      this.context.dispatch('pagination/goToNext', null, { root: true })
      await this.context.dispatch('filters/search', null, { root: true })
      // set first object of result page
      this.setObjectId(this.store.state.objects.list[0].oid)
    } else if (nextObjectIndex < 0 && this.store.state.pagination.hasPrev) {
      // get previous page from API
      this.context.dispatch('pagination/goToPrev', null, { root: true })
      await this.context.dispatch('filters/search', null, { root: true })
      // set last object from result page
      this.setObjectId(
        this.store.state.objects.list[this.store.state.objects.list.length - 1]
          .oid
      )
    }
  }
}
