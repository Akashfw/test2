const express = require("express");
 const bookroute= express();

 bookroute.use(express.json());


 const {Bookmodel} = require("../models/bookmodel");


 bookroute.post("/addbooks", async (req,res)=>{
     const data= req.body;

     try {
         const book = new Bookmodel(data);
         await book.save();
         res.send("Book has been added in DB")
     } catch (err) {
         console.log(err);
         res.send({"err":"something went wrong"})
     }
 });

 bookroute.get("/books", async (req,res)=>{
     
 })

 module.exports={
     bookroute
 }