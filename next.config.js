const path = require('path')
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  env: {
    API_URL: process.env.API_URL,
    FE_API_URL: process.env.FE_API_URL
  },
  cssModules: true,
  webpack(config, options) {
    config.resolve.alias['providers'] = path.join(__dirname, 'providers')
    config.resolve.alias['api'] = path.join(__dirname, 'api')
    config.resolve.alias['helpers'] = path.join(__dirname, 'helpers')
    config.resolve.alias['state'] = path.join(__dirname, 'state')
    config.resolve.alias['i18n'] = path.join(__dirname, 'i18n')
    config.resolve.alias['hooks'] = path.join(__dirname, 'hooks')
    config.resolve.alias['server'] = path.join(__dirname, 'server')
    config.resolve.alias['scss'] = path.join(__dirname, 'scss')
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    return config
  },
})
