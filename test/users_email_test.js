var app = require('../app.js');
var request = require ('superagent');
var expect = require ('expect.js');
var Chance = require('chance');
	chance = new Chance();
var server;
var host = 'http://localhost', port = 3000;

it('start node server.', function(done) {
	server = app.listen(port, function() {
		console.log('Express server listening on port ' + server.address().port);
		done();
	})
});


it('Add New email.', function(done) {
	var email = {
		email: chance.email(),
		usersid: 10,
	};
	request
	.post(host+':'+port+'/user_emails')
	.set('Content-type','application/json')
	.send(email)
	.end(function(err,res) {
		expect(res.type).to.be('application/json');
		//expect(res.body).to.have.property('createdat');
		expect(res.body.email).to.equal(email.email);
		done();
	});
	
});

it('Put Change User Email.', function(done) {
	var email = {
		email: chance.email(),
		usersid: 10,
	};
	request
	.put(host+':'+port+'/user_emails/1')
	.set('Content-type','application/json')
	.send(email)
	.end(function(err,res) {
		expect(res.type).to.be('application/json');
		expect(10).to.equal(email.usersid);
		expect(res.body.email).to.equal(email.email);
		done();
	});
});

it('Delete User email.', function(done) {
	var email = {
		usersid: 18,
	};
	request
	.del(host+':'+port+'/user_emails/19')
	.set('Content-type','application/json')
	.send(email)
	.end(function(err,res) {
		expect(res.type).to.not.be('application/json');
		expect(email.usersid).to.equal(18);
		done();
	});
	
});