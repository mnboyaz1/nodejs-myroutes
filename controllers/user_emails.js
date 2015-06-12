var controller = function(app, express) {
	var self = this;
	
	self.init = function() {
		self.route = express.Router();

		// Declare user_emails routes 
		self.route.get('/:userId', function(req,res) {
			app.models.user_email.find(req.params.userId, function(data){
				res.status(data.status).send(data.message)
			});

		})
		
		self.route.post('/', function(req, res){
			app.models.user_email.post(req.body, function(data) {
				res.status(data.status).send(data.message)
			});
		})
		
		self.route.patch('/:userId', function(req, res){
			app.models.user_email.patch(req.params.userId,req.body, function(data){
				res.status(data.status).send(data.message)
			});
		})
		
		self.route.put('/:userId', function(req, res){
			app.models.user_email.put(req.params.userId,req.body, function(data){
				res.status(data.status).send(data.message)
			});
		})

		self.route.delete('/:userId', function(req, res){
			app.models.user_email.delete(req.params.userId,req.body, function(data){
				res.status(data.status).send(data.message)
			});
		})
		// Tell the app to use this route
		app.use('/user_emails',self.route)
		
	}
}
module.exports = controller;