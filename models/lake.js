var model = function(db) {
	var self = this;
	self.table = 'lakes';
	
	self.find = function(id, callback) {
		// Execute SQL Query to retrieve data for the client
		var query='select * from ?? where id = ? limit 1 ';
		var params=[ 
			self.table,
			id
		]
		db.query(query,params,function(err,data) { 
			// Send data using callback(data)
			if (err)
				callback({status:400,message:err.message})
			else if (!data.length)
				callback({status:404,message:"Not found"})
			else
				callback({status:200,message:data[0]})
		})
			
	}
}
module.exports = model;