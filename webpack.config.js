const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevMode = process.env.NODE_ENV === 'development';

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebPackPlugin({
    inject: true,
    templateContent: `<html>
<body>
  <div id="root"></div>
  <script src="./main.js"></script>
</body>
</html>`,
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: isDevMode ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: isDevMode ? '[id].css' : '[id].[contenthash].css',
  }),
];

if (isDevMode) {
  // only enable hot in development
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
  );
}

module.exports = () => ({
  devtool: 'source-map',
  //entry: path.resolve(__dirname, 'src/index.js'),
  mode: isDevMode ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                isDevMode && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
          {
            loader: 'linaria/loader',
            options: {
              sourceMap: isDevMode,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDevMode,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10,
              name: '[name].[ext]',
              context: '',
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  output: {
    //path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle.js',
    //filename: '[name].[contenthash].js',
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    hot: true,
    port: 3333,
    historyApiFallback: true,
  },

  optimization: {
    runtimeChunk: 'single',
  },

  plugins,
});
