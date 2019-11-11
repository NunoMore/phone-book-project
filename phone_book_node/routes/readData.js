const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

Router.get("/", (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000 ');

    const filter = req.query.filter;
    let query =
        " select names.id, names.first_name, names.last_name, phonenumbers.number " +
        " from names " +
        " inner join phonenumbers on name_id=names.id ";

    if (filter) {
        query = query + " where " +
            " names.first_name like ('%" + filter + "%')" +
            " or names.last_name like ('%" + filter + "%')" +
            " or phonenumbers.number like ('%" + filter + "%')"
    }

    query = query + ";";

mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
        res.send(rows);
    } else {
        console.log(err);
        res.send(err)
    }
});
})

module.exports = Router;

