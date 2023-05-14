const path = require("path");

module.exports = {
  entry: "./src/javascript/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: "bundle.js",
  },

  mode: "development",

  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },
    },
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: "css-loader",
        },
        {
          loader: "postcss-loader",
        },
        {
          loader: "sass-loader",
          options: {
            implementation: require("sass"),
          },
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            outputPath: "images",
          },
        },
      ],
    },
  ],
};
