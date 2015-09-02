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
	
	self.get = function(data,callback) {
		//Execute Query
		var query = 'select l.title, l.description, wc.weather from weather_conditions as wc inner join ?? as l on l.id = wc.lakeId GROUP BY l.description';
		var params=[
			self.table
		]
		db.query(query,params, function(err,data){
			//send data using callback(data)
			if(err)
				callback({status:400,message:err.message})
			else if (!data.length)
				callback ({status:404,message:"Not Found"})
			else 
				callback({status:200,message:data})
		})
	}
	
	self.post = function(data,callback) {
		// Execute SQL Query
		var query = "insert into lakes set ?";
	
		db.query(query,data,function(err, data){
			if (err)
				callback({status:400, message:{error:err.message}})
			else if (data.insertId == undefined)
				callback({status:400, message:{error:"MYSQL ERROR"}})
			else {
				self.find(data.insertId,function(response) {
					callback(response)
				})
			}
		})
	}
	
	self.put = function(lakeId,data,callback){
		//Execute sql query
		var query = 'update lakes set ? where id = ?';
		var params=[
			data,
			lakeId
		]

		db.query(query,params,function(err,data){
			if (err)
				callback({status:400, message:{error:err.message}})
			else if (data.insertId == undefined)
				callback({status:400, message:{error:"MYSQL ERROR"}})
			else {
				self.find(lakeId,function(response){
					callback(response)
				})
			}	
		})
	}
	
	self.delete = function(lakeId,data,callback){
		//Execute sql query
		
		var query = 'delete from lakes where id = ? limit 1';
		var params=[
			lakeId,
		]
		console.log(db.format(query,params))
		db.query(query,params,function(err,data){
			if (err)
				callback({status:400, message:{error:err.message}})
			else if (data.insertId == undefined)
				callback({status:400, message:{error:"MYSQL ERROR"}})
			else {
				callback({status:202,message:"Lake Deleted"})
			}
		})
	}
}
module.exports = model;