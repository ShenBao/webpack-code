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