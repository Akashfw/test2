const express= require("express");
const reportRoute= express.Router();

reportRoute.get("/reports", async(req,res)=>{
    res.send("this is user report")
});

module.exports={
    reportRoute
}