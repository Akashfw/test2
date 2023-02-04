const express= require("express");
require("dotenv").config();
const app=express();
app.use(express.json());
const {connection}= require("./config/db");
const {userRoute} = require("./routes/user_route");
const {postRouter} = require("./routes/post_route")
const {authenticate} = require("./middleware/authentication")


app.use("/",userRoute);
app.use(authenticate)
app.use("/posts",postRouter);
app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("connected to DB")
    } catch (err) {
        console.log("unable to connect to DB");
        console.log(err);
    }
    console.log("server is running on port 8080")
})

