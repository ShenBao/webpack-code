
require('./home.less')

import t from '../common/tools.js'

function render(){
	var tpl = require('./home.hbs');
	var data = {name:'yztc',address:'物美'};

	var html = tpl(data);

	$('#doc').html(html+t.getTime());
}

module.exports = {
	render:render
}

