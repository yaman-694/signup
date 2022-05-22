const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const validator = require("validator");
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


module.exports = User = mongoose.model("user", userSchema);