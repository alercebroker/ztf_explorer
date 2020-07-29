<template>
  <v-col v-if="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card :class="cardClass">
      <v-card-text>
        <alerce-select-display :options="options">
          <alerce-light-curve-plot
            slot="difference"
            :detections="lightcurve.detections"
            :non-detections="lightcurve['non_detections']"
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
        </alerce-select-display>
      </v-card-text>
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

  @Prop({ type: Object, default: () => {} }) lightcurve

  @Prop({ type: Number, default: 1 }) period

  @Prop({ type: Boolean, default: true }) show

  @Prop({ type: String }) cardClass

  get isDark() {
    return this.$vuetify.theme.isDark
  }

  options = [
    {
      text: 'Difference Magnitude',
      value: 'difference',
      default: true,
      tooltip:
        'The difference Magnitude light curve, is the absolute difference between a science and reference magnitudes.',
    },
    {
      text: 'Apparent Magnitude',
      value: 'apparent',
      tooltip:
        'Apparent magnitude light curve results from adding/subtracting the fluxes from the reference and difference in the same unit system and then converting to magnitudes.',
    },
    {
      text: 'Folded',
      value: 'folded',
      tooltip:
        'The Period folded light curve, where time is transformed to time modulo the period (Phase).',
    },
  ]
}
</script>
