const { application } = require("express");
const express= require("express");
const postRouter= express.Router();


const {Postmodel} = require("../model/post_model");

postRouter.get("/",async(req,res)=>{
    let device1= req.query.device1;
    let device2=req.query.device2;
    
    try {
        const post= await Postmodel.find({device1,device2});
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

postRouter.patch("/update/:id",async (req,res)=>{
    try {
        const ID= req.params.id;
        const payload= req.body;
        await Postmodel.findByIdAndUpdate({_id:ID},payload);
        res.send(`post with ${ID} has been updated`);
    } catch (err) {
        console.log(err);
        console.log("something went wrong")
    }
});

postRouter.delete("/delete/:id" , async (req,res)=>{
try {
    const ID=req.params.id;
    await Postmodel.findByIdAndDelete({_id:ID});
    res.send(`post with ${ID} has been deleted`);
} catch (err) {
    console.log(err);
        console.log("something went wrong")
    
}
});

module.exports={
    postRouter
}

