<template>
  <div>
    test!!
    {{ htmx }}
  </div>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardLightCurve extends Vue {
  @Prop({ type: String }) htmx

  htmx = ''
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
