const express = require("express");
require("dotenv").config();
const app=express();
app.use(express.json());
const {connection}=require("./config/db");
const {Usermodel} = require("./model/user_model");
const jwt = require("jsonwebtoken");



app.get("/", async (req,res)=>{
    res.send("Welcome to Home Page")
});

app.post("/register",async (req,res)=>{
    const {name,email,pass,age}=req.body
    try{
        const user=new Usermodel({name,email,pass,age})
        await user.save()
        res.send("Registered")
    }catch(err){
    res.send("Error in registering the user")
    console.log(err)
    }
    })

    app.post("/login",async (req,res)=>{
        const {email,pass}=req.body
        
        try{
        const user=await Usermodel.find({email})
        const token = jwt.sign({ course: 'backend' }, 'masai',{expiresIn:'60m'});
        
        if(user.length>0){
            res.send({"msg":"Login Successfull","token":token})
        } else {
        res.send("Wrong Credntials")
        }
        } catch(err){
        res.send("Something went wrong")
        console.log(err)
        }
        })

app.get("/about",(req,res)=>{
    res.send("about api")
})
app.get("/data",(req,res)=>{
   const token= req.headers.authorization;
//    console.log(token);
    jwt.verify(token, 'masai',(err, decoded)=> {
          if(err){
            res.send("Invalid token")
          }else{
            res.send("data...")
          }
      });
    
})
app.get("/cart",(req,res)=>{
    const token= req.headers.authorization;
    jwt.verify(token, 'masai',(err, decoded)=> {
        if(err){
          res.send("Invalid token")
        }else{
          res.send("Cart Item")
        }
    });
});
app.get("/contact",(req,res)=>{
    res.send("all contacts")
})




app.listen(8080, async ()=>{
    try {
        await connection;
        console.log("connected to DB")
    } catch (err) {
        console.log("unable to connect to DB")
        console.log(err);
        
    }
    console.log("port is running at 8080")
})