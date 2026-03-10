<template>
  <v-card id="sidebar-container">
    <v-card
      id="sidebar-objects-htmx"
      width="100%"
      :height="height"
      hx-trigger="update-sidebar from:body"
    >
    </v-card>
  </v-card>
</template>

<script>
import { Vue, Component, Watch } from 'nuxt-property-decorator'

@Component
export default class sideListWrapper extends Vue {
  isLoading = true
  error = ''
  height = '0%'
  observer = ''
  QueryParams = null

  get isDark() {
    return this.$vuetify.theme.dark
  }

  get sideBarLoad() {
    return this.$store.state.asyncComponents.sideBarLoaded
  }

  mounted() {
    this._checkQueryParams()
    this._loadHtmx()
    this.$el.addEventListener('htmx:responseError', (event) => {
      this.error = event.detail.error
      this.isLoading = false
      this.$store.dispatch('asyncComponents/setSideBarLoadingAction', false)
    })
    this.$el.addEventListener('htmx:afterRequest', (event) => {
      if (event.detail.successful) {
        this.error = ''
        this.isLoading = false
        this.height = '100%'
        this.onIsDarkChange(this.isDark)
      }
    })

    this.$el.addEventListener('htmx:afterSwap', async (event) => {
      if (event.detail.successful) {
        await this.$nextTick()
        this._displayObjectsBar()
        this.$store.dispatch('asyncComponents/setSideBarLoadingAction', true)
      }
    })
  }

  beforeDestroy() {
    if (this.observer) this.observer.disconnect()
  }

  _checkQueryParams() {
    const params = this.$route.query
    this.QueryParams = this._checkSingleSearch(params)
  }

  _checkSingleSearch(params) {
    if (this._checkConditionsForSingleSearch(params)) {
      params.oid = this.$route.params.oid
    }
    return params
  }

  _checkConditionsForSingleSearch(params) {
    const paramsLenght = Object.keys(params).length
    if (!params.oid && paramsLenght <= 1) return true
    return false
  }

  _displayObjectsBar() {
    const numberOfObjects = document.getElementsByName(
      'sidebar-row-element'
    ).length
    this.$emit('show-side-bar', numberOfObjects)
  }

  _loadHtmx() {
    const myDiv = document.getElementById('sidebar-objects-htmx')
    let url = new URL('htmx/side_objects', this.$config.objectApiBaseUrl)
    url = this.$appendParamsInUrl(url, this.QueryParams)
    if (myDiv) {
      myDiv.setAttribute('hx-get', url)
      window.htmx.process(myDiv)
      document.body.dispatchEvent(new Event('update-sidebar'))
      this._loadObserver()
    }
  }

  _loadObserver() {
    const target = document.querySelector('#sidebar-container')
    if (target) {
      this.observer = new MutationObserver(() => {
        this.onIsDarkChange(this.isDark)
        this._loadEventManager()
      })
      this.observer.observe(target, { childList: true, subtree: true })
    }
  }

  _loadEventManager() {
    const rowsElements = document.getElementsByName('sidebar-row-element')
    rowsElements.forEach((element) => {
      window.htmx.on(element, 'click', (event) => {
        const selectedOid = element.textContent.trim()
        this.QueryParams.selected_oid = selectedOid

        this.$router.push({
          path: `/object/${selectedOid}`,
          query: { ...this.QueryParams },
        })
      })
    })
  }

  @Watch('isDark', { immediate: true })
  async onIsDarkChange(newIsDark) {
    await this.$nextTick()
    const container = document.getElementById('sidebar-objects-htmx')
    if (container) {
      if (newIsDark) container.classList.add('tw-dark')
      else container.classList.remove('tw-dark')
    }
  }
}
</script>
