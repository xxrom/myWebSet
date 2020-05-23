const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),

    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
    compress: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new HtmlWebpackPlugin(
    {
      inject: true,
      templateContent:
        `<html>
<body>
  <div id="root"></div>
  <script src="/dist/bundle.js"></script>
</body>
</html>`
    }
  )]
};

// yarn add yarn add react react-dom

// yarn add --dev webpack webpack-cli webpack-dev-server babel-loader

// https://babeljs.io/docs/en/babel-preset-env
// yarn add  --dev @babel/preset-env babel-loader @babel/core

// https://github.com/gaearon/react-hot-loader
// yarn add --dev react-hot-loader @babel/preset-react react-dom@npm:@hot-loader/react-dom

// https://webpack.js.org/plugins/html-webpack-plugin/
// yarn add --dev html-webpack-plugin