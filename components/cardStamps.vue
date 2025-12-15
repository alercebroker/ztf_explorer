<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card :class="cardClass">
      <v-card v-if="isLoading || error">
        <v-card-text v-if="isLoading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          Fetching data for object {{ this.loadingText }} ...
        </v-card-text>
        <v-card-text v-if="error">
          <v-alert text prominent type="error" icon="mdi-cloud-alert">
            {{ error }}
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card :class="cardClass">
        <div id="stamp-card-container" style="width: 100%; height: 100%"></div>
      </v-card>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class CardStamps extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: String }) oid

  @Prop({ type: Number }) crossHairSpace

  @Prop({ type: String }) cardClass

  isLoading = false
  error = ''
  height = '0vh'
  loadingText = ''

  mounted() {
    const params = { ...this.$route.query }
    const _oid = this.$route.params.oid
    this.loadingText = this.$route.params.oid

    this._loadHtmx(_oid, params)
    this.$el.addEventListener('htmx:responseError', (event) => {
      this.error = event.detail.error
      this.isLoading = false
    })
  }

  _loadHtmx(objectId, params) {
    const url = new URL(
      `htmx/stamp_card?oid=${objectId}&survey_id=${params.survey}`,
      this.$config.stampApiBaseUrl
    )

    const myDiv = document.getElementById('stamp-card-container')

    if (myDiv) {
      window.htmx.ajax('GET', `${url}`, {
        target: '#stamp-card-container',
        swap: 'innerHTML',
      })
    }
  }
}
</script>
