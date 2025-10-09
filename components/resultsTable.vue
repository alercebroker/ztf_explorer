<template>
  <v-card id="objects_table_vue">
    <v-card v-if="isLoading || error">
      <v-card-text v-if="isLoading" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
        Fetching table ...
      </v-card-text>
      <v-card-text v-if="error">
        <v-alert text prominent type="error" icon="mdi-cloud-alert">
          {{ error }}
        </v-alert>
      </v-card-text>
    </v-card>
    <v-card
      id="objects_table"
      width="100%"
      :height="height"
      hx-trigger="update-table-objects from:body"
    >
    </v-card>
  </v-card>
</template>

<script>
import { Vue, Component, Watch } from 'nuxt-property-decorator'

@Component
export default class ResultTableWrapper extends Vue {
  isLoading = true
  error = ''
  height = '0vh'
  observer = null
  QueryParams = null

  get isDark() {
    return this.$vuetify.theme.isDark
  }

  mounted() {
    this._checkQueryParams()
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
        this._loadEventManager()
      }
    })

    this.$el.addEventListener('htmx:afterSettle', (event) => {
      this.onIsDarkChange(this.isDark)
    })
  }

  beforeDestroy() {
    this.observer.disconnect()
    this.observer = null
  }

  _checkQueryParams() {
    const params = this.$route.query
    this.QueryParams = params
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

  _loadHtmx() {
    const url = new URL(
      'object_api/htmx/list_objects',
      this.$config.alerceApiBaseUrl
    )

    for (const [key, value] of Object.entries(this.QueryParams)) {
      url.searchParams.append(key, value)
    }

    const myDiv = document.getElementById('objects_table')

    if (myDiv) {
      myDiv.setAttribute('hx-get', url)
      window.htmx.process(myDiv)
      document.body.dispatchEvent(new Event('update-table-objects'))
      this._loadObserver()
    }
  }

  _loadObserver() {
    const target = document.querySelector('#objects_table_vue')

    if (target) {
      const mutationCallBackFunc = (mutationsList, observer) => {
        this._loadEventManager()
        this.onIsDarkChange(this.isDark)
      }

      this.observer = new MutationObserver(mutationCallBackFunc)

      const config = { childList: true }

      this.observer.observe(target, config)
    }
  }

  _loadEventManager() {
    const rowsElements = document.getElementsByName('object_row_element')
    const btnsTable = document.getElementsByName('objects_table_btn_page')

    rowsElements.forEach((element) => {
      window.htmx.off(element, 'click')

      window.htmx.on(element, 'click', (event) => {
        const oid = element.querySelector('[name="oid"]').textContent
        this.$router.push({
          path: `/object/${oid}`,
          query: { ...this.$route.query },
        })
      })
    })

    btnsTable.forEach((btn) => {
      window.htmx.off(btn, 'htmx:afterRequest')

      window.htmx.on(btn, 'htmx:afterRequest', (event) => {
        if (event.detail.successful) {
          const requestUrl = new URL(event.detail.pathInfo.finalRequestPath)
          const paramsDict = this._getParamsUrl(requestUrl)
          this._changeUrlDocument(paramsDict)
        }
      })
    })
  }

  @Watch('isDark', { immediate: true })
  async onIsDarkChange(newIsDark) {
    await this.$nextTick()

    const container = document.getElementById('objects_table')
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
