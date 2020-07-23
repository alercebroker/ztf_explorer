<template>
  <v-col v-if="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card :class="cardClass">
      <alerce-stamps-card
        v-model="localSelectedDetection"
        :detections="detections"
        :object="oid"
        :cross-hair-space="crossHairSpace"
      />
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Model, Watch } from 'nuxt-property-decorator'

@Component
export default class CardStamps extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: Boolean, default: true }) show

  @Prop({ type: Array, default: () => [] }) detections

  @Prop({ type: String }) oid

  @Prop({ type: Number }) crossHairSpace

  @Prop({ type: String }) cardClass

  @Model('selectDetection', { type: Number, default: 0 }) selectedDetection

  localSelectedDetection = 0

  beforeMount() {
    this.localSelectedDetection = this.selectedDetection
  }

  @Watch('selectedDetection')
  onSelectedDetectionChange(newVal) {
    this.localSelectedDetection = newVal
  }
}
</script>
