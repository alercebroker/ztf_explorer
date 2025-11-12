<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card v-if="isLoading || error">
      <v-card-text v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        Fetching data for object {{ $route.params.oid }} ...
      </v-card-text>
      <v-card-text v-if="error">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">{{
          error
        }}</v-alert>
      </v-card-text>
    </v-card>
    <v-card
      id="aladin-app"
      width="100%"
      :height="height"
      style="z-index: 9999"
    ></v-card>
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

  @Prop({ type: String }) cardClass

  object = {}
  objectsList = null
  isLoading = true
  error = null
  height = '0vh'

  mounted() {
    const oid = this.$route.params.oid

    this.$el.addEventListener('htmx:responseError', (event) => {
      this.error = event.detail.error
      this.isLoading = false
    })

    this._loadObjectStore()
    this._loadHtmx(oid)
  }

  _loadObjectStore() {
    const objectsStore = document.getElementById('objects-store')

    if (objectsStore) {
      this.objectsList = this.parsePythonData(objectsStore.dataset.objects)
    }
  }

  _loadHtmx(objectId) {
    const url = new URL(
      `htmx/aladin?oid=${objectId}`,
      this.$config.aladinApiBaseUrl
    )
    const myDiv = document.getElementById('aladin-app')

    if (myDiv) {
      window.htmx
        .ajax('POST', `${url}`, {
          target: '#aladin-app',
          swap: 'innerHTML',
          values: { objects_arr: this.stringifyObjectsData() },
        })
        .then(() => {
          this.error = ''
          this.isLoading = false
          this.width = '100%'
          this.height = '100%'
        })
    }
  }

  parsePythonData(objectsDict) {
    const fixed = objectsDict
      .replace(/'/g, '"')
      .replace(/None/g, 'null')
      .replace(/False/g, 'false')
      .replace(/True/g, 'true')

    return JSON.parse(fixed)
  }

  stringifyObjectsData() {
    if (this.objectsList == null) return []

    const objectsStringify = this.objectsList.map((object) => {
      return JSON.stringify(object)
    })

    return objectsStringify
  }
}
</script>
