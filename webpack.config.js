var webpack = require("webpack");
var path = require("path");
//var glob = require("glob");

var htmlWebpackPlugin = require("html-webpack-plugin");
//var webpackCopyPlugin = require("copy-webpack-plugin");
var webpackDelPlugin = require("webpack-del-plugin");
var webpackNotifierPlugin = require("webpack-notifier");
var WebpackDevServer = require('webpack-dev-server');
var ROOT_PATH = path.resolve(__dirname);
var SRC_PATH = path.resolve(ROOT_PATH,"src");
var DIST_PATH = path.resolve(ROOT_PATH,"dist");
var TEM_PATH = path.resolve(SRC_PATH,"component");
var  OfflinePlugin = require('offline-plugin')
//var ProjectArray = glob.sync(SRC_PATH + "/*/index.js");
//var ProjectEntries = {};
console.log( SRC_PATH + '/index.js')
var config = {
    mode:'development',
    entry: path.resolve(__dirname, './src/index.js'),
    output:{
        path:DIST_PATH,
        filename:"bundle.js"
    },
    module:{
        rules:[
            {
                test:/\.(es6|js)$/,
                use:[
                    {
                        loader:"babel-loader",
                    }
                ],
                exclude:/node_modules/
            },
            {
                test:/\.(css)$/,
                use:[
                    {
                        loader:"style-loader"
                    },
                    {
                        loader:"css-loader"
                    }
                ],
                exclude:/node_modules/
            },
            {
                test:/\.(png|jpeg|jpg|gif)$/,
                use:[
                    {
                        loader:"url-loader",
                    }
                ],
                exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new webpackNotifierPlugin({excludeWarnings: true}),
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({
             title: 'game',
　　　　 　　template: path.resolve(__dirname, './index.html'),
　　　　　　 inject: true
　　　　 }),
        new OfflinePlugin()
    ],
    devtool:"cheap-eval-source-map"
};
/*
ProjectArray.forEach(function(f){
    var regex = new RegExp(".*\/source\/(.*?)\/index\.js");
    var name = regex.exec(f)[1];
    ProjectEntries[name] = f;

    switch (name){
        case "React_i18n":
            {
                config.plugins.push(
                    new htmlWebpackPlugin({
                        title: name,
                        filename: name + '.html',
                        template: path.resolve(TEM_PATH,"./index.html"),
                        inject: "body",
                        chunks: ["vendors","intl", name]
                    })
                );
            }
            break;
        case "JSTree":
            {
                config.plugins.push(
                    new htmlWebpackPlugin({
                        title: name,
                        filename: name + '.html',
                        template: path.resolve(TEM_PATH,"./index.html"),
                        inject: "body",
                        chunks: ["vendors","jstreeVendor", name]
                    })
                );
            }
            break;
        case "weather":
            {
                config.plugins.push(
                    new htmlWebpackPlugin({
                        title: name,
                        filename: name + '.html',
                        template: path.resolve(TEM_PATH,"./index.html"),
                        inject: "body",
                        chunks: ["vendors","chartVendors", name]
                    })
                );
            }
            break;
        default:
            {
                config.plugins.push(
                    new htmlWebpackPlugin({
                        title: name,
                        filename: name + '.html',
                        template: path.resolve(TEM_PATH,"./index.html"),
                        inject: "body",
                        chunks: ["vendors", name]
                    })
                );
            }
            break;
    }
});

config.entry = Object.assign({}, config.entry, ProjectEntries);
*/
var server = new WebpackDevServer(webpack(config), {
    contentBase: path.resolve(__dirname, './dist'), //默认会以根文件夹提供本地服务器，这里指定文件夹
    historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    port: 9090, //如果省略，默认8080
    publicPath: "/",
    hot: true,
    inline: true,
    historyApiFallback: true
});
server.listen(9090, 'localhost', function (err) {
    if (err) throw err
})
module.exports = config;