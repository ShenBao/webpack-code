module.exports = {
	devtool: 'eval-source-map',
	entry:'./main.js',
	output:{
		filename:'./bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.json$/,
				loaders:['json']
			},
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel',
				query:{
					presets: ['es2015']
				}
			}
		]
	}
}