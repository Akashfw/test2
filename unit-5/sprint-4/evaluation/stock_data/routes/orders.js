const express = require("express");
const orderRouter= express.Router();

const {Ordermodel}= require("../models/order_model");

orderRouter.get("/:symbol",async (req,res)=>{
    try {
        const Symbol= req.params.symbol;
        const data= await Ordermodel.find({company_symbol:Symbol});
        res.send(data)
    } catch (err) {
        console.log(err);
        res.send({"error":"something went wrong"})
    }
});


orderRouter.post("/add",async (req,res)=>{
    const payload= req.body;
    try {
        const newcomp= new Ordermodel(payload);
        await newcomp.save();

        res.send("order has been added")
    } catch (err) {
        console.log(err);
        res.send({"error":"something went wrong"})
    }
});

orderRouter.patch("/edit/:id",async (req,res)=>{
    const payload= req.body;
    const ID= req.params.id;
   
    try {
       
            await Ordermodel.findByIdAndUpdate({_id:ID},payload);
            res.send("order has been updated");
         
    } catch (err) {
        console.log(err);
        res.send({"error":"something went wrong"})
    }
});

orderRouter.delete("/delete/:id",async (req,res)=>{
    

    const ID= req.params.id;
    try {
        
            
        await Ordermodel.findByIdAndDelete({_id:ID});
        res.send("order has been deleted");
          
    } catch (err) {
        console.log(err);
        res.send({"error":"something went wrong"})
    }
});


module.exports={
    orderRouter
}