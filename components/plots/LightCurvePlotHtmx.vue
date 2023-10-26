<template>
  <v-card v-if="isLoading || error">
    <v-card-text v-if="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
      Fetching data for object {{ objectId }} ...
    </v-card-text>
    <v-card-text v-if="error">
      <v-alert text prominent type="error" icon="mdi-cloud-alert">
        {{ error }}
      </v-alert>
    </v-card-text>
  </v-card>
  <v-card v-else width="100%">
    <div>
      <span v-html="htmx"></span>
    </div>
  </v-card>
</template>
<script>
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'

@Component
export default class LightCurvePlotHtmx extends Vue {
  @Prop({ type: String }) type
  @Prop({ type: String }) objectId

  get htmx() {
    return this.$store.state.lightcurve.htmx
  }

  @Watch('type', { immediate: true })
  onTypeChange(newType) {
    const plotConfig = { objectId: this.objectId, type: newType }
    this.$store.dispatch('lightcurve/getLightCurveHTMX', plotConfig)
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
