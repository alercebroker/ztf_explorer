<template>
  <v-col v-if="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card>
      <alerce-select-display :options="options">
        <alerce-light-curve-plot
          slot="difference"
          :detections="lightcurve.detections"
          :nonDetections="lightcurve.nonDetections"
          type="difference"
        />
        <alerce-light-curve-plot
          slot="apparent"
          :detections="lightcurve.detections"
          type="apparent"
        />
        <alerce-light-curve-plot
          slot="folded"
          :detections="lightcurve.detections"
          :period="period"
          type="folded"
        />
      </alerce-select-display>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardLightCurve extends Vue {
  @Prop({ type: Number | String, default: 12 })
  cols

  @Prop({ type: Number | String, default: 12 })
  lg

  @Prop({ type: Number | String, default: 12 })
  md

  @Prop({ type: Number | String, default: 12 })
  sm

  @Prop({ type: Object, default: () => {} })
  lightcurve

  @Prop({ type: Number, default: 1 })
  period

  @Prop({ type: Boolean, default: true })
  show

  options = [
    { text: 'Difference Magnitude', value: 'difference' },
    { text: 'Apparent Magnitude', value: 'apparent' },
    { text: 'Folded', value: 'folded' },
  ]
}
</script>
