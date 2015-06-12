var model = function(db) {
	var self = this;
	self.table = 'weather_conditions';
	
	self.find = function(id, callback) {
		//Execute sql query
		var query = 'select * from ?? where id = ? limit 1';
		var params = [
			self.table,
			id
		]
		db.query(query, params, function(err, data) {
			// Send data using callback(data)
			if(err)
				callback({status:400, message:err.message})
			else if(!data.length)
				callback({status:404, message:'Not Found'})
			else
				callback({status:200, message:data[0]})
		})
	}
}
module.exports = model;