<template>
  <v-container fluid>
    <v-row align="stretch">
      <card-basic-information
        :information="objectInformation"
        :tns="tns"
        :show="objectInformation != null"
        card-class="grid-card"
        lg="3"
        md="6"
        sm="12"
      />

      <card-light-curve
        :lightcurve="objectLightcurve"
        :period="0.5"
        :show="objectLightcurve.loaded"
        card-class="grid-card"
        lg="6"
        md="6"
        sm="12"
      />

      <card-aladin
        v-model="selectedObject"
        :objects="objects"
        :object-data="objectInformation"
        :show="objectInformation != null"
        :card-class="grid - card"
        lg="3"
        md="6"
        sm="12"
      />

      <card-mag-stats
        :stats="stats"
        :show="objectInformation != null"
        card-class="grid-card"
        lg="3"
        md="6"
        sm="12"
      />

      <card-classifiers
        :classifiers="objectClassification.classifiers"
        :show="objectClassification.loaded"
        card-class="grid-card"
        cols="12"
        lg="3"
        md="6"
        sm="12"
      />

      <card-stamps
        v-model="selectedDetection"
        :show="objectInformation != null"
        :detections="objectLightcurve.detections"
        :oid="selectedObject"
        :cross-hair-space="25"
        card-class="grid-card"
        lg="6"
        md="6"
      />

      <card-cross-matches
        :data="crossmatches.data"
        :show="crossmatches.loaded"
        cols="12"
        lg="12"
        md="12"
        sm="12"
      />
    </v-row>
  </v-container>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
import { objectStore, objectsStore, filtersStore } from '~/store'

@Component
export default class ObjectView extends Vue {
  selectedDetection = 0

  head() {
    return {
      title: this.selectedObject,
    }
  }

  beforeMount() {
    if (objectsStore.selected === null) {
      this.selectedObject = this.$route.params.oid
    } else {
      this.selectedObject = objectsStore.selected
    }
  }

  created() {
    document.addEventListener('keyup', this.keyboardEvents)
  }

  destroyed() {
    document.removeEventListener('keyup', this.keyboardEvents)
  }

  keyboardEvents(evt) {
    switch (evt.keyCode) {
      case 39:
        this.changeObject(1)
        break
      case 37:
        this.changeObject(-1)
        break
    }
  }

  changeObject(n) {
    if (this.objects !== null || this.objects.length !== 0) {
      filtersStore.changeItem(n).then(() => {
        this.$router.push(this.selectedObject)
      })
    }
  }

  get objects() {
    return objectsStore.list
  }

  get selectedObject() {
    return objectsStore.selected
  }

  set selectedObject(val) {
    objectStore.getObject(val).catch(() => {
      this.$nuxt.error({ statusCode: 404, messages: 'Object not found.' })
    })
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

  get crossmatches() {
    return objectStore.crossmatches
  }

  get stats() {
    return objectStore.stats
  }
}
</script>
<style>
.grid-card {
  height: 100%;
}
</style>
