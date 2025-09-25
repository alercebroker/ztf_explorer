<template>
  <v-col :cols="cols" :lg="lg" :md="md" :sm="sm">
    <v-card id="form-vue-container" :class="cardClass">
      <v-card
        id="form-search-app"
        width="100%"
        :height="height"
        hx-trigger="update-form from:body"
      >
      </v-card>
    </v-card>
  </v-col>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'nuxt-property-decorator'

@Component
export default class SearchBar extends Vue {
  @Prop({ type: Number | String, default: 12 }) cols

  @Prop({ type: Number | String, default: 12 }) lg

  @Prop({ type: Number | String, default: 12 }) md

  @Prop({ type: Number | String, default: 12 }) sm

  @Prop({ type: Boolean, default: true }) show

  @Prop({ type: String }) cardClass

  isLoading = true
  error = ''
  height = '0vh'
  observer = null

  get isDark() {
    return this.$vuetify.theme.isDark
  }

  mounted() {
    this._loadHtmx()
    this.$el.addEventListener('htmx:responseError', (event) => {
      this.error = event.detail.error
      this.isLoading = false
    })
    this.$el.addEventListener('htmx:afterRequest', (event) => {
      if (event.detail.successful) {
        this.error = ''
        this.isLoading = false
        this.height = '100%'
        this.onIsDarkChange(this.isDark)
      }
    })
  }

  beforeDestroy() {
    this.observer.disconnect()
    this.observer = null
  }

  _loadHtmx() {
    const url = new URL('http://127.0.0.1:8000/htmx/search_objects/')

    const myDiv = document.getElementById('form-search-app')
    if (myDiv) {
      myDiv.setAttribute('hx-get', url)
      window.htmx.process(myDiv)
      document.body.dispatchEvent(new Event('update-form'))
      this._loadObserver()
    }
  }

  _loadObserver() {
    const target = document.querySelector('#form-vue-container')
    if (target) {
      this.observer = new MutationObserver((mutations) => {
        this._loadEventManager()
      })

      const config = { childList: true, subtree: true }

      this.observer.observe(target, config)
    }
  }

  _loadEventManager() {
    const searchBtn = document.getElementById('search_btn')
    window.htmx.on(searchBtn, 'htmx:afterRequest', (event) => {
      if (event.detail.successful) {
        const requestUrl = new URL(event.detail.pathInfo.finalRequestPath)
        const paramsDict = this._getParamsUrl(requestUrl)

        this._changeUrlDocument(paramsDict)
      }
    })
  }

  _getParamsUrl(requestUrl) {
    const params = new URLSearchParams(requestUrl.search)
    const paramsDict = {}

    params.forEach((value, key) => {
      if (key === 'oid') {
        paramsDict[key] = params.getAll('oid')
      } else {
        paramsDict[key] = value
      }
    })

    return paramsDict
  }

  _changeUrlDocument(eventQueryParams) {
    this.$router.push({ path: '/', query: { ...eventQueryParams } })
  }

  @Watch('isDark', { immediate: true })
  onIsDarkChange(newIsDark) {
    const container = document.getElementById('form-search-app')
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
