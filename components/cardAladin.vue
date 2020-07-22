<template>
  <v-col v-if="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card>
      {{ ra }}
      {{ dec }}
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardAladin extends Vue {
  @Prop({ type: Number | String, default: 12 })
  cols

  @Prop({ type: Number | String, default: 12 })
  lg

  @Prop({ type: Number | String, default: 12 })
  md

  @Prop({ type: Number | String, default: 12 })
  sm

  @Prop({ type: Number, default: 0 })
  ra

  @Prop({ type: Number, default: 0 })
  dec

  @Prop({ type: Boolean, default: true })
  show
}
</script>
