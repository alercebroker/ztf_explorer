<template>
  <v-col v-if="!isLoading && !error" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card>
      <v-card-title> Crossmatch </v-card-title>
      <v-card-text class="pb-0">
        <alerce-cross-matches :catalogs="catalogs" />
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
@Component
export default class CardCrossMatches extends Vue {
  @Prop({ type: Number | String, default: 12 })
  cols

  @Prop({ type: Number | String, default: 12 })
  lg

  @Prop({ type: Number | String, default: 12 })
  md

  @Prop({ type: Number | String, default: 12 })
  sm

  get xmatches() {
    return this.$store.state.xmatches.xmatches
  }

  get isLoading() {
    return this.$store.state.xmatches.loading
  }

  get error() {
    return this.$store.state.xmatches.error
  }

  get catalogs() {
    const catalogs_ = this.xmatches.map((x) => {
      const catalogName = Object.keys(x)[0]
      const fields = Object.keys(x[catalogName]).map((y) => {
        return {
          field: y,
          value: x[catalogName][y].value,
          unit: x[catalogName][y].unit,
        }
      })
      return {
        name: catalogName,
        values: fields,
        distance: x[catalogName].distance,
      }
    })
    return catalogs_
  }
}
</script>
