const express = require("express");
const {connection}= require("./config/db")
const {Usermodel}= require("./models/user_model")
const app= express();
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs= require("fs");
app.use(express.json());
const {product_route}= require("./routes/product_route")


app.get("/",(req,res)=>{
    res.send("home page")
})
app.use(product_route)
app.post("/signup", async(req,res)=>{
    const {name,email,pass,role}= req.body;
    try {
        bcrypt.hash(pass, 7, async (err,hash)=>{
            const user= new Usermodel({
                name,
                email:email,
                pass:hash,
                role
            });
            await user.save();
            res.send("user has been Registered")
        })
    } catch (err) {
        console.log(err);
        res.send("unable to register")
    }
});


app.post("/login", async (req,res)=>{
    const {email,pass}= req.body;
    
    try {
        const user= await Usermodel.findOne({email});
        if(!user){
            res.send("please signup first")
        }
        const hashpass= user?.pass
        bcrypt.compare(pass,hashpass,(err,result)=>{
            if(result){
                const token = jwt.sign({userID:user._id,role:user.role},process.env.Tsecret,{expiresIn:"3m"});
                const refresh_token= jwt.sign({userID: user._id},process.env.Rsecret,{expiresIn:'5m'});
                res.send({msg:"login successful",token,refresh_token})
            }else{
                res.send("login failed")
            }
        })
    } catch (err) {
        res.send("unable to log-in");
        console.log(err)
    }

})

app.get("/newToken",async (req,res)=>{
    const refresh_token= req.headers.authorization?.split(" ")[1];
    if(!refresh_token){
        res.send("login again")
    }
    jwt.verify(refresh_token,process.env.Rsecret,(err,decoded)=>{
        if(err){
            res.send({msg:"please login frist","err":err.message})
        }
        else{
            const token = jwt.sign({userID:user._id,role:user.role},process.env.Tsecret,{expiresIn:"1m"});
            res.send({msg:"new token created successfully",token})
        }
    })
});


app.get("/logout", async (req,res)=>{
    const token= req.headers.authorization?.split(" ")[1];
    const blacklist= JSON.parse(fs.readFileSync("./blacklist.json","utf-8"));
    blacklist.push(token);
    fs.writeFileSync("./blacklist.json",JSON.stringify(blacklist));
    res.send("logged out successful")
})

app.listen(process.env.port, async ()=>{
    try {
        await connection;
        console.log("connected to DB")
    } catch (err) {
        console.log("unable to connect to DB");
        console.log(err)
    }
    console.log("port is running on "+process.env.port)
})