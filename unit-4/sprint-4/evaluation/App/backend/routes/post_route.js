const express= require("express");
const postRouter= express.Router();

const {Postmodel} = require("../model/post_model");

postRouter.get("/",async(req,res)=>{
    try {
        const post= await Postmodel.find();
        res.send(post)
    } catch (err) {
        console.log(err);
        console.log({"err":"something went wrong"})
    }
});

postRouter.post("/create", async(req,res)=>{
    const payload= req.body;
    try {
        const newnote= new Postmodel(payload);
        await newnote.save();
        res.send("post has been created")
    } catch (err) {
        console.log({"msg":"something went wrong"});
        console.log(err);
    }
});

