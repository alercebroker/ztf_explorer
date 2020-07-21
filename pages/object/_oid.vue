<template>
  <v-container>
    <v-row>
      <v-col v-if="objectInformation" cols="12" lg="3" md="4" sm="12">
        <v-card>
          <alerce-basic-information :information="objectInformation" />
          <alerce-catalogs-buttons
            :ra="objectInformation.meanra"
            :dec="objectInformation.meandec"
          />
          <alerce-tns-information type="aaa" name="dasdas" :redshift="0" />
        </v-card>
      </v-col>

      <v-col v-if="objectLightcurve" cols="12" lg="6" md="8" sm="12">
        <v-card>
          <alerce-select-display :options="options">
            <alerce-light-curve-plot
              slot="difference"
              :detections="objectLightcurve.detections"
              :nonDetections="objectLightcurve.nonDetections"
              type="difference"
            />
            <alerce-light-curve-plot
              slot="apparent"
              :detections="objectLightcurve.detections"
              type="apparent"
            />
            <alerce-light-curve-plot
              slot="folded"
              :detections="objectLightcurve.detections"
              :period="period"
              type="folded"
            />
          </alerce-select-display>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import { objectStore } from '~/store'

@Component
export default class ObjectView extends Vue {
  options = [
    { text: 'Difference Magnitude', value: 'difference' },
    { text: 'Apparent Magnitude', value: 'apparent' },
    { text: 'Folded', value: 'folded' },
  ]

  get objectId() {
    return objectStore.objectId
  }

  get objectInformation() {
    return objectStore.objectInformation
  }

  get objectLightcurve() {
    return objectStore.objectLightcurve
  }

  get period() {
    return 1
  }

  mounted() {
    objectStore.getObject(this.$route.params.oid)
  }
}
</script>
