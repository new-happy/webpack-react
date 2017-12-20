const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'static/bundle.js'
  },
  devtool: 'source-map',
  devServer:{
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true
  },
  module:{
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env','babel-preset-react']
        }
      }
    },
    {
       test: /\.css$/,
       use:['style-loader','css-loader']
    },
    {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              // outputPath:'build/static/'
            }
          }
        ]
      }
  ]
},
plugins: [
   new HtmlWebpackPlugin({
      title: 'My App',
      template: 'public/index.html',
      filename: 'index.html'
   }),
   new OpenBrowserPlugin({
     url:"http://localhost:3000/"
   }),
   new webpack.NamedModulesPlugin(),
   new webpack.HotModuleReplacementPlugin(),
  ]
}
