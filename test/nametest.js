var app = require('../app.js');
var request = require ('superagent');
var expect = require ('expect.js');
var server;
var host = 'http://localhost', port = 3000;

it('start node server.', function(done) {
	server = app.listen(port, function() {
		console.log('Express server listening on port ' + server.address().port);
		done();
	})
});

it('Post People.', function(done) {
	var person = {
		first:'John',
		last:'Smith',
		email:'john@smith.com',
	}
	request.post(host+':'+port+'/hello/name')
	.set('Content-type','application/json')
	.send(person).end(function(err,res) {
		expect(res.type).to.be('application/json');
		expect(res.body).to.have.property('created');
		expect(res.body.email).to.not.equal(person.email);
		done();
	})
	
});