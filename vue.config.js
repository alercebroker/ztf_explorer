const CompressionWebpackPlugin = require('compression-webpack-plugin')

module.exports = {
    // options...
    baseUrl: process.env.NODE_ENV === 'production' ?
        '/vue/' : '/',

	configureWebpack: {
                plugins: [new CompressionWebpackPlugin()]
        }

}
