/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const isProd = () => process.env.NODE_ENV === 'production'

const createServerConfig = () => {
  const cfgJson = {
    REQUEST_URL: 'http://47.99.134.7:8007',
    ACTION_URL: ''
  }
  return JSON.stringify(cfgJson)
}

module.exports = {
  publicPath: isProd() ? './' : '/',
  pluginOptions: { // 第三方插件配置
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/styles/vars.less')]
    }
  },
  chainWebpack: config => {
    // alias
    config.resolve.alias
      .set('@assets', path.resolve(__dirname, 'src/assets'))
      .set('@utils', path.resolve(__dirname, 'src/utils'))
      .set('@components', path.resolve(__dirname, 'src/components'))
      .set('@service', path.resolve(__dirname, 'src/service'))
      .set('@interface', path.resolve(__dirname, 'src/interface'));
    // externals to cdn
    if (isProd()) {
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios'
      })
    }
    // create configurable file 
    config
      .plugin('GenerateAssetPlugin')
      .use('generate-asset-webpack-plugin', [{
        filename: 'requestUrl.json',
        fn: (compilation, cb) => {
          cb(null, createServerConfig(compilation))
        },
        extraFiles: []
      }])
  },
  css: {
    extract: true,
    sourceMap: isProd() ? false : true,
    // loaderOptions: {
    //   less: {
    //     globalVars: {
    //       hack: `true; @import '~@/config/less.config.less'`
    //     }
    //   }
    // }
  },
  devServer: {
    open: true,
    host: '0.0.0.0', // 允许ip访问
    port: 8080,
    https: false,
    hotOnly: false,
    // proxy: {
    //   '/api': {
    //     target: 'http://47.99.134.7:8007',
    //     changeOrigin: true,
    //     secure: false,
    //     pathRewrite: {
    //       "^/api": ""
    //     }
    //   }
    // }
  }
}