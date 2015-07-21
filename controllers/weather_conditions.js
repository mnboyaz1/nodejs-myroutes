var controller = function(app, express) {
	var self = this;
	
	self.init = function() {
		self.route = express.Router();

		// Declare Weather Conditions route 
		self.route.get('/:userId', function(req,res) {
			app.models.weather_condition.find(req.params.userId, function(data){
				res.status(data.status).send(data.message)
			});

		})
		
		self.route.post('/', function(req, res){
			app.models.weather_condition.post(req.body, function(data) {
				res.status(data.status).send(data.message)
			});
		})
		
		self.route.patch('/:weather_conditionId', function(req, res){
			app.models.weather_condition.patch(req.params.weather_conditionId,req.body, function(data){
				res.status(data.status).send(data.message)
			});
		})
		
		self.route.put('/:userId', function(req, res){
			app.models.weather_condition.put(req.params.userId,req.body, function(data){
				res.status(data.status).send(data.message)
			});
		})
		
		self.route.delete('/:userId', function(req, res){
			app.models.weather_condition.delete(req.params.userId,req.body, function(data){
				res.status(data.status).send(data.message)
			});
		})
		
		// Tell the app to use this route
		app.use('/weather_conditions',self.route)
		
	}
}
module.exports = controller;