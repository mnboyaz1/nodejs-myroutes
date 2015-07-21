var app = require('../app.js');
var request = require ('superagent');
var expect = require ('expect.js');
var Chance = require('chance');
	chance = new Chance();
var server;
var newLake = {
	title: chance.city(),
	description: chance.paragraph({sentences: 2})
	};
var host = 'http://localhost', port = 3000;

it('start node server.', function(done) {
	server = app.listen(port, function() {
		console.log('Express server listening on port ' + server.address().port);
		done();
	})
});

it('Add New Lake.', function(done) {
	var lake = newLake;
	request
	.post(host+':'+port+'/lakes')
	.set('Content-type','application/json')
	.send(lake)
	.end(function(err,res) {
		console.log(lake);
		expect(res.type).to.be('application/json');
		expect(res.body).to.have.property('createdat');
		expect(res.body.title).to.equal(lake.title);
		done();
	});
	
});

it('Put Change Lake.', function(done) {
	var lake = {
	title: chance.city(),
	description: chance.paragraph({sentences: 2})

	};
	request
	.put(host+':'+port+'/lakes/1')
	.set('Content-type','application/json')
	.send(lake)
	.end(function(err,res) {
		expect(res.type).to.be('application/json');
		expect(res.body.id).to.equal(1);
		expect(res.body.title).to.equal(lake.title);
		expect(res.body.description).to.equal(lake.description);
		done();
	});
	
});

it('Delete Lake.', function(done) {
	var lake = {
		id: 4,
	};
	request
	.del(host+':'+port+'/lakes/4')
	.set('Content-type','application/json')
	.send(lake)
	.end(function(err,res) {
		expect(res.type).to.not.be('application/json');
		expect(lake.id).to.equal(4);
		done();
	});
	
});