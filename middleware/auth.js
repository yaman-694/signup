const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =req.header.token;

  if (!token) {
    return res.status(302).redirect('/login');
  }
  try {
    jwt.verify(token, config.TOKEN_HEADER_KEY,(err, decodedToken)=>{
      if(err){
        return res.status(404).send({error:"Unauthorized"})
      }else{
        next();
      }
    });
    
  } catch (err) {
    return res.status(302).redirect("/login");
  }
};

module.exports = {verifyToken};