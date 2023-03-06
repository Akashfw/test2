const express= require("express");
const {Usermodel} = require("../model/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter= express.Router();

userRouter.post("/signup", async (req,res)=>{
    const {name,country,state,email,address}= req.body;
    try {
        const user= new Usermodel({name,country,state,email,address});
        await user.save()
        res.send("user registered")
    } catch (err) {
        res.send("error in signup");
        console.log(err);
    }

})

module.exports={
   userRouter
}