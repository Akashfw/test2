const express= require("express");
const app= express();

require("dotenv").config();
const {authenticate}= require("./middleware/authenticate")
app.use(express.json());
const {userRoutes}= require("./routes/user_route")
const {connection} = require("./config/db");



app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use(userRoutes);

app.get("/goldrate",authenticate, async(req,res)=>{
    res.send("goldrates...");
});

app.get("/userstats",authenticate, (req,res)=>{
    res.send("user status...")
})



app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (err) {
        console.log(err);
        console.log("unable to connect to DB")
    }
    console.log(`port is running on ${process.env.port}`)
})
