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

it('Delete User.', function(done) {
	var person = {
		id: 24,
	};
	request
	.del(host+':'+port+'/users/24')
	.set('Content-type','application/json')
	.send(person)
	.end(function(err,res) {
	console.log(res.body.id);
	console.log(person);
		expect(res.type).to.be('application/json');
		expect(res.body.id).to.equal(24);
		done();
	});
	
});