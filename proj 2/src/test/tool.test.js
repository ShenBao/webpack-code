var tool = require('../comp/common/tools.js');

var expect = require('chai').expect;

describe('乘法测试',function(){
	it('3*4',function(){
		expect(tool.mul(3,4)).to.be.equal(12);
	});

});