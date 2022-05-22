const md5 = require("md5");
const bodyParser = require("body-parser"); 
const postRegister = (req, res) => {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const User_Type = req.body.User_Type;
    const College = req.body.College;
    const phone_no = req.body.phone_no;
    const email = req.body.email;
    const password =  md5(req.body.password);
    const confirm_password =  md5(req.body.confirm_password);
    // console.log(first_name, last_name, User_Type, College, phone_no, email, password, confirm_password);
    if(confirm_password === password){
      const user = new User({
        first_name: first_name,
        last_name: last_name,
        User_Type: User_Type,
        College: College,
        phone_no: phone_no,
        email: email,
        password: password,
        confirm_password: confirm_password
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
  }

const getRegister = (req, res) => {
    res.render("signup");
  }

module.exports={
    getRegister,
    postRegister
}