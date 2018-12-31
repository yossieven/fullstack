const mysql = require("mysql");


export const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fullstack'
});