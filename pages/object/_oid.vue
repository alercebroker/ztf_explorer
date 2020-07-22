<template>
  <v-container>
    <v-row>
      <card-basic-information
        :information="objectInformation"
        :tns="tns"
        :show="objectInformation != null"
        cols="12"
        lg="3"
        md="8"
        sm="12"
      />

      <card-light-curve
        :lightcurve="objectLightcurve"
        :period="0.5"
        :show="objectLightcurve.loaded"
        cols="12"
        lg="6"
        md="12"
        sm="12"
      />

      <card-aladin
        :ra="3"
        :dec="4"
        :show="objectInformation != null"
        cols="12"
        lg="3"
        md="8"
        sm="12"
      />

      <card-mag-stats
        :show="objectInformation != null"
        cols="12"
        lg="3"
        md="8"
        sm="12"
      />

      <card-classifiers
        :classifiers="objectClassification.classifiers"
        :show="objectClassification.loaded"
        cols="12"
        lg="3"
        md="8"
        sm="12"
      />

      <card-stamps
        :show="objectInformation != null"
        cols="12"
        lg="6"
        md="8"
        sm="12"
      />
    </v-row>
  </v-container>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import { objectStore } from '~/store'

@Component
export default class ObjectView extends Vue {
  get objectId() {
    return objectStore.objectId
  }

  get objectInformation() {
    return objectStore.objectInformation
  }

  get objectLightcurve() {
    return objectStore.objectLightcurve
  }

  get objectClassification() {
    return objectStore.classifications
  }

  get period() {
    return 1
  }

  get tns() {
    return objectStore.objectTNS
  }

  mounted() {
    objectStore.getObject(this.$route.params.oid)
  }
}
</script>
