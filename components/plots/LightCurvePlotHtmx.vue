<script
  src="https://unpkg.com/htmx.org@1.9.6"
  integrity="sha384-FhXw7b6AlE/jyjlZH5iHa/tTe9EpJ1Y55RjcgPbjeWMskSxZt1v9qkxLJWNJaGni"
  crossorigin="anonymous"
></script>
<template>
  <v-card id="lightcurve-container" width="100%"> </v-card>
</template>
<script>
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
import { process } from 'htmx.org'

@Component
export default class LightCurvePlotHtmx extends Vue {
  @Prop({ type: String }) type
  @Prop({ type: String }) objectId

  get isLoading() {
    return this.$store.state.lightcurve.loading
  }

  get error() {
    return this.$store.state.lightcurve.error
  }

  get plotConfig() {
    return { objectId: this.objectId, type: this.type }
  }

  @Watch('plotConfig', { immediate: true })
  onConfigChange(newConfig) {
    if (newConfig.objectId && newConfig.type) {
      const url = `http://127.0.0.1:8080/htmx/plot/${newConfig.type}?oid=${newConfig.objectId}`
      const myDiv = document.getElementById('lightcurve-container')
      if (myDiv) {
        myDiv.innerHTML = `<div hx-get=${url} hx-trigger="updateLightcurve from:body"></div>`
        process(myDiv)
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
