const mysql = require("mysql");
require('dotenv').config();

var mysqlConnection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: "phonebook",
    multipleStatements: true,
});


mysqlConnection.connect(err => {
    if (!err) {
        console.log("connected");
    }
    else {
        console.log("connection failed:  ", err.sqlMessage);
    }
})

module.exports = mysqlConnection;