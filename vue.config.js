const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
    configureWebpack: {
        plugins: [
          new VuetifyLoaderPlugin()
        ],
      },
    baseUrl: process.env.NODE_ENV === 'production' ?
        '/vue/' : '/'
}