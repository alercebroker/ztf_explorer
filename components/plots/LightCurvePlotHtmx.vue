<script
  src="https://unpkg.com/htmx.org@1.9.6"
  integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni"
  crossorigin="anonymous"
></script>
<template>
  <v-card>
    <v-card id="lightcurve-container" width="100%"> </v-card>
    <v-card v-if="isLoading || error">
      <v-card-text v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        Fetching data for object {{ objectId }} ...
      </v-card-text>
      <v-card-text v-if="error">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          {{ error }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-card>
</template>
<script>
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
import * as htmx from 'htmx.org'

@Component
export default class LightCurvePlotHtmx extends Vue {
  @Prop({ type: String }) type
  @Prop({ type: String }) objectId
  isLoading = true
  error = ''

  get plotConfig() {
    return { objectId: this.objectId, type: this.type }
  }

  mounted() {
    this.$el.addEventListener('htmx:responseError', (event) => {
      this.error = event.detail.error
      this.isLoading = false
    })
    this.$el.addEventListener('htmx:afterRequest', (event) => {
      if (event.detail.successful) {
        this.error = ''
        this.isLoading = false
      }
    })
  }

  @Watch('plotConfig', { immediate: true })
  onConfigChange(newConfig) {
    this.error = ''
    this.isLoading = true
    if (newConfig.objectId && newConfig.type) {
      const url = `${this.$config.lightCurveApiv2Url}/htmx/plot/${newConfig.type}?oid=${newConfig.objectId}`
      console.log(url)
      const myDiv = document.getElementById('lightcurve-container')
      if (myDiv) {
        myDiv.innerHTML = `<div hx-get=${url} hx-trigger="updateLightcurve from:body"></div>`
        htmx.process(myDiv)
        document.body.dispatchEvent(new Event('updateLightcurve'))
      }
    }
  }
}
</script>

<style css>
.echarts {
  margin: auto;
  width: 100%;
  height: 100%;
  min-height: 350px;
}
</style>
