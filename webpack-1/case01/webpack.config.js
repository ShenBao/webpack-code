module.exports = {
	entry:{
		'bundle':'./main.js',
		'bundle1':'./main1.js'
	},
	output:{
		path:__dirname +'/dist',
		filename:'[name].js'
	}
}





//   output: {
//     path: path.join(__dirname, 'dist'),
//     publicPath: '/dist/',
//     filename: '[name].bundle.js'
//   }