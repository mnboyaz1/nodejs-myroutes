// creates connection to Mysql
var config = require(__dirname+'/../conf/database');
var db = require('mysql').createConnection(config);
db.connect();
module.exports = db;