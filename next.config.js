const path = require('path')
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  cssModules: true,
  webpack (config, options) {
    config.resolve.alias['providers'] = path.join(__dirname, 'providers')
    config.resolve.alias['api'] = path.join(__dirname, 'api')
    return config
  }
})
