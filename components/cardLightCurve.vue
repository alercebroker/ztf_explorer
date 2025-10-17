<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card>
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
      <div
        id="main-app-nuxt"
        :height="height"
        width="100%"
        hx-trigger="update-lightcurve from:body"
      ></div>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

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
  objectId = ''

  get isDark() {
    return this.$vuetify.theme.isDark
  }

  updatePlotSelected(event) {
    this.selected = event
  }

  mounted() {
    const _oid = '169298433200881680'
    const survey = 'lsst'
    this.objectId = this.$route.params.oid

    this._loadHtmx(_oid, survey)
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

  _loadHtmx(objectId, survey) {
    // const url = new URL(
    //   `lightcurve_api/htmx/lightcurve?oid=${objectId}&survey_id=${survey}`,
    //   this.$config.alerceApiBaseUrl
    // )

    const url = new URL(
      `http://127.0.0.1:8001/htmx/lightcurve?oid=${objectId}&survey_id=${survey}`,
      this.$config.alerceApiBaseUrl
    )

    url.searchParams.append('oid', objectId)

    const myDiv = document.getElementById('main-app-nuxt')
    if (myDiv) {
      myDiv.setAttribute('hx-get', url)
      window.htmx.process(myDiv)
      document.body.dispatchEvent(new Event('update-lightcurve'))
    }
  }

  @Watch('isDark', { immediate: true })
  async onIsDarkChange(newIsDark) {
    await this.$nextTick()

    const container = document.getElementById('main-app')
    const toggleTheme = document.getElementById('toggle-theme-lc')

    if (container) {
      if (newIsDark) {
        container.classList.add('tw-dark')
      } else {
        container.classList.remove('tw-dark')
      }

      toggleTheme.dispatchEvent(new Event('click'))
    }
  }
}
</script>
<style></style>
