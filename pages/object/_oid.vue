<template>
  <v-container fluid>
    {{ selectedObject }}
    {{ objectInformation }}
    <h1>AAAA</h1>
    <v-row>
      <card-basic-information
        :information="objectInformation"
        :tns="tns"
        :show="objectInformation != null"
        lg="3"
        md="6"
        sm="12"
      />

      <card-light-curve
        :lightcurve="objectLightcurve"
        :period="0.5"
        :show="objectLightcurve.loaded"
        lg="6"
        md="6"
        sm="12"
      />

      <card-aladin
        v-model="selectedObject"
        :objects="objects"
        :object-data="objectInformation"
        :show="objectInformation != null"
        lg="3"
        md="6"
        sm="12"
      />

      <card-mag-stats
        :stats="stats"
        :show="objectInformation != null"
        lg="3"
        md="6"
        sm="12"
      />

      <card-classifiers
        :classifiers="objectClassification.classifiers"
        :show="objectClassification.loaded"
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
import { objectStore, objectsStore } from '~/store'

@Component
export default class ObjectView extends Vue {
  selectedDetection = 0

  beforeMount() {
    // this.selectedObject = this.$route.params.oid
    if (objectsStore.selected === null) {
      this.selectedObject = this.$route.params.oid
    } else {
      this.selectedObject = objectsStore.selected
    }
  }

  created() {
    const view = this
    document.addEventListener('keyup', function (evt) {
      switch (evt.keyCode) {
        case 39:
          view.nextObject()
          break
        case 37:
          view.prevObject()
          break
      }
    })
  }

  nextObject() {
    if (this.objects !== null || this.objects.length !== 0) {
      console.log('a', this.objects)
      objectsStore.changeItem(1)
      this.selectedObject = objectsStore.selected
      console.log('b', this.selectedObject)
    }
  }

  prevObject() {
    objectsStore.changeItem(-1)
  }

  get objects() {
    return objectsStore.list
  }

  get selectedObject() {
    return objectsStore.selected
  }

  set selectedObject(val) {
    objectStore.getObject(val)
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
    let stats = []
    if (objectStore.stats.length) {
      stats = JSON.parse(JSON.stringify(objectStore.stats))
      const cpy = JSON.parse(JSON.stringify(stats[0]))
      cpy.fid = 2
      stats.push(cpy)
    }
    return stats
  }
}
</script>
