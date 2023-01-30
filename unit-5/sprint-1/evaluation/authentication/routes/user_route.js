const express= require("express");
const {UserModel}= require("../model/user_model");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const userRoute= express.Router();


userRoute.post("/signup", async (req,res)=>{
    const {name,email,pass,age}= req.body;
    try {
        bcrypt.hash(pass, 7, async(err, hash)=>{
            const user=new UserModel({name,email,pass:hash,age})
            await user.save()
            res.send("user registered")
        });
    } catch (err) {
        res.send("error in signup");
        console.log(err);
    }
});


userRoute.post("/login", async (req,res)=>{
    const {email,pass}=req.body;
    try {
        const user= await UserModel.find({email});
        if(user.length>0){
            bcrypt.compare(pass, user[0].pass, (err,result)=>{
                if(result){
                    const token= jwt.sign({course:'backend'},'masai');
                    res.send({"msg":"login successful",'token':token})
                }else{
                    res.send("wrong credentials")
                }
            })
        }else{
            res.send("wrong credentials")
        }
    } catch (err) {
        res.send('something went wrong');
        console.log(err)
    }
});


module.exports={
    userRoute
}

