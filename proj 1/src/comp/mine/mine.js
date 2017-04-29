
require('./mine.less')


function render(){
	var tpl = require('./mine.hbs');
	var data = {name:'mine',address:'物美'};

	var html = tpl(data);

	$('#doc').html(html);
}

module.exports = {
	render:render
}

