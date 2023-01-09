const express = require("express");
const {bookroute} = require("./routes/bookroutes");
const app = express();
const {connection} = require("./config/db");
app.use(express.json());
const {model} = require("mongoose");
require('dotenv').config();


app.use(bookroute)



app.listen(process.env.port, async ()=>{
    try {
        await connection;
        console.log("connected to DB");
    } catch (err) {
        console.log("unable to connect to DB");
        console.log(err)
    };

    console.log(`server is running on port ${process.env.port}`)
})