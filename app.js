//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const {verifyToken} = require("./middleware/auth");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const login = require('./routes/login');
const logout = require('./routes/logout')
const alumni = require('./routes/alumni');
const core = require('./routes/core_member')
const signup = require('./routes/signup');
const alumni_info = require('./routes/alumni-info');
const home = require('./routes/home')
const mongoose = require("mongoose");

//connections
try{ 
  const uri = process.env.MONGO_DB;
  mongoose.connect(uri, { useNewUrlParser: true });
}catch(e){
  console.log(e.message);
}
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json())
app.use(cookieParser())


//routes
app.use('/login',login)
app.use('/signup',signup)
app.use('/alumni',alumni);
app.use('/core',core);
app.use('/home',home)
app.use('/alumni-info',alumni_info)
app.use('/logout',logout)



// setInterval(function () {}, Number.MAX_VALUE); // keep process alive

// var myEmitter = new (require('events').EventEmitter)();

// // add this handler before emitting any events
// process.on('uncaughtException', function (err) {
//     console.log('UNCAUGHT EXCEPTION - keeping process alive:', err); // err.message is "foobar"
// });

app.listen(process.env.PORT, function () {
  console.log("Server started on port",process.env.PORT);
});
