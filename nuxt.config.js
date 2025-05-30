import path from 'path'
import colors from 'vuetify/es5/util/colors'
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - ' + process.env.APP_TITLE,
    title: process.env.APP_TITLE || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    script: [],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/echarts.js',
    '@/plugins/ztfApi.js',
    '@/plugins/catsHtmApi.js',
    '@/plugins/avro.js',
    '@/plugins/validation.js',
    '@/plugins/dataReleaseApi.js',
    '@/plugins/users.js',
    '@/plugins/gtag.js',
    '@/plugins/htmx.js',
  ],
  router: {
    middleware: 'auth',
    extendRoutes(routes, resolve) {
      routes.forEach((route) => {
        if (route.path.includes('oauth')) {
          route.props = (r) => ({ state: r.query.state, code: r.query.code })
        }
      })
    },
  },
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules:
    process.env.NODE_ENV !== 'production'
      ? ['@nuxtjs/vuetify', '@alerce/components/nuxt', '@nuxtjs/eslint-module']
      : ['@nuxtjs/vuetify', '@alerce/components/nuxt'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/pwa',
  ],

  /*
   ** Process runtime config
   */
  publicRuntimeConfig: {
    avroApiBaseUrl:
      process.env.AVRO_API_BASE_URL || 'https://avro.alerce.online',
    catshtmApiBaseUrl:
      process.env.CATSHTM_API_BASE_URL || 'https://catshtm.alerce.online',
    tnsApiBaseUrl: process.env.TNS_API_BASE_URL || 'https://tns.alerce.online',
    alerceApiBaseUrlOld:
      process.env.ALERCE_API_BASE_URL_OLD || 'https://api.alerce.online/',
    alerceApiBaseUrl:
      process.env.ALERCE_API_BASE_URL || 'https://api.staging.alerce.online/',
    usersApiBaseUrl:
      process.env.USERS_API_BASE_URL || 'https://dev.users.alerce.online/users',
    googleRedirectUri:
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth/',
    googleTagId: process.env.GOOGLE_TAG_ID,
  },
  privateRuntimeConfig: {},
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  pwa: {
    icon: {
      source: '~/assests/explorer.png',
      fileName: 'explorer.png',
    },
    manifest: {
      name: 'ALeRCE Explorer',
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://alerce-static.s3.amazonaws.com/*',
        },
        {
          urlPattern: 'http://alasky.u-strasbg.fr/MocServer/*',
        },
        {
          urlPattern: 'http://dev.api.alerce.online/*',
        },
      ],
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    babel: {
      presets({ isServer }) {
        return [['@nuxt/babel-preset-app', { loose: true }]]
      },
    },
    extend(config) {
      if (process.env.NODE_ENV !== 'production') {
        config.resolve.modules.unshift(
          path.resolve(__dirname, './node_modules')
        )
      }
    },
    transpile: ['vuex-module-decorators', 'vue-echarts', 'resize-detector'],
  },
}
