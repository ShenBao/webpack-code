
require('./cart.less')

var $ = require('jquery')

function render(){
	var tpl = require('./cart.hbs');
	var data = {name:'cart',address:'物美'};

	var html = tpl(data);

	$('#doc').html(html);
}

module.exports = {
	render:render
}

