const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.js", //入口文件
    output: { //输出配置
        path: path.resolve("./dist"), //输出目录，绝对路径
        filename: "script/bundle.js"  //输出文件
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"  //配置html模板
        }),

    ]
}