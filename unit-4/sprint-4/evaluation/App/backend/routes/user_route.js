const express= require("express");
const {Usermodel}= require("../model/user_model");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const userRoute= express.Router();
userRoute.get("/",(req,res)=>{
    res.send("Home Page")
})

userRoute.post("/users/register", async (req,res)=>{
    const {name,email,gender,password}= req.body;
    try {
        bcrypt.hash(password,10,async (err,hash)=>{
            const user= new Usermodel({name,email,gender,password:hash});
            await user.save();
            res.send("User Registered")
        });
    } catch (err) {
        res.send("error in user registration");
        console.log(err);
    }
});


userRoute.post("/users/login", async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user= await Usermodel.find({email});
        console.log(user);
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({course:'backend'},'masai');
                    res.send({"msg":"Login Successful","token":token});
                }else{
                    res.send("Wrong Credentials");
                }
            })
        }else{
            res.send("Wrong Credentials");
        }
    } catch (err) {
        res.send("something went wrong");
        console.log(err);
    }
});

module.exports={
    userRoute
}