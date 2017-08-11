module.exports = {
	entry:'./main.js',
	output:{
		filename:'bundle.js'
	},
	module:{
		//loaders:[
		rules:[
		{
			test:/\.(jpg|png)/,
			use:[{
				loader:'url-loader',
				options:{'limit':'8192'}
			}
			]
		}]
	}
}