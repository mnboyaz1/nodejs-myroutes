// creates connection to Mysql using helper /database.js
var config = require(__dirname+'/../conf/database');
var db = require('mysql').createConnection(config);
db.connect();
module.exports = db;