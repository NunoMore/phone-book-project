const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


Router.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000 ');

    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const number = req.query.number;
    const nameId = req.query.nameId;

    let query = " UPDATE names " +
        " SET first_name = '" + firstName + "', last_name = '" + lastName + "' " +
        " WHERE id = " + nameId + ";" +

        " UPDATE phonenumbers " +
        " SET number = '" + number + "'" +
        " WHERE name_id = " + nameId + "; ";

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



// INSERT INTO names (first_name, last_name)
// VALUES ('Miguel', 'Fernandes');

// INSERT INTO phonenumbers (name_id, number)
// VALUES ((	select id from names where first_name = 'Nuno'	), '+351 96 7595497');