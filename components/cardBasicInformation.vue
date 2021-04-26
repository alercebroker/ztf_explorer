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
      <v-card-text v-else>
        <tables-basic-information :information="information" />
        <v-row justify="center" wrap>
          <v-col cols="6">
            <buttons-finding-chart-button
              :oid="information.oid"
              :candid="candid"
              :useIcon="false"
            />
          </v-col>
          <v-col cols="6">
            <buttons-catalogs-buttons
              :ra="information.meanra"
              :dec="information.meandec"
              title="Catalogs"
            />
          </v-col>
        </v-row>

        <tables-tns-information
          :loading="tns.loading"
          :type="tns.type"
          :name="tns.name"
          :redshift="tns.redshift"
          :discoverer="tns.discoverer"
          :reporter="tns.reporter"
          :instrument="tns.instrument"
        />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component()
export default class CardBasicInformation extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: Boolean, default: true }) show

  @Prop({ type: String }) cardClass

  @Prop({ type: String }) object

  get isLoading() {
    return this.$store.state.object.loading
  }

  get error() {
    const error = this.$store.state.object.error
    return error
  }

  get information() {
    const nonDetections = this.$store.state.lightcurve.nonDetections
    const info = this.$store.state.object.object
      ? this.$store.state.object.object
      : {}
    info['Non Detections'] = nonDetections ? nonDetections.length : null
    return info
  }

  get tns() {
    return this.$store.state.tns
  }

  get candid() {
    const detection = this.$store.state.lightcurve.detections.find(
      (x) => x.has_stamp
    )
    return detection ? detection.candid : null
  }
}
</script>
