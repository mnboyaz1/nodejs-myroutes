var controller = function(app, express) {
	var self = this;
	
	self.init = function() {
		self.route = express.Router();

		// Declare a route 
		self.route.get('/:userId', function(req,res) {
			app.models.user.find(req.params.userId, function(data){
				res.status(data.status).send(data.message)
			});

		})
		
		self.route.post('/', function(req, res){
			app.models.user.post(req.body, function(data) {
				res.status(data.status).send(data.message)
			});
		})
		
		self.route.patch('/:userId', function(req, res){
			app.models.user.patch(req.params.userId,req.body, function(data){
				res.status(data.status).send(data.message)
			});
		})
		
		self.route.put('/:userId', function(req, res){
			app.models.user.put(req.params.userId,req.body, function(data){
				res.status(data.status).send(data.message)
				console.log(data.message);
			});
		})
		
		self.route.delete('/:userId', function(req, res){
			app.models.user.delete(req.params.userId,req.body, function(data){
				res.status(data.status).send(data.message)
				console.log(data.message);
			});
		})
		
		// Tell the app to use this route
		app.use('/users',self.route)
		
	}
}
module.exports = controller;