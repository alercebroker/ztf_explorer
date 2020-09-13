import path from 'path'
import colors from 'vuetify/es5/util/colors'
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
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
    titleTemplate: '%s - ' + process.env.VUE_APP_TITLE,
    title: process.env.VUE_APP_TITLE || '',
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
  plugins: ['@/plugins/echarts.js', '@/plugins/axios.js'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    '@alerce/components/nuxt',
    ['@nuxtjs/dotenv', { filename: `.env.${process.env.NODE_ENV}` }],
  ],
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
      source: '~/assests/alerce_logo.svg',
      fileName: 'alerce_logo.svg',
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
    transpile: ['vuex-module-decorators'],
  },
}
