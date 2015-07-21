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

it('Put User ID.', function(done) {
	var person = {
		userID : 5,
		first:'John',
		last:'Smith',
		email:'john@smith.com'
	};
	request.put(host+':'+port+'/users')
	.set('Content-type','application/json')
	.send(person).end(function(err,res) {
	console.log(res.body.userID);
		expect(res.type).to.be('application/json');
		expect(res.body).to.have.property('createdat');
		expect(res.body.userID).to.equal(person.userID);
		expect(res.body.email).to.not.equal(person.email);
		done();
	});
	
});