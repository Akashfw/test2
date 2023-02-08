const {UserModel}= require("../model/user_model");
const bcrypt = require("bcrypt");
const express= require("express");

const jwt= require("jsonwebtoken");
const fs= require("fs");
const { application } = require("express");
const userRoutes= express.Router();
userRoutes.use(express.json())
const {authenticate}= require('../middleware/authenticate')
userRoutes.post("/signup", async (req,res)=>{
    const {name,email,pass,role}=req.body;
    bcrypt.hash(pass,6,async (err,hash)=>{
         const user= new UserModel({
             name,
             email,
             pass:hash,
             role
         })
         await user.save();
         res.send({"msg":"signup successfull"})
    });
});

userRoutes.post("/login", async (req,res)=>{
    const {email,pass}= req.body;

    const user= await UserModel.findOne({email});

    if(!user){
        res.send({"msg":"please sign-up"});
    }
    const hashedpass= user?.pass;

    bcrypt.compare(pass, hashedpass, (err,result)=>{
        if(result){
            const token= jwt.sign({userID:user._id}, "password", {expiresIn: '60'});
            const ref_token= jwt.sign({userID:user._id}, "ref_password", {expiresIn: '300'});
            res.send({"msg":"login successful",token,ref_token});

        }else{
            res.send({"msg":"wrong credentials"})
        }
    })
})



userRoutes.get("/logout", async (req,res)=>{
    const token= req.headers.authorization?.split(" ")[1];
    const blacklist= JSON.parse(fs.readFileSync("blacklistdata.json","utf-8"));
    blacklist.push(token);
    fs.writeFileSync("blacklistdata.json", JSON.stringify(blacklist));
    res.send({"msg":"log-out successfull"})

});

module.exports={
    userRoutes
}