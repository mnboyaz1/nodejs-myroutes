var model = function(db) {
	var self = this;
	self.table = 'users_emails';
	
	self.find = function(id, callback) {
		// Execute SQL Query
		var query='select * from ?? where id = ? limit 1 ';
		//var query = 'select * from ?? join users on users_emails.usersid=users.id'

		var params = [
			self.table,
			id
		]
		db.query(query, params, function(err, data) {
			// Send data using callback(data)
			if(err)
				callback({status:400, message:err.message})
			else if(!data.length)
				callback({status:404, message: 'Not Found'})
			else
				callback({status:200, message:data[0]})
		})
	}
	self.post = function(data,callback) {
		// Execute SQL Query
		var query = "insert into users_emails set ?";
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
	
	self.patch = function(userId,data,callback) {
		// Execute SQL Query
		var query = 'update users_emails set ? where id = ?';
		var params=[ 
			data,
			userId
		]
		db.query(query,params,function(err, data){
			if (err)
				callback({status:400, message:{error:err.message}})
			else if (data.insertId == undefined)
				callback({status:400, message:{error:"MYSQL ERROR"}})
			else {
				self.find(userId,function(response){
					callback(response)
				})
			}
		})
	}
	
	self.put = function(userId,data,callback){
		//Execute sql query
		var query = 'update users_emails set ? where id = ?';
		var params=[
			data,
			userId
		]
		db.query(query,params,function(err,data){
			if (err)
				callback({status:400, message:{error:err.message}})
			else if (data.insertId == undefined)
				callback({status:400, message:{error:"MYSQL ERROR"}})
			else {
				self.find(userId,function(response){
					callback(response)
				})
			}	
		})
	}
	
	self.delete = function(userId,data,callback){
		//Execute sql query
		var query = 'delete from users_emails where id = ? limit 1';
		var params=[
			userId
		]
		db.query(query,params,function(err,data){
			if (err)
				callback({status:400, message:{error:err.message}})
			else if (data.insertId == undefined)
				callback({status:400, message:{error:"MYSQL ERROR"}})
			else {
				callback({status:202,message:"Email Deleted"})
			}
		})
	}
}
module.exports = model;