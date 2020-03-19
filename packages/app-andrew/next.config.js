const path = require('path')
const withSass = require('@zeit/next-sass')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const withCustomBabelConfigFile = require('next-plugin-custom-babel-config')
const withTM = require('next-transpile-modules')([
  '@gtms/api-common',
  '@gtms/api-auth',
  '@gtms/api-group',
  '@gtms/commons',
  '@gtms/state-user',
  '@gtms/styles',
  '@gtms/ui',
])
const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const dotenv = require('dotenv')

dotenv.config()

module.exports = withPlugins(
  [withTM, withCustomBabelConfigFile, withSass, withImages],
  {
    babelConfigFile: path.resolve('./.babelrc'),
    publicRuntimeConfig: {
      API_URL: process.env.API_URL,
      FE_API_URL: process.env.FE_API_URL,
      FB_APP_ID: process.env.FB_APP_ID,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    },
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[local]___[hash:base64:5]',
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.test.*/,
        loader: 'ignore-loader',
      })

      config.plugins.push(
        new FilterWarningsPlugin({
          exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
        })
      )

      return config
    },
  }
)
