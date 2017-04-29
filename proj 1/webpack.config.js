
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin

module.exports = {
	entry:{
		app: './src/main.js',
		vender:['jquery','director','handlebars']
	},
	output:{
		path:__dirname+'/dist',
		filename:'[name].[hash:8].js'
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel'
			},
			{
				test:/\.hbs$/,
				loader:'handlebars'
			},
			{
				test:/\.less$/,
				loader:'style!css!less'
			}
		]
	},
	node:{
		fs:'empty'
	},
	plugins:[
		new uglifyJsPlugin({
			compress:{
				warnings:false
			}
		}),
		new HtmlWebpackPlugin({
			minify:{collapseWhitespace:true},
			template:'./src/index.html'
		}),
		new webpack.ProvidePlugin({
			jQuery:'jquery',
			$:'jquery'
		}),
		new webpack.optimize.CommonsChunkPlugin('vender','vender.[hash:8].js')
	]

}