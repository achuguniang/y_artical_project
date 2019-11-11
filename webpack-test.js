const path = require('path');
//htmlWebpackPlugin 会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');
//自动清除上一次打包的dist文件
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    //默认是production，打包的文件默认被压缩。开发时可以设置为development，不被压缩
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    //打包项目的入口文件
    entry: {
        main: './src/index.js'
    },
    devServer: {
		contentBase: './dist',
		open: true,
		port: 8080,
		hot: true,//开启热更新
		hotOnly: true//尽管html功能没有实现，也不让浏览器刷新
	},
    //配置模块,主要用来配置不同文件的加载器
    module: {
        //配置模块规则
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, //正则匹配要使用相应loader的文件
                use: [
                    {
                        //安装 file-loader:解决CSS等文件中的引入图片路径问题
                        loader: 'url-loader',
                        options: {
                            name: '[name]_[hash].[ext]', //打包后的图片名字，后缀和打包的之前的图片一样
                            outputPath: 'images/', //图片打包后的地址
                            limit: 10240
                        },
                    },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader: 'file-loader'  //为字体图标文件配loader
                }
            },

            {
                test: /\.scss$/,
                use: [
                    "style-loader", // 将 JS 字符串生成为 style 节点
                    {
                        loader: "css-loader",
                        options: {
                            /*如果sass文件里还引入了另外一个sass文件，另一个文件还会从sass-loader向上解析。如果不加，就直接从css-loader开始解析// 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader*/
                            importLoader: 2,
                            modules: true //开启css的模块打包。css样式不会和其他模块发生耦合和冲突
                        }
                    },
                    'postcss-loader',//注意postcss-loader放置位置，应放在css-loader之后，sass|less|stylus-loader之前。
                    "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
                ]
            },
            {
                test: /\.js$/,
                 exclude: /node_modules/,//不需要对第三方模块进行转换，耗费性能
                 loader: "babel-loader" ,
                options:{
                    "plugins": [["@babel/plugin-transform-runtime",{
                        "corejs": 2,
                        "helpers": true,
                        "regenerator": true,
                        "useESModules": false
                    }]]
                }
            }


        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html' //以index.html为模板，把打包生成的js自动引入到这个html文件中
        }),
        new CleanWebpackPlugin(['dist']), // 在打包之前，可以删除dist文件夹下的所有内容

    ],
    //打包项目的输出文件
    output: {
        publicPath: 'http://cdn.com.cn', //将注入到html中的js文件前面加上地址
        path: path.resolve(__dirname, 'dist'),//输出文件的绝对路径
        filename: '[name].js',//自定义打包输出文件名
    },






}