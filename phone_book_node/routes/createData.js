const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


Router.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000 ');

    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const number = req.query.number;

    // get id from names if exists
    let queryGetId = " select id from names where first_name = '" + firstName + "' and last_name = '" + lastName + "' ";

    mysqlConnection.query(queryGetId + ";", (err, rows, fields) => {
        if (!err) {
            var query = "";
            if (rows.length === 0) // insert in names table 
                query = " INSERT INTO names (first_name, last_name) " +
                    " VALUES ('" + firstName + "', '" + lastName + "'); ";

            // insert in phonenumbers table
            query = query + " INSERT INTO phonenumbers (name_id, number) " +
                " VALUES ((" + (rows.id || queryGetId) + "), '" + number + "') ;";

            mysqlConnection.query(query, (err, rows, fields) => {
                if (!err) {
                    res.send({ success: true })
                } else {
                    console.log(err);
                    res.send(err)
                }
            });
        } else {
            console.log(err);
            res.send(err)
        }
    });
})

module.exports = Router;


