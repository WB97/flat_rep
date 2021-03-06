const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    musicPlayer: "./src/client/js/musicPlayer.js",
    weather: "./src/client/js/weather.js",
    sidebar: "./src/client/js/sidebar.js",
    home: "./src/client/js/home.js",
    commentSection: "./src/client/js/commentSection.js",
    posting: "./src/client/js/posting.js",
    noticeBoard: "./src/client/js/noticeBoard.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
