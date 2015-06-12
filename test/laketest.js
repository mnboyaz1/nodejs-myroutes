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

it('Get State Name or ID', function(done) {
	request.get(host+':'+port+'/lakes').set('Content-type','application/json')
	.send().end(function(err,res) {
		expect(res.type).to.be('application/json');
		expect(res.body).to.have.property('lakeName');
		expect(res.body.lakeName).to.equal('Leech Lake');
		done();
	})
});