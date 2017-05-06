module.exports = {
	entry:'./main.js',
	output:{
		filename:'./bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel',
				query: {
	          		presets: ['es2015']
	        	}
    		}
		]
	}
}



// module: {
//     loaders: [{
//       test: /\.js$/,
//       exclude: /node_modules/,
//       include: __dirname,
//       loader: 'babel'
//     }]
//   }