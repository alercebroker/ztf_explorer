import { Vue } from 'nuxt-property-decorator'
import VueGtag from 'vue-gtag'

export default function ({ $config, app }) {
  Vue.use(
    VueGtag,
    {
      config: { id: $config.googleTagId },
      pageTrackerEnabled: true,
      deferScriptload: true,
    },
    app.router
  )
}
