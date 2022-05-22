//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");


require("dotenv").config();

const login = require('./routes/login');
const signup = require('./routes/signup');
const mongoose = require("mongoose");

//connections
const uri = process.env.MONGO_DB;
mongoose.connect(uri, { useNewUrlParser: true });
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json())

//routes
app.use('/login',login)
app.use('/signup',signup)


app.listen(3000, function () {
  console.log("Server started on port 3000");
});
