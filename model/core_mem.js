const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const URL = require("valid-url");
const userSchema = new mongoose.Schema({
  role:{
   type: String,
   required: true,
   maxlength: 50

 },
 github: {
   type: String,
   required: 'URL can\'t be empty',
   maxlength: 70,
   

 },
 Linkedin: {
   type: String,
   required: 'URL can\'t be empty',
   maxlength: 70

 },
 
 Branch:{
   type: String, 
   required: true,
   maxlength: 50
 },
 object: {
    type: String,
    required: true
 }


});


userSchema.path('github').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');
userSchema.path('Linkedin').validate((val) => {
  urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

userSchema.plugin(uniqueValidator);

//check 
module.exports = core_mem = mongoose.model("core_member", userSchema);