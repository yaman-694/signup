const md5 = require("md5");
const log = function(req, res){
    res.send("login");
    }

const PostLogin = (req, res) => {

    const email = req.body.email;
    const password =  md5(req.body.password);
    // console.log(email, password);
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
  }

module.exports= {
    PostLogin,
    log
}