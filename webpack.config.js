const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = ({ env }) => ({
  entry: "./src/Main.tsx",
  devtool: "source-map",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "core/encryption": path.resolve(
        __dirname,
        "src/infra/workers/cypher-proxy.ts"
      ),
      store: path.resolve(__dirname, "src/infra/store.ts"),
    },
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      hash: true, // cache busting
      output: {
        filename: "index.html",
      },
    }),
    new WorkboxPlugin.InjectManifest({
      maximumFileSizeToCacheInBytes: 4194304,
      swSrc: "./sw/sw.js",
      swDest: "sw.js",
    }),
    new NodePolyfillPlugin(),
    new Dotenv(),
  ],
});
