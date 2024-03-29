import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'object', namespaced: true, stateFactory: true })
export default class Object_ extends VuexModule {
  loading = false
  objectId = null
  object = null
  error = null
  activeRequest = null
  bandMap = {
    1: 'g',
    2: 'r',
  }

  @VuexMutation
  setObjectId(val) {
    this.objectId = val
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

  @VuexMutation
  setActiveRequest(req) {
    this.activeRequest = req
  }

  @VuexAction({ rawError: true })
  async getObject(val) {
    if (this.loading) return
    this.setLoading(true)
    if (this.activeRequest) {
      this.activeRequest.cancel('Cancel request due to new request sent')
      this.setActiveRequest(null)
    }
    this.setActiveRequest(this.store.$axios.CancelToken.source())
    try {
      const object = await this.store.$ztfApi.getObject(val, this.activeRequest)
      this.setActiveRequest(null)
      this.setObject(object.data)
      this.setObjectId(object.data.oid)
      this.setError(null)
      this.setLoading(false)
    } catch (error) {
      if (!error.message.startsWith('Cancel request')) {
        this.setError(error)
        this.setLoading(false)
      }
    }
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
    } else if (nextObjectIndex > 0) {
      // get next page from API
      this.context.dispatch('pagination/goToNext', null, { root: true })
      await this.context.dispatch('filters/search', null, { root: true })
      if (this.store.state.objects.list.length) {
        // set first object of result page
        this.setObjectId(this.store.state.objects.list[0].oid)
      }
    } else if (nextObjectIndex < 0 && this.store.state.pagination.page > 1) {
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

  @VuexAction({ rawError: true })
  changeObjectId(val) {
    this.setObjectId(val)
  }
}
