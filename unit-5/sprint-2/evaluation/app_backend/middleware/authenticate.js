const jwt= require('jsonwebtoken');
const fs= require("fs");

 const authenticate= (req,res,next)=>{
     const token= req.headers.authorization?.split(" ")[1];
     if(!token){
         res.send({"msg":"login again"});
        }
        const blacklist= JSON.parse(fs.readFileSync("blacklistdata.json", "utf-8"));

        if(blacklist.include(token)){
            return res.send("login again")
        }

        jwt.verify(token, 'password', (err,decoded)=>{
            if(err){
                res.send("plz login frist");
            }else{
                next()
            }
        })
 }

 module.exports={
     authenticate
 }