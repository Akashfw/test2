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
     const genre= req.query.genre;

     try {
         const book= await Bookmodel.find({genre:genre});
         res.send(book);
     } catch (err) {
        console.log(err);
        res.send({"err":"something went wrong"})
     }
 });

 bookroute.get("/booksbyprice", async (req,res)=>{
    const low= req.query.price_low;
    const high= req.query.price_high;

    try {
        const book= await Bookmodel.find({$and:[{price:{$gt:low}},{price:{$lt:high}}]});
        res.send(book);
    } catch (err) {
       console.log(err);
       res.send({"err":"something went wrong"})
    }
});

bookroute.patch("/editbooks/:id", async (req,res)=>{
    const ID= req.params.id;
    const payload= req.body;
    try {
         await Bookmodel.findByIdAndUpdate({_id:ID},payload);
        res.send(`Book with ID-${ID} has been updated`);
    } catch (err) {
       console.log(err);
       res.send({"err":"something went wrong"})
    }
});

bookroute.delete("/deletbooks/:id", async (req,res)=>{
    const ID= req.params.id;
    
    try {
         await Bookmodel.findByIdAndDelete({_id:ID});
        res.send(`Book with ID-${ID} has been deleted`);
    } catch (err) {
       console.log(err);
       res.send({"err":"something went wrong"})
    }
});

 module.exports={
     bookroute
 }