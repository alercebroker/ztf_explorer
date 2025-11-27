<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card :class="cardClass">
      <v-card v-if="isLoading || error">
        <v-card-text v-if="isLoading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          Fetching data for object {{ this.loadingText }} ...
        </v-card-text>
        <v-card-text v-if="error">
          <v-alert text prominent type="error" icon="mdi-cloud-alert">
            {{ error }}
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card id="stamp-app" width="100%" :height="height"> </v-card>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardStamps extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: String }) oid

  @Prop({ type: Number }) crossHairSpace

  @Prop({ type: String }) cardClass

  avroDialogOpen = false

  get detections() {
    return this.$store.state.lightcurve.detections
  }

  get isLoading() {
    return this.$store.state.lightcurve.loading
  }

  get error() {
    return this.$store.state.lightcurve.error
  }

  mounted() {
    const params = { ...this.$route.query }
    const _oid = this.$route.params.oid
    this.loadingText = this.$route.params.oid

    this._loadHtmx(_oid, params)
    this.$el.addEventListener('htmx:responseError', (event) => {
      this.error = event.detail.error
      this.isLoading = false
    })

    window.htmx.on('#stamp-app', 'htmx:afterSwap', (event) => {
      if (event.detail.successful && event.detail.elt.id === 'stamp-app') {
        this.error = ''
        this.isLoading = false
        this.width = '100%'
        this.height = '100%'
        this._loadMagstatsTemplate(_oid, params)
        this.onIsDarkChange(this.isDark)
      }
    })
  }

  _loadHtmx(objectId, params) {
    const url = new URL(
      `htmx/stamp_card?oid=${objectId}&survey_id=${params.survey}`,
      this.$config.stampApiBaseUrl
    )

    const myDiv = document.getElementById('stamp-app')

    if (myDiv) {
      window.htmx.ajax('GET', `${url}`, {
        target: '#stamp-app',
        swap: 'innerHTML',
      })
      document.body.dispatchEvent(new Event('update-stamp'))
    }
  }

  get selectedDetection() {
    if (this.$store.state.lightcurve.selectedDetection != null)
      return this.$store.state.lightcurve.selectedDetection
    const detection = this.$store.state.lightcurve.detections.findIndex(
      (x) => x.has_stamp
    )
    return detection
  }

  set selectedDetection(val) {
    this.$store.dispatch('lightcurve/changeDetection', val)
  }

  get avroLoading() {
    return this.$store.state.avro.loading
  }

  get avro() {
    return this.$store.state.avro.avro.candidate
  }

  onAvroClick(payload) {
    this.avroDialogOpen = true
    const detection = this.detections[payload]
    this.$store.dispatch('avro/getAvro', {
      oid: this.oid,
      candid: detection.candid,
    })
  }
}
</script>
