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

it('Get Lodge Name or ID', function(done) {
	request.get(host+':'+port+'/lakes/lodging').set('Content-type','application/json')
	.send().end(function(err,res) {
		expect(res.type).to.be('application/json');
		expect(res.body).to.have.property('lodge');
		expect(res.body.lodge).to.equal('Big Resort');
		done();
	})
})