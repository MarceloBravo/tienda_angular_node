const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack:{
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    }
  },

  publicPath: "./",

  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "style/index.scss";`
      }
    }
  }
})
