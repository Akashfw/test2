var jwt = require('jsonwebtoken');
const fs = require("fs");
const redis= require("redis")
const client = redis.createClient();

client.on("error", (err) => console.log(err, "ERROR in REDIS"));
client.connect();


const authenticate =  async (req, res, next) => {
    const token = await client.GET("user_token");
    if(!token){
        res.send("login again")
    }
    const blacklisteddata= await client.LRANGE("blacklist",0,-1);

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