const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'static/bundle.js'
  },
  // devtool: 'source-map',
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
       use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
            loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins:[
                  require('autoprefixer'),
                  require('cssnano')
                ]
              }
            }
          ]
      })
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
    new CleanWebpackPlugin(['build']),
    new ExtractTextPlugin({
      filename:'static/bundle.css'
    }),
    new webpack.optimize.UglifyJsPlugin({
     compress: {
       warnings: false,
       drop_console: false,
     }
   }),
   new webpack.DefinePlugin({
     'process.env.NODE_ENV': '"production"',
   }),
   new HtmlWebpackPlugin({
      title: 'My App',
      template: 'public/index.html',
      filename: 'index.html'
   })
  ]
}
