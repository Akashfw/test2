const express= require("express");
require("dotenv").config()
const app= express();
app.use(express.json());
const {connection}= require("./config/db");
const {compRouter}= require("./routes/companies");
const {orderRouter}= require("./routes/orders");


app.get("/",(req,res)=>{
    res.send("HOME PAGE")
})

app.use("/company",compRouter);
app.use("/order",orderRouter)

app.listen(process.env.port,async ()=>{
try {
    await connection;
    console.log("connected to DB")
} catch (err) {
    console.log(err)
    console.log("unable to connect to DB")
}

    console.log("listening on port "+process.env.port)
})

