const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
  configureWebpack: {
      plugins: [
        new VuetifyLoaderPlugin(),
        new CompressionWebpackPlugin()
      ],
    },
  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: 'default',
      region: 'us-east-1',
      bucket: 'alerce.online',
      createBucket: true,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      uploadConcurrency: 5,
      pluginVersion: '4.0.0-rc3',
      gzip: true
    }
  }
}
