var jwt = require('jsonwebtoken');
const fs = require("fs")
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
   
    if(!token){
        res.send("login again")
    }
    const blacklisteddata = JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"))

    if(blacklisteddata.includes(token)){
       return  res.send("login again")
    }
  

    jwt.verify(token, 'SECRET', function(err, decoded) {
            if(err){
                res.send("plz login first")
            }
            else{
                next()
            }
      });

}




module.exports = {authenticate}