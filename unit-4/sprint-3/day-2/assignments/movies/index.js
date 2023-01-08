const express= require("express");
const app= express();
require('dotenv').config();
const {connection,Moviemodel} = require("./config/db");
app.use(express.json());
const {model} = require("mongoose");



app.post("/addmovies",async (req,res)=>{
    const data= req.body;
    try {
        const hero=new Moviemodel(data);
        await hero.save()
    res.send("movie is added")
    } catch (error) {
        console.log(error);
        res.send({"err":"something went wrong"})
    }
    
    
});

app.get("/movies",async (req,res)=>{
    try {
        let filter= req.query.filter;
        
        const movie=await Moviemodel.find({title:{$regex:`${filter}`,$options:"i"}});
           res.send(movie) 
    } catch (err) {
        console.log(err);
        res.send({"err":"something went wrong"})
    }
    
});

app.get("/movies",async (req,res)=>{
    try {
        let rating= req.query.rating;
        const movie=await Moviemodel.find({rating:rating});
           res.send(movie) 
    } catch (err) {
        console.log(err);
        res.send({"err":"something went wrong"})
    }
    
});

app.patch("/editmovie/:id",async (req,res)=>{
    try {
        const ID= req.params.id;
        const payload= req.body;
        await Moviemodel.findByIdAndUpdate({_id:ID},payload)
        res.send(`Movie with id ${ID} has been updated`)
    } catch (err) {
        console.log(err);
        res.send({"err":"something went wrong"})
    }
});

app.delete("/deletmovie/:id",async (req,res)=>{
    try {
        const ID= req.params.id;
        
        await Moviemodel.findByIdAndDelete({_id:ID})
        res.send(`hero with id ${ID} has been deleted`)
    } catch (err) {
        console.log(err);
        res.send({"err":"something went wrong"})
    }
});

app.get("/sortmovie/:val",async (req,res)=>{
    try {
        const Val= req.params.val;
        // let no= Number(Val)
        const movie= await Moviemodel.find().sort({rating:Val})
        res.send(`hero with id ${ID} has been deleted`)
    } catch (err) {
        console.log(err);
        res.send({"err":"something went wrong"})
    }
});


app.get("/movies/pagination",async (req,res)=>{
   let query= req.query;
   let page=query.page;
   let num = Number(page);
   let n= num*5;
   try {
    const movie= await Moviemodel.find().limit(5).skip(n);
    res.send(movie)
   } catch (err) {
    console.log(err)
   }
});



app.listen(process.env.port,async ()=>{
     
    try {
        await connection
        console.log("connected to DB")
    } catch (err) {
        console.log("unable to connect to DB");
        console.log(err)
    }
    console.log(`connect to server of port ${process.env.port}`);
})