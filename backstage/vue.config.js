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
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  }

}
