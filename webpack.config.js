const path = require('path');
const MiniCssExtratPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
let mode = "development";
let target = "web";

if(process.env === "production"){
    mode = "production",
    target =  "browserslist"
}

module.exports = {
    mode:mode,
    target:target,
    output:{
      path:path.resolve(__dirname,"dist"),
      assetModuleFilename: "images/[hash][ext][query]"
      },
    module:{
      rules:[
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type:"asset"
      },
        {
            test: /\.s?css$/i,
            use:[MiniCssExtratPlugin.loader ,"css-loader", "sass-loader"]
        },  
        {
          test: /\.jsx?$/,
          exclude:/node_modules/,
          use:{
              loader:'babel-loader'
          }

        }
      ]
    },
  
    resolve:{
      extensions:[".js", ".jsx"]
    },
    plugins:[
      new CleanWebpackPlugin(),
      new MiniCssExtratPlugin(),
      new HtmlWebPackPlugin({
      template:'/src/index.html'
    })],
    devtool:"source-map",
    devServer:{
        contentBase: './dist',
        hot:true
    }
};