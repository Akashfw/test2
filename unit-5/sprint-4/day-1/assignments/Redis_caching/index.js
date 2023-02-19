const express = require("express");
const app= express();
const redis= require("redis")
const bcrypt= require("bcrypt");
const jwt= require('jsonwebtoken');
const fs= require("fs");
const {authenticate}= require("./middleware/authenticate")
const {connection}=require('./config/db');
const {UserModel}= require('./models/user_model')
app.use(express.json());



const client = redis.createClient();

client.on("error", (err) => console.log(err, "ERROR in REDIS"));
client.connect();

app.get("/",async (req,res)=>{
    let responce= await client.GET("name");
    console.log(responce)
    res.send("Hello from "+ "   "+responce);
});

app.post("/signup", async (req, res) => {
    const {name, email, pass} = req.body;
    bcrypt.hash(pass, 5, async function(err, hash) {
        const user = new UserModel({
            name,
            email : email,
            pass : hash
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
            const token = jwt.sign({userID : user._id}, "SECRET", {expiresIn : '1h'})
            const refresh_token = jwt.sign({userID : user._id}, "REFRESH_SECRET", {expiresIn : '7d'});
             client.SET("user_token",token);
             client.EXPIRE("user_token", 3600);
             
            res.send({msg : "login successfull", token, refresh_token})
        }
        else{
            res.send("login failed")
        }
    });
})

app.get("/reports", authenticate, (req, res) => {
    res.send("Reports")
})


app.get("/logout",async (req, res) => {
    const token = await client.GET("user_token");
    await client.RPUSH("blacklist",token)
    console.log(token)

    res.send("Logged out successfully")
})

app.listen(8080, async ()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (err) {
        console.log(err)
        console.log("unable to connect to DB")
    }
    console.log("running on port 8080")  
})