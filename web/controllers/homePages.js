var controller = function(app, express) {
	var self = this;
	
	self.init = function() {
		self.route = express.Router();
	
		self.route.get('/', function(req, res) {
	
			res.render('home',{title:"Fish'n Around"});
		});
		
		self.route.get('/signup', function(req,res){
			res.render('signup',{title:"Sign Up"});
		});


		// Tell the app to use this route
		app.use('/',self.route)
		
	}
}
module.exports = controller;