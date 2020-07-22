<template>
  <v-col v-if="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card>
      <v-tabs>
        <v-tab v-for="(value, index) in classifiers" v-bind:key="index">
          {{ value.classifier_name }}
        </v-tab>
        <v-tab-item v-for="(value, index) in classifiers" v-bind:key="index">
          <v-container>
            <alerce-radar-plot :probabilities="value.probabilities" />
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardClassifiers extends Vue {
  @Prop({ type: Number | String, default: 12 })
  cols

  @Prop({ type: Number | String, default: 12 })
  lg

  @Prop({ type: Number | String, default: 12 })
  md

  @Prop({ type: Number | String, default: 12 })
  sm

  @Prop({ type: Array, required: true, default: () => [] })
  classifiers

  @Prop({ type: Boolean, default: true })
  show

  get classifiersNames() {
    return this.classifiers.map((x) => x.classifier_name)
  }
}
</script>
