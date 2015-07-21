var app = require('../app.js');
var request = require ('superagent');
var expect = require ('expect.js');
var Chance = require('chance');
	chance = new Chance();
var server;
var newWeatherCondition = {
	weather: chance.paragraph({sentences: 2})
	};
var host = 'http://localhost', port = 3000;

it('start node server.', function(done) {
	server = app.listen(port, function() {
		console.log('Express server listening on port ' + server.address().port);
		done();
	})
});

it('Add New Weather Conditions.', function(done) {
	var weatherCondition = {
		weather: chance.paragraph({sentences: 2}),
		lakeid: 2,
	};
	request
	.post(host+':'+port+'/weather_conditions')
	.set('Content-type','application/json')
	.send(weatherCondition)
	.end(function(err,res) {
		console.log(weatherCondition);
		expect(res.type).to.be('application/json');
		expect(res.body).to.have.property('createdat');
		expect(res.body.weather).to.equal(weatherCondition.weather);
		done();
	});
	
});

it('Put Change Weather Conditions.', function(done) {
	var weatherCondition = {
		weather: chance.paragraph({sentences: 2}),
		lakeid: 3,
	};
	request
	.put(host+':'+port+'/weather_conditions/2')
	.set('Content-type','application/json')
	.send(weatherCondition)
	.end(function(err,res) {
		expect(res.type).to.be('application/json');
		expect(res.body.id).to.equal(2);
		expect(res.body.weather).to.equal(weatherCondition.weather);
		done();
	});
	
});

it('Delete Weather Conditions.', function(done) {
	var weatherCondition = {
		id: 11,
	};
	request
	.del(host+':'+port+'/weather_conditions/11')
	.set('Content-type','application/json')
	.send(weatherCondition)
	.end(function(err,res) {
		expect(res.type).to.not.be('application/json');
		expect(weatherCondition.id).to.equal(11);
		done();
	});
	
});
