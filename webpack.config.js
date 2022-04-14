const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { DefinePlugin } = require("webpack");

// console.log(process.env.NODE_ENV); undefined

// package.json中 webpack --mode=development的 mode的值 会传入到这个函数中，进而可以影响process.env.NODE_ENV
// package.json中 webpack --env=development的 env 会传入到这个函数中，进而可以影响 mode 影响 process.env.NODE_ENV

// 根据参数判断当前环境
// module.exports = (env) => {
//   console.log(env);
//   return {
//     mode: env.development ? 'development' : 'production',
//     entry: "./src/index.js",
//     output: {
//       filename: "bound.js",
//       path: path.resolve(__dirname, "dist"),
//     },
//     plugins: [
//       new HtmlWebpackPlugin({
//         template: "./src/index.html",
//         title: "jianjian",
//       }),
//       new CleanWebpackPlugin(),
//       // 可以用来定义一个全局变量 非window上 src/index.js 可以访问consle.log(Version) // 1.0
//       new DefinePlugin({
//         Version: JSON.stringify("1.0"),
//       }),
//     ],
//     module: {
//       rules: [
//         {
//           test: /.css$/,
//           use: ["style-loader", "css-loader"],
//         },
//       ],
//     },
//   };
// };



// 我们可以像上面一样写成一个函数去判断使用那种模式
// 也可以这样更方便的控制 package.json 中设置一个环境变量NODE_ENV=xxx,
// 但是这个环境变量的不同平台设置方法可能不一样，于是我们需要一个跨平台的办法去设置
// cross-env就可以， cross-env NODE_ENV=production设置一个跨平台环境变量NODE_ENV
// 这样在webpack.config.js(node环境中也能获取到这个变量)

// console.log(process.env.NODE_ENV);

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  output: {
    filename: "bound.js",
    path: path.resolve(__dirname, "dist"),
    // 会给导入bound.js时候加上 /
    // publicPath: '/dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      title: "jianjian",
    }),
    new CleanWebpackPlugin(),
    // 可以用来定义一个全局变量 非window上 src/index.js 可以访问consle.log(Version) // 1.0
    new DefinePlugin({
      Version: JSON.stringify("1.0"),
    }),
  ],
  module: {
    rules: [
      // css-loader 是用来解析 css 中使用了 import 以及 scss less使用了 url的
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.scss$/,
        use: ["style-loader", "css-loader", 'sass-loader'],
      },
      {
        test: /.(less)$/,
        use: ["style-loader", "css-loader", 'less-loader'],
      },
    ],
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    port: 8000,
    open: true,
  }
};
