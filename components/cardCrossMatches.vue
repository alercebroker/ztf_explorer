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
        id="crossmatch-app"
        width="100%"
        :height="height"
        hx-trigger="update-crossmatch from:body"
      >
      </v-card>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class CardMagStats extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: String }) cardClass

  isLoading = true
  error = ''
  height = '0vh'

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
    const url = new URL(
      `/v2/xmatch/htmx/crossmatch/${objectId}`,
      this.$config.alerceApiBaseUrl
    )

    const myDiv = document.getElementById('crossmatch-app')
    if (myDiv) {
      myDiv.setAttribute('hx-get', url)
      window.htmx.process(myDiv)
      document.body.dispatchEvent(new Event('update-crossmatch'))
    }
  }

  @Watch('isDark', { immediate: true })
  onIsDarkChange(newIsDark) {
    const container = document.getElementById('crossmatch-app')
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
