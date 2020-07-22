<template>
  <v-col v-if="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card>
      <h1>Mag stats</h1>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardMagStats extends Vue {
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
}
</script>
