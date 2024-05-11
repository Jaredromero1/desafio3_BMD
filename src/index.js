"use strict";
const express = require("express");
const app = express();
const morgan = require("morgan");
//const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 3000;
app.set("json spaces", 2);

mongoose.Promise = global.Promise;
mongoose
    .connect(
        "mongodb+srv://dbexample:dbexample@cluster0.pilorif.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((db) => console.log("conexion exitosa"))
    .catch((err) => console.log("error: ", err));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(require("./routes/index"));

app.listen(port, () => {
    console.log("Server listening on port 3000");
});
