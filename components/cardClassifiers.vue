<template>
  <v-col v-show="show" :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card :class="cardClass">
      <v-toolbar dense flat>
        <v-row align="center">
          <v-col cols="6">
            <v-toolbar-title>Classification</v-toolbar-title>
          </v-col>
          <v-col cols="6" class="mt-4">
            <v-select
              v-model="selected"
              :items="classifiers_"
              item-value="index"
              item-text="name"
              prepend-icon="mdi-robot"
            />
          </v-col>
        </v-row>
      </v-toolbar>
      <v-divider />
      <v-card-text v-if="plotData" style="height: 100%;">
        <alerce-radar-plot :data="plotData" style="height: 100%;" />
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardClassifiers extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: Array, required: true, default: () => [] }) classifiers

  @Prop({ type: Boolean, default: true }) show

  @Prop({ type: String }) cardClass

  selected = 0

  /*
  Format probabilities of API to array of objects: { name: class_name, value: prob_of_class}
  */
  formatProbs(probs) {
    return probs.map((k) => {
      return {
        name: k.class_name,
        value: k.probability,
      }
    })
  }

  formatClassifierName(name) {
    name = name.replace(/[$-/:-?{-~!"^_`]/g, (c) => ' ')
    return name.replace(/\b\w/g, (c) => c.toUpperCase())
  }

  groupBy(data, prop) {
    return data.reduce((groups, item) => {
      const val = item[prop]
      groups[val] = groups[val] || []
      groups[val].push(item)
      return groups
    }, {})
  }

  get plotData() {
    return this.classifiers_.length > 0
      ? this.classifiers_[this.selected].probs
      : null
  }

  get classifiers_() {
    const grouped = this.groupBy(this.classifiers, 'classifier_name')
    const keys = Object.keys(grouped)
    const res = []
    keys.forEach((k, i) => {
      res.push({
        name: this.formatClassifierName(k),
        probs: this.formatProbs(grouped[k]),
        index: i,
      })
    })
    return res
  }
}
</script>
