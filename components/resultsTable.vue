<template>
  <v-card>
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
        this.onIsDarkChange(this.isDark)
      }
    })
  }

  _loadHtmx() {
    const myDiv = document.getElementById('objects_table')

    if (myDiv) {
      window.htmx.process(myDiv)
      document.body.dispatchEvent(new Event('update-table-objects'))
    }
  }
}
</script>
