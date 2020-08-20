<template>
  <v-container>
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
        lg="4"
        md="6"
        sm="12"
      />

      <card-stamps
        :oid="selectedObject"
        :cross-hair-space="25"
        card-class="grid-card"
        lg="5"
        md="6"
      />

      <card-cross-matches cols="12" lg="12" md="12" sm="12" />
    </v-row>
  </v-container>
</template>

<script>
import { Vue, Component, Watch } from 'nuxt-property-decorator'

@Component({ layout: 'oid' })
export default class ObjectView extends Vue {
  head() {
    return {
      title: this.selectedObject ? this.selectedObject : this.$route.params.oid,
    }
  }

  async fetch() {
    let oid = this.$route.params.oid
    if (this.selectedObject) oid = this.selectedObject
    this.$store.dispatch('lightcurve/getLightCurve', oid)
    this.$store.dispatch('stats/getStats', oid)
    this.$store.dispatch('probabilities/getProbabilities', oid)
    this.$store.dispatch('features/getFeatures', oid)
    await this.$store.dispatch('object/getObject', oid)
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

  get period() {
    const periods = this.$store.state.features.features.filter(
      (x) => x.name === 'Multiband_period'
    )
    if (periods.length === 0) {
      return null
    } else {
      return periods[0].value
    }
  }

  @Watch('selectedObject')
  onSelectedObjectChange(val) {
    this.$fetch()
  }
}
</script>
<style>
.grid-card {
  height: 100%;
}
*[class^='col-'] {
  padding-top: 0;
  padding-left: 0;
}
</style>
