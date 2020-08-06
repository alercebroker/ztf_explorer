<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card :class="cardClass">
      <v-card-text v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        Fetching data for object {{ $route.params.oid }} ...
      </v-card-text>
      <v-card-text v-else-if="error">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          {{ error }}
        </v-alert>
      </v-card-text>
      <alerce-stamps-card
        v-else
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

  @Prop({ type: String }) oid

  @Prop({ type: Number }) crossHairSpace

  @Prop({ type: String }) cardClass

  @Model('selectDetection', { type: Number, default: 0 }) selectedDetection

  localSelectedDetection = 0

  beforeMount() {
    this.localSelectedDetection = this.selectedDetection
  }

  get detections() {
    return this.$store.state.lightcurve.detections
  }

  get isLoading() {
    return this.$store.state.lightcurve.loading
  }

  get error() {
    return this.$store.state.lightcurve.error
  }

  @Watch('selectedDetection')
  onSelectedDetectionChange(newVal) {
    this.localSelectedDetection = newVal
  }
}
</script>
