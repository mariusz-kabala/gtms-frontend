/* eslint-disable @typescript-eslint/no-var-requires */
const jsParser = require('react-docgen')
const tsParser = require('react-docgen-typescript')

module.exports = {
  components: ['packages/ui/**/[a-z]*.{ts,tsx}'],
  serverPort: 6061,
  skipComponentsWithoutExample: true,
  usageMode: 'expand',
  propsParser: tsParser.withCustomConfig('./tsconfig.jest.json').parse,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              configFile: 'tsconfig.jest.json',
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: '[path][name]-[local]-[hash:base64:5]',
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: {
                  localIdentName: '[path][name]-[local]-[hash:base64:5]',
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },

        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  },
}
