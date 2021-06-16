<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card v-if="isLoading || error" :class="cardClass">
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
    <v-card v-else :class="cardClass">
      <v-card-text class="pb-0">
        <select-lightcurve :selected="selected">
          <plots-light-curve-plot
            slot="difference"
            :detections="lightcurve.detections"
            :non-detections="lightcurve.nonDetections"
            type="difference"
            :dark="isDark"
            @detectionClick="onDetectionClick"
          />
          <plots-light-curve-plot
            slot="apparent"
            :detections="apparent"
            type="apparent"
            :dark="isDark"
            @detectionClick="onDetectionClick"
          />
          <plots-light-curve-plot
            slot="folded"
            :detections="apparent"
            :period="period"
            type="folded"
            :dark="isDark"
            @detectionClick="onDetectionClick"
          />
        </select-lightcurve>
      </v-card-text>
      <!-- OPTIONS -->
      <v-card-actions class="py-0">
        <!--RADIO BUTTONS-->
        <buttons-lightcurve-radio-buttons
          v-model="selected"
          :options="options"
        />
        <v-spacer />
        <!-- LIGHTCURVE BUTTONS -->
        <buttons-display-data-release
          v-model="dataReleaseValues"
          :datarelease="dataRelease"
          :loading="isLoadingDataRelease"
          :plot="selected"
          @update-plot="updatePlotSelected"
        />
        <v-spacer />
        <buttons-download-lightcurve-button
          :oid="objectId"
          :detections="lightcurve.detections"
          :non-detections="lightcurve.nonDetections"
        />
      </v-card-actions>
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

  @Prop({ type: Number, default: null }) period

  @Prop({ type: Boolean, default: true }) show

  @Prop({ type: String }) cardClass

  selected = ''

  dataReleaseValues = []

  options = [
    {
      text: 'Difference Magnitude',
      value: 'difference',
      tooltip:
        'The difference Magnitude light curve, is the absolute difference between a science and reference magnitudes.',
      show: true,
      default: true,
    },
    {
      text: 'Apparent Magnitude',
      value: 'apparent',
      tooltip:
        'Apparent magnitude light curve results from adding/subtracting the fluxes from the reference and difference in the same unit system and then converting to magnitudes.',
      show: true,
    },
    {
      text: 'Folded',
      value: 'folded',
      tooltip:
        'The Period folded light curve, where time is transformed to time modulo the period (Phase).',
      show: true,
    },
  ]

  get isDark() {
    return this.$vuetify.theme.isDark
  }

  get isLoading() {
    return this.$store.state.lightcurve.loading
  }

  get error() {
    return this.$store.state.lightcurve.error
  }

  get lightcurve() {
    return {
      detections: this.$store.state.lightcurve.detections,
      nonDetections: this.$store.state.lightcurve.nonDetections,
    }
  }

  get dataRelease() {
    return this.$store.state.datarelease.dataReleaseLightCurve
  }

  get isLoadingDataRelease() {
    return this.$store.state.datarelease.loading
  }

  get apparent() {
    return this.lightcurve.detections.concat(this.dataReleaseValues)
  }

  get objectInformation() {
    return this.$store.state.object.object
  }

  get objectId() {
    return this.$store.state.object.objectId
  }

  @Watch('objectInformation')
  onObjectInformation(val) {
    this.options.forEach((x) => {
      switch (x.value) {
        case 'difference':
          x.default = !val.corrected
          break
        case 'apparent':
          x.show = val.corrected
          x.default = val.corrected
          break
        case 'folded':
          x.show = this.period !== null && val.corrected
          break
      }
    })
  }

  @Watch('dataRelease')
  onDataReleaseValues(val) {
    this.options.forEach((x) => {
      switch (x.value) {
        case 'apparent':
          x.show = this.objectInformation.corrected || val.length > 0
          x.default = this.objectInformation.corrected
          break
        case 'folded':
          x.show =
            this.period !== null &&
            (this.objectInformation.corrected || val.length > 0)
          break
      }
    })
  }

  @Watch('period')
  onPeriod(val) {
    if (this.objectInformation) {
      this.options[2].show = val !== null && this.objectInformation.corrected
    }
  }

  onDetectionClick(val) {
    if (val) this.$store.dispatch('lightcurve/changeDetection', val.index)
  }

  updatePlotSelected(event) {
    this.selected = event
  }
}
</script>
