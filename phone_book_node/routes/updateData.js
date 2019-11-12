const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


Router.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000 ');

    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const newNumber = req.query.newNumber;
    const oldNumber = req.query.oldNumber;
    const nameId = req.query.nameId;

    let query = " UPDATE names " +
        " SET first_name = '" + firstName + "', last_name = '" + lastName + "' " +
        " WHERE id = " + nameId + ";" +

        " UPDATE phonenumbers " +
        " SET number = '" + newNumber + "'" +
        " WHERE name_id = " + nameId +
        " AND number = '" + oldNumber + "'; ";

    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err) {
            res.send({ success: true })
        } else {
            console.log(err);
            res.send(err)
        }
    });
})

module.exports = Router;
