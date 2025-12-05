<template>
  <v-container v-if="sideBarLoad" :fluid="doFluid">
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
        card-class="grid-card"
        lg="9"
        md="12"
        sm="12"
      />

      <card-aladin card-class="grid-card" lg="3" md="6" sm="12" />

      <card-classifiers
        card-class="grid-card"
        cols="12"
        lg="4"
        md="6"
        sm="12"
      />
      <!-- <card-stamps
        :oid="selectedObject"
        :cross-hair-space="25"
        card-class="grid-card"
        lg="5"
        md="6"
      /> -->

      <card-cross-matches cols="12" lg="12" md="12" sm="12" />
    </v-row>
  </v-container>
</template>

<script>
import { Vue, Component } from 'nuxt-property-decorator'
@Component({ layout: 'oid' })
export default class ObjectView extends Vue {
  head() {
    return {
      title: this.$route.params.oid,
    }
  }

  get sideBarLoad() {
    return this.$store.state.asyncComponents.sideBarLoaded
  }

  get period() {
    return null
  }

  get doFluid() {
    return this.$vuetify.breakpoint.width < 1400
  }
}
</script>
<style>
.grid-card {
  height: 100%;
  width: 100%;
}
*[class^='col-'] {
  padding-top: 15px;
}
</style>
