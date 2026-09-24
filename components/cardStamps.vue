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
        <v-alert text prominent type="error" icon="mdi-cloud-alert">{{
          error
        }}</v-alert>
      </v-card-text>
      <cards-stamps-card
        v-else
        v-model="selectedDetection"
        :baseURL="$config.avroApiBaseUrl"
        :detections="detections"
        :object="oid"
        :cross-hair-space="crossHairSpace"
        @avroClick="onAvroClick"
      />
    </v-card>
    <v-dialog v-model="avroDialogOpen" max-width="700px">
      <tables-full-avro-table :avro="avro">
        <template v-if="avroLoading" v-slot:table>
          <v-progress-linear indeterminate></v-progress-linear>
        </template>
        <template v-slot:actions>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary darken-1" text @click="avroDialogOpen = false"
              >Close</v-btn
            >
          </v-card-actions>
        </template>
      </tables-full-avro-table>
    </v-dialog>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardStamps extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: String }) oid

  @Prop({ type: Number }) crossHairSpace

  @Prop({ type: String }) cardClass

  avroDialogOpen = false

  get detections() {
    return this.$store.state.lightcurve.detections
  }

  get isLoading() {
    return this.$store.state.lightcurve.loading
  }

  get error() {
    return this.$store.state.lightcurve.error
  }

  get selectedDetection() {
    if (this.$store.state.lightcurve.selectedDetection != null)
      return this.$store.state.lightcurve.selectedDetection
    const detection = this.$store.state.lightcurve.detections.findIndex(
      (x) => x.has_stamp
    )
    return detection
  }

  set selectedDetection(val) {
    this.$store.dispatch('lightcurve/changeDetection', val)
  }

  get avroLoading() {
    return this.$store.state.avro.loading
  }

  get avro() {
    return this.$store.state.avro.avro.candidate
  }

  onAvroClick(payload) {
    this.avroDialogOpen = true
    const detection = this.detections[payload]
    this.$store.dispatch('avro/getAvro', {
      oid: this.oid,
      candid: detection.candid,
    })
  }
}
</script>
