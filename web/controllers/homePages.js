var controller = function(app, express) {
	var self = this;
	
	self.init = function() {
		self.route = express.Router();
	
		self.route.get('/', function(req, res) {
	
			res.render('index',{title:"Fish'n Around"});
		});


		// Tell the app to use this route
		app.use('/',self.route)
		
	}
}
module.exports = controller;