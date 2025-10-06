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

  get isDark() {
    return this.$vuetify.theme.dark
  }

  mounted() {
    this._checkQueryParams()
    this._loadHtmx()
    this.$el.addEventListener('htmx:responseError', (event) => {
      this.error = event.detail.error
      this.isLoading = false
    })
    this.$el.addEventListener('htmx:afterRequest', (event) => {
      if (event.detail.successful) {
        this.error = ''
        this.isLoading = false
        this.height = '100%'
      }
    })

    this.$el.addEventListener(
      'htmx:afterSwap',
      this.onIsDarkChange(this.isDark)
    )
  }

  beforeDestroy() {
    this.observer.disconnect()
  }

  _checkQueryParams() {
    const params = this.$route.query
    this.QueryParams = params
  }

  _displayObjectsBar() {
    const numberOfObjects = document.getElementsByName(
      'sidebar-row-element'
    ).length
    this.$emit('show-side-bar', numberOfObjects)
  }

  _loadHtmx() {
    const myDiv = document.getElementById('sidebar-objects-htmx')
    const url = new URL('http://127.0.0.1:8000/htmx/side_objects')

    for (const [key, value] of Object.entries(this.QueryParams)) {
      url.searchParams.append(key, value)
    }

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
      this.observer = new MutationObserver((mutations) => {
        this.onIsDarkChange(this.isDark)
        this._displayObjectsBar()
        this._loadEventManager()
      })

      const config = { childList: true, subtree: true }

      this.observer.observe(target, config)
    }
  }

  _loadEventManager() {
    const rowsElements = document.getElementsByName('sidebar-row-element')

    rowsElements.forEach((element) => {
      window.htmx.on(element, 'htmx:afterRequest', (event) => {
        if (event.detail.successful) {
          const paramsEventDict = event.detail.requestConfig.parameters
          this.$router.push({
            path: `/object/${paramsEventDict.selected_oid}`,
            query: { ...paramsEventDict },
          })
        }
      })
    })
  }

  @Watch('isDark', { immediate: true })
  async onIsDarkChange(newIsDark) {
    await this.$nextTick()

    const container = document.getElementById('sidebar-objects-htmx')
    if (container) {
      if (newIsDark) {
        container.classList.add('tw-dark')
      } else {
        container.classList.remove('tw-dark')
      }
    }
  }
}
</script>
