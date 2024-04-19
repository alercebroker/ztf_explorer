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
      <v-card id="lightcurve-app" width="100%" :height="height"> </v-card>
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
  height = '0vh'

  get objectInformation() {
    return this.$store.state.object.object
  }

  get objectId() {
    return this.$store.state.object.objectId
  }

  get isDark() {
    return this.$vuetify.theme.isDark
  }

  updatePlotSelected(event) {
    this.selected = event
  }

  mounted() {
    const _oid = this.objectId || this.$route.params.oid
    this._loadHtmx(_oid)
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
    document.body.addEventListener('onDetectionClick', (val) => {
      if (val) this.$store.dispatch('lightcurve/changeDetection', val.detail)
    })
  }

  _loadHtmx(objectId) {
    const url = `${this.$config.ztfApiv2Url}/lightcurve/htmx/lightcurve?oid=${objectId}`
    const myDiv = document.getElementById('lightcurve-app')
    if (myDiv) {
      myDiv.innerHTML = `<div hx-get=${url} hx-trigger="updateLightcurve from:body" hx-swap="outerHTML"></div>`
      htmx.process(myDiv)
      document.body.dispatchEvent(new Event('updateLightcurve'))
    }
  }

  @Watch('objectId', { immediate: true })
  onIdChange(newId) {
    this.error = ''
    this.isLoading = true
    if (newId) {
      this._loadHtmx(newId)
    }
  }

  @Watch('isDark', { immediate: true })
  onIsDarkChange(newIsDark) {
    const container = document.getElementById('lightcurve-app')
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
<style></style>
