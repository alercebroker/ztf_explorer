<template>
  <v-card id="sidebar-container">
    <v-card
      id="sidebar"
      width="100%"
      :height="height"
      hx-get="http://127.0.0.1:8000/sidebar"
      hx-trigger="update-sidebar from:body"
    >
    </v-card>
  </v-card>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class ResultTableWrapper extends Vue {
  isLoading = true
  error = ''
  height = '0vh'
  observer = ''

  get isDark() {
    return this.$vuetify.theme.dark
  }

  mounted() {
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

  _loadHtmx() {
    const myDiv = document.getElementById('sidebar')

    if (myDiv) {
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
    const nextPage = document.getElementsByName('next_page_sidebar')
    const prevPage = document.getElementsByName('prev_page_sidebar')

    rowsElements.forEach((element) => {
      window.htmx.on(element, 'htmx:afterRequest', (evt) => {
        const paramsEventDict = evt.detail.requestConfig.parameters
        this.$router.push({ path: '/', query: { ...paramsEventDict } })
      })
    })

    nextPage.forEach((element) => {
      window.htmx.on(element, 'htmx:afterRequest', (evt) => {
        const paramsEventDict = evt.detail.requestConfig.parameters
        this.$router.push({ path: '/', query: { ...paramsEventDict } })
      })
    })

    prevPage.forEach((element) => {
      window.htmx.on(element, 'htmx:afterRequest', (evt) => {
        const paramsEventDict = evt.detail.requestConfig.parameters
        this.$router.push({ path: '/', query: { ...paramsEventDict } })
      })
    })
  }
}
</script>
