<template>
  <v-container fluid>
    <v-row align="stretch">
      <card-basic-information
        :object="$route.params.oid"
        card-class="grid-card"
        lg="3"
        md="6"
        sm="12"
      />

      <card-light-curve
        :period="period"
        :oid="selectedObject"
        card-class="grid-card"
        lg="6"
        md="6"
        sm="12"
      />

      <card-aladin
        v-model="selectedObject"
        card-class="grid-card"
        lg="3"
        md="6"
        sm="12"
      />

      <card-mag-stats card-class="grid-card" lg="3" md="6" sm="12" />

      <card-classifiers
        card-class="grid-card"
        cols="12"
        lg="3"
        md="6"
        sm="12"
      />

      <card-stamps
        v-model="selectedDetection"
        :oid="selectedObject"
        :cross-hair-space="25"
        card-class="grid-card"
        lg="6"
        md="6"
      />

      <card-cross-matches
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

@Component
export default class ObjectView extends Vue {
  selectedDetection = 0

  head() {
    return {
      title: this.selectedObject ? this.selectedObject : this.$route.params.oid,
    }
  }

  fetch() {
    this.$store.dispatch('object/getObject', this.object)
    this.$store.dispatch('lightcurve/getLightCurve', this.$route.params.oid)
    this.$store.dispatch('stats/getStats', this.$route.params.oid)
    this.$store.dispatch(
      'probabilities/getProbabilities',
      this.$route.params.oid
    )
    this.$store.dispatch('features/getFeatures', this.$route.params.oid)
    this.$store.dispatch('xmatches/getXmatch', {
      ra: this.objectInformation.meanra,
      dec: this.objectInformation.meandec,
    })
    this.$store.dispatch('tns/getTns', {
      ra: this.objectInformation.meanra,
      dec: this.objectInformation.meandec,
    })
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

  async changeObject(n) {
    if (this.objects !== null || this.objects.length !== 0) {
      await this.$store.dispatch('object/changeItem', n)
      this.$router.push(this.selectedObject)
    }
  }

  get objects() {
    return this.$store.state.objects.list
  }

  get selectedObject() {
    return this.$store.state.object.objectId
  }

  set selectedObject(val) {}

  get objectInformation() {
    return this.$store.state.object.object
  }

  get error() {
    const error = this.$store.state.object.error
    if (error.response.status === 404)
      this.$nuxt.error({ statusCode: 404, messages: 'Object not found.' })
    return error
  }

  // get firstCandid() {
  //   return this.objectLightcurve.detections.length > 0
  //     ? this.objectLightcurve.detections.filter((x) => x.has_stamp)[0].candid
  //     : null
  // }

  get period() {
    const periods = this.$store.state.features.features.filter(
      (x) => x.name === 'Period_fit_v2'
    )
    if (periods.length === 0) {
      return 1
    } else if (periods.length === 1) {
      return periods[0].value
    } else {
      const nDet = this.$store.state.features.features.filter(
        (x) => x.name === 'n_det'
      )
      const max = nDet.reduce((prev, current) =>
        prev.value > current.value ? prev : current
      )
      return periods.find((x) => x.fid === max.fid).value
    }
  }
}
</script>
<style>
.grid-card {
  height: 100%;
}
</style>
