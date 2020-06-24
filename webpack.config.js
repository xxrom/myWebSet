const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = (env) => ({
  entry: path.resolve(__dirname, 'src/index.js'),
  mode: env.NODE_ENV === 'development' ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 3 этап - загружаем в реакт уже
          'css-loader', // 2 этап - подгружаем css файл обычный
          // {
          //   // 1 этап - postcss плюшки
          //   loader: 'postcss-loader',
          //   options: {
          //     plugins: [
          //       // require('postcss-import'),
          //       // require('postcss-for'),
          //       // require('postcss-simple-vars'),
          //       // require('postcss-custom-properties'),
          //       // require('postcss-nested'), // &__test { ... }
          //       // require('postcss-color-function'),
          //       // require('autoprefixer')({
          //       //   browsers: ['last 2 versions', 'ie > 9'],
          //       // }),
          //     ],
          //   },
          // },
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
              // useRelativePath: true,
              // name: 'images/[hash]-[name].[ext]',
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
    ]
  },
  // resolve: { extensions: ["*", ".js", ".jsx"] },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle.js',
    filename: '[name].[hash].js',
  },

  // output: {
  //   path: path.resolve(__dirname, "dist/"),

  //   publicPath: "/dist/",
  //   filename: "bundle.js"
  // },
  // devServer: {
  //   contentBase: path.join(__dirname, "dist"),
  //   port: 3000,
  //   publicPath: "http://localhost:3000/dist/",
  //   hotOnly: true,
  //   compress: true,
  // },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    port: 3000,
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin(
      {
        inject: true,
        templateContent:
          `<html>
<body>
  <div id="root"></div>
  <script src="/dist/bundle.js"></script>
</body>
</html>`
      }),
    new webpack.HotModuleReplacementPlugin(),
    new CompressionPlugin({
      // asset: '[path].gz[query]', // error, Compression Plugin Invalid Options
      algorithm: 'gzip',
      test: /\.(jsx|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new BrotliPlugin({
      test: /\.(jsx|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ]
});

// yarn add yarn add react react-dom

// yarn add --dev webpack webpack-cli webpack-dev-server babel-loader

// https://babeljs.io/docs/en/babel-preset-env
// yarn add  --dev @babel/preset-env babel-loader @babel/core

// https://github.com/gaearon/react-hot-loader
// yarn add --dev react-hot-loader @babel/preset-react react-dom@npm:@hot-loader/react-dom

// https://webpack.js.org/plugins/html-webpack-plugin/
// yarn add --dev html-webpack-plugin