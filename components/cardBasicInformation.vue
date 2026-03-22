<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card :class="cardClass">
      <v-card v-if="isLoading || error">
        <v-card-text v-if="isLoading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          Fetching data for object {{ loadingText }} ...
        </v-card-text>
        <v-card-text v-if="error">
          <v-alert text prominent type="error" icon="mdi-cloud-alert">
            {{ error }}
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card
        id="basicObject-app"
        width="100%"
        :height="height"
        hx-trigger="update-basic-information from:body"
      >
      </v-card>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class CardObject extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: Boolean, default: true }) show

  @Prop({ type: String }) cardClass

  isLoading = true
  error = ''
  height = '0vh'
  loadingText = ''

  get isDark() {
    return this.$vuetify.theme.isDark
  }

  mounted() {
    const params = { ...this.$route.query }
    const _oid = this.$route.params.oid
    const basicObjectCard = document.getElementById('basicObject-app')

    this.loadingText = this.$route.params.oid
    this._loadHtmx(_oid, params)

    basicObjectCard.addEventListener('htmx:responseError', (event) => {
      this.error = event.detail.error
      this.isLoading = false
    })

    basicObjectCard.addEventListener('htmx:afterRequest', (event) => {
      if (
        event.detail.successful &&
        event.detail.elt.id === 'basicObject-app'
      ) {
        this.error = ''
        this.isLoading = false
        this.width = '100%'
        this.height = '100%'
        this._loadMagstatsTemplate(_oid, params)
        this.onIsDarkChange(this.isDark)
      }

      if (event.detail.error) {
        this.error = event.detail.error
        this.isLoading = false
      }
    })
  }

  _loadHtmx(objectId, params) {
    const url = new URL(
      `htmx/object_information?oid=${objectId}&survey_id=${params.survey}`,
      this.$config.objectApiBaseUrl
    )

    const myDiv = document.getElementById('basicObject-app')

    if (myDiv) {
      myDiv.setAttribute('hx-get', url)
      window.htmx.process(myDiv)
      document.body.dispatchEvent(new Event('update-basic-information'))
    }
  }

  _loadMagstatsTemplate(objectId, params) {
    const magstatsUrl = new URL(
      `htmx/mag?oid=${objectId}&survey_id=${params.survey}`,
      this.$config.magstatsApiBaseUrl
    )
    const magstatsDiv = document.getElementById('magstats-modal')

    if (magstatsDiv) {
      magstatsDiv.setAttribute('hx-get', `${magstatsUrl}`)
      window.htmx.process(magstatsDiv)
      document.body.dispatchEvent(new Event('update-magstats-modal'))
    }
  }

  @Watch('isDark', { immediate: true })
  async onIsDarkChange(newIsDark) {
    await this.$nextTick()

    const container = document.getElementById('basicObject-app')
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
