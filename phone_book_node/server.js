const express = require("express");
const bodyParser = require("body-parser");
const ReadData = require("./routes/readData");
const CreateData = require("./routes/createData");
const UpdateData = require("./routes/updateData");
const DeleteData = require("./routes/deleteData");

var app = express();
app.use(bodyParser.json());

app.use("/create",  CreateData);
app.use("/read",    ReadData);
app.use("/update",  UpdateData);
app.use("/delete",  DeleteData);

app.listen(3001); // port for requests