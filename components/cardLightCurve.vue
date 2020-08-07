<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card v-if="isLoading || error" :class="cardClass">
      <v-card-text v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        Fetching data for object {{ $route.params.oid }} ...
      </v-card-text>
      <v-card-text v-if="error">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          {{ error }}
        </v-alert>
      </v-card-text>
    </v-card>
    <v-card v-else :class="cardClass">
      <v-card-text>
        <select-lightcurve :selected="selected">
          <alerce-light-curve-plot
            slot="difference"
            :detections="lightcurve.detections"
            :non-detections="lightcurve.nonDetections"
            type="difference"
            :dark="isDark"
          />
          <alerce-light-curve-plot
            slot="apparent"
            :detections="lightcurve.detections"
            type="apparent"
            :dark="isDark"
          />
          <alerce-light-curve-plot
            slot="folded"
            :detections="lightcurve.detections"
            :period="period"
            type="folded"
            :dark="isDark"
          />
        </select-lightcurve>
      </v-card-text>
      <!-- OPTIONS -->
      <v-card-actions>
        <!--RADIO BUTTONS-->
        <alerce-lightcurve-radio-buttons
          v-model="selected"
          :options="options"
        />
        <v-spacer />
        <!--DOWNLOAD LIGHTCURVE-->
        <alerce-download-lightcurve-button
          :oid="oid"
          :lightcurve="lightcurve"
        />
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardLightCurve extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: Number, default: 1 }) period

  @Prop({ type: Boolean, default: true }) show

  @Prop({ type: String }) cardClass

  @Prop({ type: String }) oid

  selected = ''

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

  options = [
    {
      text: 'Difference Magnitude',
      value: 'difference',
      default: true,
      tooltip:
        'The difference Magnitude light curve, is the absolute difference between a science and reference magnitudes.',
      show: true,
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
}
</script>
