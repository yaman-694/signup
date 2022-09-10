//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const login = require('./routes/login');
const logout = require('./routes/logout')
const alumni = require('./routes/alumni');
const forgetpassword = require('./routes/forget-password');
const resetToken = require('./routes/reset')
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
  console.log('No connectionrs');
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
app.use('/forget-password',forgetpassword);
app.use('/reset-token',resetToken);
app.use('/core',core);
app.use('/home',home)
app.use('/alumni-info',alumni_info)
app.use('/logout',logout)




app.listen(process.env.PORT, function () {
  console.log("Server started on port",process.env.PORT);
});
