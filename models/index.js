const mysql = require('mysql');
const CONFIG = require('../config/config');

var con = mysql.createConnection({
    host: CONFIG.db_host,
    user: CONFIG.db_user,
    //password: CONFIG.db_password,
    database: CONFIG.db_name
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;