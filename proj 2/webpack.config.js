
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
		//loaders:[
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:['babel-loader']
			},
			{
				test:/\.hbs$/,
				use:['handlebars-loader']
			},
			{
				test:/\.less$/,
				use:['style-loader','css-loader','less-loader']
			}
		]
	},
	node:{
		fs:'empty'
	},
	plugins:[
		new uglifyJsPlugin(),
		new HtmlWebpackPlugin({
			minify:{collapseWhitespace:true},
			template:'./src/index.html'
		}),
		new webpack.ProvidePlugin({
			jQuery:'jquery',
			$:'jquery'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name:'vender',
			filename:'vender.[hash:8].js'
		})
	]

}