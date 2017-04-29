
require('./store.less')

function render(){
	var tpl = require('./store.hbs');
	var data = {name:'store',address:'物美'};

	var html = tpl(data);

	$('#doc').html(html);
}

module.exports = {
	render:render
}

