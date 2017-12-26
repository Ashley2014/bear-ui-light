const path = require('path');

const webpack = require('webpack');
const info=require('./package.json')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  // devtool: 'inline-source-map',
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
              "sourceMap": false
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
  ],
  output: {
    filename: `bear-ui-lite.js`,
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
  }
};
