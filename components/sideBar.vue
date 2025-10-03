<template>
  <v-card id="sidebar-container">
    <v-card
      id="sidebar"
      width="100%"
      :height="height"
      hx-trigger="update-sidebar from:body"
    >
    </v-card>
  </v-card>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'

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
        // this.onIsDarkChange(this.isDark)
      }
    })
  }

  beforeDestroy() {
    this.observer.disconnect()
  }

  _checkQueryParams() {
    const params = this.$route.query
    this.QueryParams = params
  }

  _loadHtmx() {
    const myDiv = document.getElementById('sidebar')
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
        this._loadEventManager()
      })

      const config = { childList: true, subtree: true }

      this.observer.observe(target, config)
    }
  }

  _loadEventManager() {
    const rowsElements = document.getElementsByName('sidebar-row-element')

    this.$emit('show-side-bar', rowsElements.length)

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
}
</script>
