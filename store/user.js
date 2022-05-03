import {
  Module,
  VuexModule,
  VuexMutation,
  VuexAction,
} from 'nuxt-property-decorator'

@Module({ name: 'user', namespaced: true, stateFactory: true })
export default class UserStore extends VuexModule {
  loading = false
  error = null
  userData = null
  logged = false

  @VuexMutation
  setUserData(val) {
    this.userData = val
  }

  @VuexMutation
  setLogged(val) {
    this.logged = val
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
  async login({ username, password }) {
    this.setLoading(true)
    try {
      const tokens = await this.store.$usersApi.login(username, password)
      if (tokens.status === 200) {
        const userData = await this.store.$usersApi.current(tokens.data.access)
        this.setUserData(userData.data)
        this.setLogged(true)
        localStorage.setItem('access_token', tokens.data.access)
        localStorage.setItem('refresh_token', tokens.data.refresh)
      }
      this.setError(null)
    } catch (error) {
      this.setError(error)
    }
    this.setLoading(false)
  }

  @VuexAction({ rawError: true })
  logout() {
    this.setUserData(null)
    this.setLogged(false)
    localStorage.clear()
  }

  get genericError() {
    if (this.error != null) {
      return this.error.message
    } else {
      return ''
    }
  }

  get detailError() {
    if (this.error != null) {
      return this.error.response.data
    }
    return {}
  }

  get errored() {
    return this.error != null
  }
}
