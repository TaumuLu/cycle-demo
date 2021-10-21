const {
  useBabelRc,
  override,
  addDecoratorsLegacy,
  addWebpackModuleRule,
  addWebpackPlugin,
  addWebpackAlias,
} = require('customize-cra')
const path = require('path')
const webpack = require('webpack')

const config = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  addDecoratorsLegacy(),
  addWebpackAlias({ '@': path.resolve('src') }),
  addWebpackModuleRule({
    test: /\.svg$/,
    include: path.resolve('src/icons'),
    use: [
      {
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]',
        },
      },
    ],
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      Snabbdom: 'snabbdom-pragma',
    }),
  ),
)

module.exports = config
