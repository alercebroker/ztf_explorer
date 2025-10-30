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
      hx-ext="json-enc"
      hx-encoding="json"
      hx-vals="js:{objects_arr: ''}"
      hx-trigger="update-aladin from:body"
    >
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Model } from 'nuxt-property-decorator'

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

  @Model('objectSelected', { type: String }) selectedObject

  @Prop({ type: String }) cardClass

  object = {}
  objectsList = null
  isLoading = true
  error = null
  height = '0vh'

  mounted() {
    setTimeout(() => {
      const oid = this.$route.params.oid
      this._loadObjectStore()
      this._loadHtmx(oid)

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
        }
      })
    }, 5000)
  }

  _loadObjectStore() {
    const objectsStore = document.getElementById('objects-store')

    if (objectsStore) {
      this.objectsList = this.parsePythonData(objectsStore.dataset.objects)
    }
  }

  _loadHtmx(objectId) {
    const url = new URL(`http://127.0.0.1:8006/htmx/aladin?oid=${objectId}`)

    const myDiv = document.getElementById('aladin-app')

    if (myDiv) {
      myDiv.setAttribute('hx-post', url)
      window.htmx.process(myDiv)
      window.htmx.on(myDiv, 'htmx:configRequest', (evt) => {
        evt.detail.parameters.objects_arr = this.stringifyObjectsData()
      })

      document.body.dispatchEvent(new Event('update-aladin'))
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
