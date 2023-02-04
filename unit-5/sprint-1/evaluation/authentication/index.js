const express = require("express");
require("dotenv").config();
const app= express();
app.use(express.json());
const {connection}= require("./config/db");
const {userRoute}= require("./routes/user_route");
const {reportRoute}= require("./routes/report_route");
const {authentication}= require("./middleware/authentication_middleware");



app.get("/", async (req,res)=>{
    res.send("welcome to home page")
});

app.use(userRoute);
app.use(authentication);
app.use(reportRoute);

app.listen(process.env.port, async ()=>{
    try {
        await connection;
        console.log("connected to DB")
    } catch (err) {
        console.log("unable to connect");
        console.log(err)
    }
    console.log(`port is running on ${process.env.port}`)
})