<template>
  <v-container :fluid="doFluid">
    <v-row align="stretch">
      <card-basic-information
        :object="$route.params.oid"
        card-class="grid-card"
        lg="4"
        md="6"
        sm="12"
      />

      <card-light-curve
        :period="period"
        :oid="selectedObject"
        card-class="grid-card"
        lg="8"
        md="6"
        sm="12"
      />

      <card-aladin
        v-model="selectedObject"
        card-class="grid-card"
        lg="3"
        md="6"
        sm="12"
      />

      <card-classifiers
        card-class="grid-card"
        cols="12"
        lg="4"
        md="6"
        sm="12"
      />

      <card-stamps
        :oid="selectedObject"
        :cross-hair-space="25"
        card-class="grid-card"
        lg="5"
        md="6"
      />

      <card-cross-matches cols="12" lg="12" md="12" sm="12" />
    </v-row>
    <v-dialog v-model="showModal" max-width="800px" @click:outside="closeModal">
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Magnitude Statistics</span>
          <v-btn icon @click="closeModal">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <div id="magstats-modal-content"></div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { Vue, Component, Watch } from 'nuxt-property-decorator'
import {
  lightCurveStore,
  statsStore,
  probabilitiesStore,
  featuresStore,
  objectStore,
  xmatchesStore,
  datareleaseStore,
} from '~/store'

@Component({ layout: 'oid' })
export default class ObjectView extends Vue {
  showModal = false

  head() {
    return {
      title: this.selectedObject ? this.selectedObject : this.$route.params.oid,
    }
  }

  async fetch() {
    let oid = this.$route.params.oid
    if (this.selectedObject) oid = this.selectedObject
    lightCurveStore.getLightCurve(oid)
    statsStore.getStats(oid)
    probabilitiesStore.getProbabilities(oid)
    featuresStore.getFeatures(oid)
    await objectStore.getObject(oid)
    datareleaseStore.getDataReleaseLightCurve({
      ra: this.objectInformation.meanra,
      dec: this.objectInformation.meandec,
      radius: 1.5,
    })
    xmatchesStore.getXmatch({
      ra: this.objectInformation.meanra,
      dec: this.objectInformation.meandec,
    })
  }

  created() {
    document.addEventListener('keyup', this.keyboardEvents)
    window.addEventListener('openMagstatsModal', this.openModal)
  }

  destroyed() {
    document.removeEventListener('keyup', this.keyboardEvents)
    window.removeEventListener('openMagstatsModal', this.openModal)
  }

  keyboardEvents(evt) {
    switch (evt.keyCode) {
      case 39:
        this.changeObject(1)
        break
      case 37:
        this.changeObject(-1)
        break
    }
  }

  async changeObject(n) {
    if (this.objects !== null || this.objects.length !== 0) {
      await objectStore.changeItem(n)
      this.$router.push(this.selectedObject)
    }
  }

  closeModal() {
    this.showModal = false
  }

  openModal() {
    this.showModal = true
    this.$nextTick(() => {
      this.loadMagstatsContent()
    })
  }

  loadMagstatsContent() {
    const objectId = this.selectedObject || this.$route.params.oid
    const url = new URL(
      `/v2/magstats/htmx/mag/${objectId}`,
      this.$config.alerceApiBaseUrl
    )

    const container = document.getElementById('magstats-modal-content')
    if (container) {
      const handleAfterSwap = () => {
        this.applyThemeToModal()
        container.removeEventListener('htmx:afterSwap', handleAfterSwap)
      }
      container.addEventListener('htmx:afterSwap', handleAfterSwap)

      window.htmx.ajax('GET', url.toString(), {
        target: '#magstats-modal-content',
      })
    }
  }

  applyThemeToModal() {
    const container = document.getElementById('magstats-modal-content')
    if (container) {
      const magstatsApp = container.querySelector('#magstats-app')
      if (magstatsApp) {
        if (this.$vuetify.theme.isDark) {
          container.classList.add('tw-dark')
          magstatsApp.classList.add('tw-dark')
        } else {
          container.classList.remove('tw-dark')
          magstatsApp.classList.remove('tw-dark')
        }
      }
    }
  }

  get objects() {
    return this.$store.state.objects.list
  }

  get selectedObject() {
    return this.$store.state.object.objectId
  }

  set selectedObject(val) {}

  get objectInformation() {
    return this.$store.state.object.object
  }

  get error() {
    const error = this.$store.state.object.error
    if (error.response.status === 404)
      this.$nuxt.error({ statusCode: 404, messages: 'Object not found.' })
    return error
  }

  get period() {
    return null
  }

  @Watch('selectedObject')
  onSelectedObjectChange(val) {
    this.$router.push(val)
  }

  @Watch('$vuetify.theme.isDark')
  onThemeChange(isDark) {
    this.applyThemeToModal()
  }

  get doFluid() {
    return this.$vuetify.breakpoint.width < 1400
  }
}
</script>
<style>
.grid-card {
  height: 100%;
  width: 100%;
}
*[class^='col-'] {
  padding-top: 15px;
}
</style>
