module.exports = {
	devtool: 'eval-source-map',
	entry:'./main.js',
	output:{
		filename:'./bundle.js'
	},
	module:{
		//loaders:[
		rules:[
			// {
			// 	test:/\.json$/,
			// 	loaders:['json']
			// },
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:[
					{ 	loader:'babel-loader',
						options:{
							presets: ['es2015']
						}
					}
				]
			}
		]
	}
}