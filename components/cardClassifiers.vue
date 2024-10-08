<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card v-if="isLoading || error" :class="cardClass">
      <v-card-text v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        Fetching data for object {{ $route.params.oid }} ...
      </v-card-text>
      <v-card-text v-else-if="error">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">{{
          error
        }}</v-alert>
      </v-card-text>
    </v-card>
    <v-card v-else :class="cardClass">
      <v-card-text v-if="plotData" style="height: 100%">
        <v-select
          v-model="selected"
          :items="classifiers_"
          item-value="index"
          item-text="name"
          prepend-icon="mdi-robot"
          class="py-0 my-0"
        />
        <plots-radar-plot :data="plotData" />
      </v-card-text>
      <v-card-text v-else class="fill-height">
        <v-row align="center" justify="center" class="fill-height" no-gutters>
          <v-col align-self="center">
            <v-alert icon="mdi-alert" border="left" outlined>
              <p class="ma-0">
                The object
                <b>{{ objectId }}</b> has not been classified yet.
              </p>
            </v-alert>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { filterSortClassifiers } from '../utils/classifier_sort'

@Component
export default class CardClassifiers extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: String }) cardClass

  selected = 0

  /*
  Format probabilities of API to array of objects: { name: class_name, value: prob_of_class}
  */
  formatProbs(probs, version = null) {
    if (version) {
      probs = probs.filter((prob) => {
        return prob.classifier_version === version
      })
    }
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
    let res = []
    keys.forEach((k) => {
      const latestVersion = this.getLatestVersion(grouped[k])
      res.push({
        name: k,
        probs: this.formatProbs(grouped[k], latestVersion),
      })
    })
    res = filterSortClassifiers(res)
    res.map((r, idx) => {
      r.name = this.formatClassifierName(r.name)
      r.index = idx
    })
    return res
  }

  getLatestVersion(classes) {
    const uniqueVersions = Array.from(
      new Set(classes.map((item) => item.classifier_version))
    )
    uniqueVersions.sort()
    return uniqueVersions.slice(-1)[0]
  }

  get classifiers() {
    return this.$store.state.probabilities.probabilities
  }

  get isLoading() {
    return this.$store.state.probabilities.loading
  }

  get error() {
    return this.$store.state.probabilities.error
  }

  get objectId() {
    return this.$store.state.object.objectId
  }
}
</script>

<style scoped>
.v-input__slot {
  margin-bottom: 0;
}
</style>
