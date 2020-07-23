<template>
  <v-col v-if="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card>
      <alerce-cross-matches :catalogs="catalogs" />
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

  @Prop({ type: Boolean, default: true })
  show

  @Prop({ type: Array, required: true, default: () => [] })
  data

  get catalogs() {
    const catalogs_ = this.data.map((x) => {
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
