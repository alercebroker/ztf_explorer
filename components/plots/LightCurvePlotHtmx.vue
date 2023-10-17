<template>
  <div>
    <span v-html="htmx"></span>
  </div>
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

  @Watch('type')
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
