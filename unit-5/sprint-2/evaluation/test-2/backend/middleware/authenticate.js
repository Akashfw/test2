const jwt= require("jsonwebtoken");
require("dotenv").config()
const fs= require("fs");
const authenticate = (req,res,next)=>{
    const token= req.headers.authorization?.split(" ")[1];
    if(!token){
        res.send("please login")
    }

    const blacklist= JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));

    if(blacklist.includes(token)){
        return res.send("login again")
    }

    jwt.verify(token, process.env.Tsecret,(err,decoded)=>{
        if(err){
            res.send({msg:"please login frist","err":err.message})
        }else{
            const userRole= decoded?.role;
            req.body.userRole= userRole;
            next()
        }
    })
}


module.exports={
    authenticate
}