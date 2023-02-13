const WebpackPwaManifest = require("webpack-pwa-manifest");
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
    new WebpackPwaManifest({
      name: "Scytale",
      short_name: "Scytale",
      start_url: ".",
      display: "standalone",
      background_color: "#fff",
      theme_color: "#4285f4",
      description: "Encrypt and decrypt files in a secure way",
      crossorigin: null,
      inject: true,
      fingerprints: true,
      ios: false,
      publicPath: "./",
      includeDirectory: true,
      icons: [
        {
          src: path.resolve("public/assets/homescreen48.png"),
          sizes: "48x48",
          type: "image/png",
        },
        {
          src: path.resolve("public/assets/homescreen72.png"),
          sizes: "72x72",
          type: "image/png",
        },
        {
          src: path.resolve("public/assets/homescreen96.png"),
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: path.resolve("public/assets/homescreen144.png"),
          sizes: "144x144",
          type: "image/png",
        },
        {
          src: path.resolve("public/assets/homescreen168.png"),
          sizes: "168x168",
          type: "image/png",
        },
        {
          src: path.resolve("public/assets/homescreen192.png"),
          sizes: "192x192",
          type: "image/png",
        },
      ],
    }),
    new WorkboxPlugin.InjectManifest({
      maximumFileSizeToCacheInBytes: 4194304,
      swSrc: path.resolve(__dirname, "/src-sw/sw.js"),
      swDest: "sw.js",
    }),
    new NodePolyfillPlugin(),
    new Dotenv(),
  ],
});
