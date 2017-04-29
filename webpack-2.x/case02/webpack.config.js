module.exports = {
	entry:'./main.js',
	output:{
		filename:'./bundle.js'
	},
	module:{
		//loaders:[
		rules:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				use:[
					{
						loader:'babel-loader',
						options:{
			          		presets: ['es2015']
			        	}
					}
					
	        	]
    		}
		]
	}
}