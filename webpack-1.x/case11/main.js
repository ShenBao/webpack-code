
// commonJs
// require.ensure(['./test'],function(){
// 	var content = require('./test');
// 	document.querySelector('#doc').innerHTML = content;
// })

// AMD
require(['./test'],function(content){
	//var content = require('./test');
	document.querySelector('#doc').innerHTML = content;
})










