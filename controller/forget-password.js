const bodyParser = require("body-parser");
const md5 = require('md5');
const bcrypt = require('bcrypt');
const handlerror = require('../middleware/err')
const jwt = require("jsonwebtoken")
require("dotenv").config();
const nodemailer = require("nodemailer");
const config = require('../config/config')


const createtoken = (id, password, email) => {

  const Token = jwt.sign({ id, email }, process.env.TOKEN_HEADER_KEY + password, {
    expiresIn: '15m'
  });
  return Token;
}
const nodemailfunc = async (email, link) => {
console.log(config.nodemailDetails);
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.nodemailDetails.email, // 
    pass: config.nodemailDetails.password //
  },
});
await transporter.sendMail({
  from: config.nodemailDetails.email, // sender address
  to: email, // list of receivers
  subject: "Reset Link", // Subject line
  html: `<b>Rest Link ${link}</b>`, // html body
}, (err, info) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log(info.response);
  }
});

}

const forget = async (req, res) => {
  res.send('forget password page')
}

const Postforget = async (req, res) => {
  const email = req.body.email;

  if (!(email)) {
    res.status(400).json({ "err": "Enter email" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.send('User not exist');
    return;
  }
  const token = createtoken(user._id, user.password, user.email);
  const link = 'http://localhost:' + process.env.PORT + '/reset-token/' + user.id + '/' + token;
  console.log(link)
  nodemailfunc(email, link);
  

  res.send("Sent to the Email");


}

module.exports = {
  Postforget,
  forget
}