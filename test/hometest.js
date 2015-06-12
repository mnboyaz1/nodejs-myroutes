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

it ('Get Home Title', function(done) {
	var header = {title: 'My Test Project'}
	request.get

})