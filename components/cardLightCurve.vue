<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card :class="cardClass">
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
      <v-card id="lightcurve-container" width="100%" height="100%"> </v-card>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
import * as htmx from 'htmx.org'

@Component
export default class CardLightCurve extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: Boolean, default: true }) show

  @Prop({ type: String }) cardClass

  isLoading = true
  error = ''

  get objectInformation() {
    return this.$store.state.object.object
  }

  get objectId() {
    return this.$store.state.object.objectId
  }

  updatePlotSelected(event) {
    this.selected = event
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
    document.body.addEventListener('onDetectionClick', (val) => {
      if (val) this.$store.dispatch('lightcurve/changeDetection', val.detail)
    })
  }

  @Watch('objectId', { immediate: true })
  onIdChange(newId) {
    this.error = ''
    this.isLoading = true
    if (newId) {
      const url = `${this.$config.ztfApiv2Url}/lightcurve/htmx/lightcurve?oid=${newId}`
      console.log(url)
      const myDiv = document.getElementById('lightcurve-container')
      if (myDiv) {
        myDiv.innerHTML = `<div hx-get=${url} hx-trigger="updateLightcurve from:body" hx-swap="outerHTML"></div>`
        htmx.process(myDiv)
        document.body.dispatchEvent(new Event('updateLightcurve'))
      }
    }
  }
}
</script>
