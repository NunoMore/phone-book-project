const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


Router.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000 ');

    const number = req.query.number;
    let querySelectId = " select name_id from phonenumbers where number = '" + number + "';";

    var queryDelete = " delete from phonenumbers where number = '" + number + "';";

    mysqlConnection.query(queryDelete, (err, rows, fields) => {
        if (!err) {
            console.log("deleted from phonenumbers");
        } else {
            console.log(err);
            res.send(err)
        }
    });

    mysqlConnection.query(querySelectId, (err, rows, fields) => {
        if (!err) {
            const nameId = rows.name_id;
            if (nameId) {
                queryDelete = " delete from names where id = '" + nameId + "'; ";

                mysqlConnection.query(queryDelete, (err, rows, fields) => {
                    if (!err) {
                        console.log("deleted from names");
                    } else {
                        console.log(err);
                        res.send(err)
                    }
                });
            }
            res.send({ success: true })
        } else {
            console.log(err);
            res.send(err)
        }
    });
})

module.exports = Router;


