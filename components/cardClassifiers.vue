<template>
  <v-col v-if="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card>
      <v-tabs>
        <v-tab v-for="(value, index) in classifiers_" v-bind:key="index">
          {{ value.name }}
        </v-tab>
        <v-tab-item v-for="(value, index) in classifiers_" v-bind:key="index">
          <v-container>
            <alerce-radar-plot :data="value.probs" />
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

  /*
  Format probabilities of API to array of objects: { name: class_name, value: prob_of_class}
  */
  formatProbs(probs) {
    return Object.keys(probs).map((k) => {
      return {
        name: k,
        value: probs[k],
      }
    })
  }

  get classifiers_() {
    return this.classifiers.map((x) => {
      const res = {
        name: x.classifier_name,
        probs: this.formatProbs(x.probabilities),
      }
      return res
    })
  }
}
</script>
