<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card :class="cardClass">
      <v-card v-if="isLoading || error">
        <v-card-text v-if="isLoading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          Fetching data for object {{ objectId }} ...
        </v-card-text>
        <v-card-text v-if="error">
          <v-alert text prominent type="error" icon="mdi-cloud-alert">
            {{ error }}
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card
        id="probabilities-app"
        width="100%"
        :height="height"
        hx-trigger="update-probabilities from:body"
      >
      </v-card>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'
// import { filterSortClassifiers } from '../utils/classifier_sort'

@Component
export default class CardClassifiers extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: String }) cardClass

  selected = 0
  isLoading = true
  error = ''
  height = '0vh'

  /*
  Format probabilities of API to array of objects: { name: class_name, value: prob_of_class}
  */

  /*
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
  */

  get objectId() {
    return this.$store.state.object.objectId
  }

  get isDark() {
    return this.$vuetify.theme.isDark
  }

  mounted() {
    const _oid = this.objectId || this.$route.params.oid
    this._loadHtmx(_oid)
    this.$el.addEventListener('htmx:responseError', (event) => {
      this.error = event.detail.error
      this.isLoading = false
    })
    this.$el.addEventListener('htmx:afterRequest', (event) => {
      if (event.detail.successful) {
        this.error = ''
        this.isLoading = false
        this.width = '100%'
        this.height = '100%'
        this.onIsDarkChange(this.isDark)
      }
    })
  }

  _loadHtmx(objectId) {
    /*
    const url = new URL(
      `/v2/object_details/htmx/object/${objectId}`,
      this.$config.alerceApiBaseUrl
    )
    */
    const url = new URL(`http://localhost:8004/htmx/probabilities/${objectId}`)
    const myDiv = document.getElementById('probabilities-app')
    if (myDiv) {
      myDiv.setAttribute('hx-get', url)
      window.htmx.process(myDiv)
      document.body.dispatchEvent(new Event('update-probabilities'))
    }
  }

  @Watch('objectId', { immediate: true })
  onIdChange(newId) {
    if (this.isLoading) {
      this._loadHtmx(newId)
    }
  }

  @Watch('isDark', { immediate: true })
  onIsDarkChange(newIsDark) {
    const container = document.getElementById('probabilities-app')
    if (container) {
      if (newIsDark) {
        container.classList.add('tw-dark')
      } else {
        container.classList.remove('tw-dark')
      }
    }
  }
}
</script>

<style></style>
