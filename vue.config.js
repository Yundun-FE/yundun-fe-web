const proxy = require('./config/config-proxy')

module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "./src/styles/variables.scss";`
      },
      less: {
        modifyVars: {
          // 'primary-color': '#2991fa',
          // 'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue']
    }
  }
}
