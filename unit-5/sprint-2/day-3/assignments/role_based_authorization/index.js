const express = require("express");
const app= express();
require("dotenv").config();
const bcrypt= require("bcrypt");
const jwt= require('jsonwebtoken');
const fs= require("fs");
const {authenticate}= require("./middleware/authenticate")
const {connection}=require('./config/db');
const {UserModel}= require('./models/user_model');
const {authorise} = require("./middleware/authorise")
app.use(express.json());


app.get("/",async (req,res)=>{
    res.send("This is Home Page");
});

app.post("/signup", async (req, res) => {
    const {name, email, pass,role} = req.body;
    bcrypt.hash(pass, 5, async function(err, hash) {
        const user = new UserModel({
            name,
            email : email,
            pass : hash,
            role
        })
        await user.save()
        res.send("Sign up Successfull")
    });
});


app.post("/login", async (req, res) => {
    const {email, pass} = req.body;

    const user = await UserModel.findOne({email})
    if(!user){
        res.send("Please signup first")
    }
    const hashedpwd = user?.pass
    bcrypt.compare(pass, hashedpwd, function(err, result) {
        if(result){
            const token = jwt.sign({userID : user._id, role : user.role}, "SECRET", {expiresIn : '1h'})
            const refresh_token = jwt.sign({userID : user._id}, "REFRESH_SECRET", {expiresIn : '7d'})
            res.send({msg : "login successfull", token, refresh_token})
        }
        else{
            res.send("login failed")
        }
    });
})

app.get("/reports", authenticate, (req, res) => {
    res.send("Reports")
});

app.get("/getnewtoken", (req, res) => {
    const refresh_token = req.headers.authorization?.split(" ")[1]

    if(!refresh_token){
        res.send("login again")
    }
    jwt.verify(refresh_token, 'REFRESH_SECRET', function(err, decoded) {
        if(err){
            res.send({"message" : "plz login first", "err" : err.message})
        }
        else{
            const token = jwt.sign({userID : user._id, role : user.role}, "SECRET", {expiresIn : '1h'})
            res.send({msg : "login successfull", token})
        }
  });
})
//customer & seller
app.get("/buyproduct",authenticate,authorise(["customer", "seller"]), (req,res)=>{
    res.send("this is your products")
});

//seller
app.get("/editproduct",authenticate,authorise(["seller"]), (req,res)=>{
    res.send("edit your products")
});

// custumer
app.get("/reviewproduct",authenticate,authorise(["customer"]), (req,res)=>{
    res.send("this is your products review")
});


app.get("/logout", (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    const blacklisteddata = JSON.parse(fs.readFileSync("./blacklist.json", "utf-8"))
    blacklisteddata.push(token)
    fs.writeFileSync("./blacklist.json", JSON.stringify(blacklisteddata))
    res.send("Logged out successfully")
})

app.listen(process.env.port, async ()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (err) {
        console.log(err)
        console.log("unable to connect to DB")
    }
    console.log("running on port 8080")  
})