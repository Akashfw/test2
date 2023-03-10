const express = require("express");
const {UserModel}= require("./user_model");
const {connection}= require("./db");
const { v4: uuidv4 } = require('uuid');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const passport= require("passport")
require("dotenv").config();
const app=express();


app.get("/", async (req,res)=>{
    res.send("home page")
});



app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/index.html");

});

app.get("/auth/github", async(req,res)=>{
    const {code}= req.query;
      console.log(code);
      
     const accessToken= await fetch('https://github.com/login/oauth/access_token',{
        method:"POST",
        headers:{
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            client_id:process.env.CLIENT_ID,
            client_secret:process.env.CLIENT_SECRET,
            code,
        })
     }).then((res)=> res.json())

      

      const user= await fetch("https://api.github.com/user",{
        headers:{
            Authorization:`Bearer ${accessToken.access_token}`
        }
      }).then((res)=>res.json())

      console.log(user)
    res.send("sign up successful")
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' ,session:false}),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(req.user)
    res.redirect('/');
  });



var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
 async function(accessToken, refreshToken, profile, cb) {
    let email= profile._json.email;
    const user= new UserModel({
        email,
        pass:uuidv4(),
    })
    await user.save();
    const {_id,pass}=user;
    const payload={
        email,
        _id,
        pass,
        url:profile._json.picture
    }

      return cb(null, payload);
    
    
  }
  
));
// passport.authenticate()

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