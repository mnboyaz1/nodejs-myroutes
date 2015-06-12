var express = require('express');
var router = express.Router();

/* accept a put request at /user */
router.put('/users', function (req, res) {
	var rObject = req.body;
	rObject.userID = 1;
	rObject.email = 'johnsmith@aol.com';
	rObject.created = true;
	res.send(rObject);
	
	//res.send('Have a PUT request at /user');
});

/* accept DELETE request at /user */
router.delete('/users', function (req, res) {
	res.send('Have a DELETE request at /user');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
