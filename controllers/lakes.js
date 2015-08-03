var controller = function(app, express) {
	var self = this;
	
	self.init = function() {
		self.route = express.Router();

		// Declare lakes route 
		self.route.get('/', function(req,res) {
			app.models.lake.get(req.body, function(data) {
				res.status(data.status).send(data.message)
			});
		})
		self.route.get('/:lakeId', function(req,res) {
			app.models.lake.find(req.params.lakeId, function(data){
				res.status(data.status).send(data.message)
			});

		})
		
		self.route.post('/', function(req, res){
			app.models.lake.post(req.body, function(data) {
				res.status(data.status).send(data.message)
			});
		})
		
		self.route.patch('/:lakeId', function(req, res){
			app.models.lake.patch(req.params.lakeId,req.body, function(data){
				res.status(data.status).send(data.message)
			});
		})
		
		self.route.put('/:lakeId', function(req, res){
			app.models.lake.put(req.params.lakeId,req.body, function(data){
				res.status(data.status).send(data.message)
			});
		})
		
		self.route.delete('/:lakeId', function(req, res){
			app.models.lake.delete(req.params.lakeId,req.body, function(data){
				res.status(data.status).send(data.message)
			});
		})
		
		// Tell the app to use this route
		app.use('/lakes',self.route)
		
	}
}
module.exports = controller;