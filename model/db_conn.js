const mysql = require('mysql');
const dbConfig = require('../config/db_config');

const db =  mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  multipleStatements : true
}); 

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = db;
