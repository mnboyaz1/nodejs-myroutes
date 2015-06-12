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

it('Patch User.', function(done) {
	var person = {
		firstname: chance.first(),
		lastname: chance.last(),
	};
	request
	.patch(host+':'+port+'/users/5')
	.set('Content-type','application/json')
	.send(person)
	.end(function(err,res) {
	console.log(res.body.lastname);
	console.log(person);
		expect(res.type).to.be('application/json');
		expect(res.body.id).to.equal(5);
		expect(res.body.lastname).to.equal(person.lastname);
		expect(res.body.firstname).to.equal(person.firstname);
		done();
	});
	
});