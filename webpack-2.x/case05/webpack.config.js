module.exports ={
	entry:'./main.js',
	output:{
		filename:'bundle.js'
	},
	module:{
		//loaders:[
		rules:[
		{
			test:/\.less$/,
			use:['style-loader','css-loader','less-loader']
		}]
	}
}