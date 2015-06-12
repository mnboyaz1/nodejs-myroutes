var express = require('express');
var router = express.Router();



/*Get lakes home page */
router.get('/lakes/lodging', function(req, res) {
	var rObject = {lodge : 'Big Resort'}
	res.send(rObject);
	//res.send('Lodging Available');
});

router.get('/lakes/:states', function(req,res) {
	var rObject = {states: req.params.states}
	res.send(rObject);
	//res.send('States and there Lakes');
});

router.get('/lakes', function(req, res) {
	var rObject = {lakeName : 'Leech Lake'}
	res.send(rObject);
	//res.send('Collection of Lakes');
});


/* accept POST request on the hello page */
router.post('/hello/name', function (req, res) {
	var rObject = req.body;
	rObject.email = 'johnsmith@google.com';
	rObject.created = true;
	res.send(rObject);
	
});

/*GET Hello Page. */
router.get('/hello/:name', function(req,res) {
	var rObject = {name: req.params.name}
	res.send(rObject);
});


/* GET home page. */
router.get('/', function(req, res) {
	
  res.render('index','My Route and Test Challenge');
});

module.exports = router;
