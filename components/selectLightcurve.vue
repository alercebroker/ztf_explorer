<template>
  <div>
    <slot :name="selected" />
  </div>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class SelectLightcurve extends Vue {
  @Prop({ type: String }) selected
}
</script>
