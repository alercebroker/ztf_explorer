<template>
  <v-card id="objects_table_vue">
    <v-card
      id="objects_table"
      width="100%"
      :height="height"
      hx-get="http://127.0.0.1:8000/table"
      hx-trigger="update-table-objects from:body"
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
    return this.$vuetify.theme.isDark
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
    const myDiv = document.getElementById('objects_table')

    if (myDiv) {
      window.htmx.process(myDiv)
      document.body.dispatchEvent(new Event('update-table-objects'))
      this._loadObserver()
    }
  }

  _loadObserver() {
    const target = document.querySelector('#objects_table_vue')

    if (target) {
      this.observer = new MutationObserver((mutations) => {
        this._loadEventManager()
      })

      const config = { childList: true }

      this.observer.observe(target, config)
    }
  }

  _loadEventManager() {
    const rowsElements = document.getElementsByName('object_row_element')

    rowsElements.forEach((element) => {
      window.htmx.off(element, 'click')

      window.htmx.on(element, 'click', (event) => {
        this.$router.push({
          path: '/object/123',
          query: { ...this.$route.query },
        })
      })
    })
  }
}
</script>
