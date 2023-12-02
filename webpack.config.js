const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],

  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: "/dist",
    },
    hot: true,
    port: 8081,
    proxy: {
      "/user": "http://localhost:3000",
      "/tools": "http://localhost:3000",
      "/reservations": "http://localhost:3000",
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], //, { runtime: 'automatic' }
          },
        },
      },
      {
        test: /\.css$/i, ///\.s[ac]ss$/i,
        include: path.resolve(__dirname, "src"),
        exclude: [/node_modules/],
        //these are evaluated from right to left
        //create 'style' from JS strings, translates CSS into Common JS, Compiles Sass to CSS
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "images/",
            },
          },
        ],
      },
      {
        test: [
          /\.wexbim$/,
          /\.docx$/,
          /\.csv$/,
          /\.mp4$/,
          /\.xlsx$/,
          /\.doc$/,
          /\.avi$/,
          /\.webm$/,
          /\.mov$/,
          /\.mp3$/,
          /\.pdf$/,
        ],
        use: ["file-loader"],
        type: "javascript/auto",
      },
    ],
  },
};
