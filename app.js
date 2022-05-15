//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const validator = require("validator");
const uniqueValidator = require('mongoose-unique-validator');
const md5 = require("md5");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/UserDB", { useNewUrlParser: true });
const app = express();

const userSchema = new mongoose.Schema({
  first_name:{
    type: String,
    required: true,
    minlength: 2

  },
  last_name: {
    type: String,
    required: true,
    minlength: 2

  },
  User_Type: {
    type: String,
    required: true,
    validate(value) {
      if(value.toLowerCase() != "core member" && value.toLowerCase() != "alumni"){
        throw new Error("Invalid User Type");
      }
    }
  },
  College: String,
  phone_no:{
    type: Number,
    unique: true,
    required: true,
    minlength: 10,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  confirm_password: {
    type: String,
    required: true,
  }
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/login', function(req, res){
  res.send("login");
  });

app.post("/login", (req, res) => {

  const email = req.body.email;
  const password =  md5(req.body.password);
  console.log(email, password);
  User.find((err, result) => {
    if (err) {
      console.log(err);
      res.send("Invalid username or password");
    } else {
      let notfound = 1;
      result.forEach((user) => {
        if (user.email === email &&  md5(user.password) === password) {
          notfound = 0;
          if(user.User_Type === "core member"){
          res.send("Logged in as Core Member");
          }
          else{
            res.send("Logged in as Alumina successful");
          }
        }
      });
      if (notfound) {
        res.send("Invalid username or password");
      }
    }
  });
});

app.route("/signup")
  .get((req, res) => {
    res.render("signup");
  })

  .post((req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const User_Type = req.body.User_Type;
    const College = req.body.College;
    const phone_no = req.body.phone_no;
    const email = req.body.email;
    const password =  md5(req.body.password);
    const confirm_password =  md5(req.body.confirm_password);
    console.log(first_name, last_name, User_Type, College, phone_no, email, password, confirm_password);
    if(confirm_password === password){
      const user = new User({
        first_name: first_name,
        last_name: last_name,
        User_Type: User_Type,
        College: College,
        phone_no: phone_no,
        email: email,
        password: password,
        confirm_password
      });
      user.save((err) => {
        if (err) {
          console.log(err);
          res.send("signup failed");
        }
        else{
          res.send("signup successful");
        }
      });
    }
    else{
      res.send("confirm password doesn't match");
    }
  });

app.delete("/signout", (req, res) => {
  User.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Signout successful");
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
