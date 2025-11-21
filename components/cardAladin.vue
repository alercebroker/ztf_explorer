<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card v-if="isLoading || error">
      <v-card-text v-if="isLoading"> Fetching aladin ... </v-card-text>
      <v-card-text v-if="error">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">{{
          error
        }}</v-alert>
      </v-card-text>
    </v-card>
    <v-card
      id="aladin-vue-app"
      width="100%"
      :height="height"
      style="z-index: 9999"
    ></v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

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

  get height() {
    return this.$vuetify.breakpoint.name === 'md' ? 535 : 400
  }

  get isDark() {
    return this.$vuetify.theme.isDark
  }

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
      this.objectsList = objectsStore.dataset.objects
    }
  }

  _loadHtmx(objectId) {
    const url = new URL(
      `htmx/aladin?oid=${objectId}`,
      this.$config.aladinApiBaseUrl
    )
    const myDiv = document.getElementById('aladin-vue-app')

    if (myDiv) {
      window.htmx
        .ajax('POST', `${url}`, {
          target: '#aladin-vue-app',
          swap: 'innerHTML',
          values: { objects_arr: this.objectsList },
        })
        .then(() => {
          this.error = ''
          this.isLoading = false
          this.width = '100%'
          this.onIsDarkChange(this.isDark)
        })
    }
  }

  @Watch('isDark', { immediate: true })
  async onIsDarkChange(newIsDark) {
    await this.$nextTick()

    const container = document.getElementById('aladin-app')
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
