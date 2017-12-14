const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader:require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
            "compilerOptions": {
              "module": "commonjs",
              "target": "es5",
              "sourceMap": true
            },
            // "exclude": [
            //   "node_modules"
            // ]
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: 'src/assets', to: 'assets' },
      ],
    ),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      filename: 'index.html',
      template: path.join(__dirname,'./','src/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
  }
};
