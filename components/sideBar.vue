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
    console.log(target)
    if (target) {
      const observer = new MutationObserver((mutations) => {
        // mutations.forEach(function (mutation) {
        //   console.log(mutation)
        // })
        this._loadEventManager()
      })

      const config = { childList: true, subtree: true }

      observer.observe(target, config)
    }
  }

  _loadEventManager() {
    const rowsElements = document.getElementsByName('sidebar-row-element')

    rowsElements.forEach((element) => {
      console.log(element)
      window.htmx.on(element, 'htmx:beforeRequest', function (evt) {
        console.log(evt)
      })
    })
  }
}
</script>
