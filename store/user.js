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
  async refreshToken(refreshToken) {
    try {
      const tokens = await this.store.$usersApi.refresh(refreshToken)
      if (tokens.status === 200) {
        const userData = await this.store.$usersApi.current(tokens.data.access)
        this.setUserData(userData.data)
        this.setLogged(true)
        this.setError(null)
        localStorage.setItem('access_token', tokens.data.access)
      }
    } catch (error) {
      if (error.response.status === 401) {
        this.logout()
      }
      this.setError(error)
      this.setLoading(false)
    }
  }

  @VuexAction({ rawError: true })
  async getCurrentUser({ accessToken, refreshToken }) {
    this.setLoading(true)
    try {
      const userData = await this.store.$usersApi.current(accessToken)
      this.setUserData(userData.data)
      this.setLogged(true)
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          this.refreshToken(refreshToken)
        }
      } else {
        this.setError(error)
        this.logout()
      }
    }
    this.setLoading(false)
  }

  @VuexAction({ rawError: true })
  async getGoogleUrl() {
    this.setLoading(true)
    try {
      const googleUrl = await this.store.$usersApi.getGoogleUrl()
      this.setError(null)
      this.setLoading(false)
      return googleUrl.data
    } catch (error) {
      this.setError(error)
      this.setLoading(false)
      return null
    }
  }

  @VuexAction({ rawError: true })
  async loginGoogle(payload) {
    this.setLoading(true)
    try {
      const tokens = await this.store.$usersApi.loginGoogle(payload)
      if (tokens.status === 200 || tokens.status === 201) {
        const userData = await this.store.$usersApi.current(tokens.data.access)
        this.setUserData(userData.data)
        this.setLogged(true)
        localStorage.setItem('access_token', tokens.data.access)
        localStorage.setItem('refresh_token', tokens.data.refresh)
      }
      this.setError(null)
    } catch (error) {
      this.setError(null)
    }
    this.setLoading(false)
  }

  @VuexAction({ rawError: true })
  async register(userDataPayload) {
    this.setLoading(true)
    try {
      const userData = await this.store.$usersApi.register(userDataPayload)
      this.setUserData(userData)
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
