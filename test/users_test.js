var app = require('../app.js');
var request = require ('superagent');
var expect = require ('expect.js');
var Chance = require('chance');
	chance = new Chance();
var server;
var newPerson = {
	firstname: chance.first(),
	lastname: chance.last()
	};
var host = 'http://localhost', port = 3000;

it('start node server.', function(done) {
	server = app.listen(port, function() {
		console.log('Express server listening on port ' + server.address().port);
		done();
	})
});

it('Add New User.', function(done) {
	var person = newPerson;
	request
	.post(host+':'+port+'/users')
	.set('Content-type','application/json')
	.send(person)
	.end(function(err,res) {
		console.log(person);
		expect(res.type).to.be('application/json');
		expect(res.body).to.have.property('createdat');
		expect(res.body.lastname).to.equal(person.lastname);
		expect(res.body.firstname).to.equal(person.firstname);
		done();
	});
	
});

it('Put Change User.', function(done) {
	var person = {
		firstname: chance.first(),
		lastname: chance.last(),
		//createdat: null,
		//updatedat: null
	};
	request
	.put(host+':'+port+'/users/7')
	.set('Content-type','application/json')
	.send(person)
	.end(function(err,res) {
		expect(res.type).to.be('application/json');
		expect(res.body.id).to.equal(7);
		expect(res.body.lastname).to.equal(person.lastname);
		expect(res.body.firstname).to.equal(person.firstname);
		done();
	});
	
});

it('Delete User.', function(done) {
	var person = {
		id: 23,
	};
	request
	.del(host+':'+port+'/users/23')
	.set('Content-type','application/json')
	.send(person)
	.end(function(err,res) {
	console.log(res.type);
	console.log(person);
		expect(res.type).to.not.be('application/json');
		expect(person.id).to.equal(23);
		done();
	});
	
});