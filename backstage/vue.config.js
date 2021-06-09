module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8000,
    proxy: {
      '/api': {
          target: 'http://106.53.148.37:8083',
          changeOrigin: true,
          pathRewrite: {
              '/api': ''
          }
      }
  }
  }

}
