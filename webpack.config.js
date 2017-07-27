var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map', //配置生成Source Maps，选择合适的选项
	entry: {
		app:__dirname+'/app/main.js',//唯一入口文件
		search: __dirname+'/search/search.js'
	},
	output: {
		path: __dirname+'/build', //打包后文件存放的地方
		filename: '[name]-[hash].js',//打包的文件名
	},
	//__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
	module: {
		rules: [
			{
				test: /\.json$/,
				loaders: 'json-loader'
			},
			{
		        test: /\.js$/,
		        exclude: /node_modules/,
		        loader: 'babel-loader',
		        query: {
		          	presets: ['es2015','react'],
		        }
		    },
			{ 
				test: /\.css$/, 
				use: [
			        {
			           	loader: "style-loader"
			        },
	         		{
	           			loader: "css-loader",
	           			options: {
	            			modules: true
	          			}
	         		}
	        	]
			},
			{
	            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
             	loader: 'url?limit=25000&name=[name].[ext]'
          }

		]

	},
	// postcss: [
 //    	require('autoprefixer')
 //  	],
	plugins: [
	    new HtmlWebpackPlugin({
	    	filename:'aa.html',    //生成的html存放路径，相对于 path
	      	template: __dirname + "/app/index.tmpl.html",//html模板路径
	      	chunks:['vendors','app'],//加载指定模块中的文件，否则页面会加载所有文件
	      	hash:false, //为静态资源生成hash值
	      	inject:true, //允许插件修改哪些内容，true/'head'/'body'/false,
	      	minify:{    //压缩HTML文件
                removeComments:false,    //移除HTML中的注释
                collapseWhitespace:false    //删除空白符与换行符
             }
	    }),
	    // new webpack.HotModuleReplacementPlugin(),//热加载插件
	    new ExtractTextPlugin("[name]-[hash].css")
	],


	devServer: {
	    // contentBase: "./build",//本地服务器所加载的页面所在的目录
	    // historyApiFallback: true,//不跳转
	    // inline: true,//实时刷新
	    // hot: true

  }
} 