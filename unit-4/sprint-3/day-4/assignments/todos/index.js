const express= require("express");
const { model } = require("mongoose");
const app= express();
const {connection,HeroModel}=require("./db");
require('dotenv').config()
app.use(express.json())


app.get("/",(req,res)=>{
   res.send("welcome")
});

app.get("/todos",async (req,res)=>{
    try {
        // let language= req.query.language;
        // let power= req.query.power;
        const heros=await HeroModel.find();
           res.send(heros) 
    } catch (err) {
        console.log(err);
        res.send({"err":"something went wrong"})
    }
    
});

app.patch("/todos/:id",async (req,res)=>{
    try {
        const ID= req.params.id;
        const payload= req.body;
        await HeroModel.findByIdAndUpdate({_id:ID},payload)
        res.send(`hero with id ${ID} has been updated`)
    } catch (err) {
        console.log(err);
        res.send({"err":"something went wrong"})
    }
});

app.delete("/todos/:id",async (req,res)=>{
    try {
        const ID= req.params.id;
        
        await HeroModel.findByIdAndDelete({_id:ID})
        res.send(`todo with id ${ID} has been deleted`)
    } catch (err) {
        console.log(err);
        res.send({"err":"something went wrong"})
    }
})

app.post("/todos/create",async (req,res)=>{
    const data= req.body;
    try {
        const hero=new HeroModel(data);
        await hero.save()
    res.send("hero is added")
    } catch (error) {
        console.log(error);
        res.send({"err":"something went wrong"})
    }
    
    
})


app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("connected to db")
    } catch (error) {
        console.log("error while connecting to db")
    }
    console.log(`server running on port ${process.env.port}` )
})