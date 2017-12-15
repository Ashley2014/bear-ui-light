const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');

let styleLoaderUseConfig1={
  loader: require.resolve('style-loader'),
  options: {
    sourceMap: true,
  },
}

let styleLoaderUseConfig2_1={
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
    sourceMap: true,
    modules:true,
    localIdentName:"[name]__[local]___[hash:base64:5]",
  },
}
let styleLoaderUseConfig2_2={
  loader: require.resolve('css-loader'),
  options: {
    importLoaders: 1,
    sourceMap: true,
  },
}

let styleLoaderUseConfig3={
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebookincubator/create-react-app/issues/2677
    sourceMap: true,
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      }),
    ],
  },
}


let styleLoadersUseConfigs1=[
  styleLoaderUseConfig1,
  styleLoaderUseConfig2_1,
  styleLoaderUseConfig3,
]


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
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            // attrs: [':data-src']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            // loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
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
