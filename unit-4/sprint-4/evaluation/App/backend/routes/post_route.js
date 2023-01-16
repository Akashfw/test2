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
})