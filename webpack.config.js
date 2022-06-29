const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

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
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "core/encryption": path.resolve(
        __dirname,
        "src/infra/workers/cypher-proxy.ts"
      ),
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
      filename: "../dist/index.html",
    }),
  ],
});
