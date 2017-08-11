module.exports = {
	entry:'./main.js',
	output:{
		filename:'bundle.js'
	},
	module:{
		loaders:[
		{
			test:/\.(jpg|png)/,
			loader:'url-loader?limit=8192'
		}]
	}
}