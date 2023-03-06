const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
const {connection}= require("./config/db")
const {userRouter} = require("./routes/user_route")
const {orderRouter} = require("./routes/orderRoute")
app.get("/",(req,res)=>{
    res.send("home page")
});

app.use(userRouter);
app.use(orderRouter)

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