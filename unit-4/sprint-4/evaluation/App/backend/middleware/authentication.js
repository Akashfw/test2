const jwt = require("jsonwebtoken");

const authenticate= (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const decoded_token= jwt.verify(token,"masai");
        if(decoded_token){
            next()
        }else{
            res.send("please login frist")
        }
    }else{
        res.send("Please login frist")
    }
};


module.exports={
    authenticate
}