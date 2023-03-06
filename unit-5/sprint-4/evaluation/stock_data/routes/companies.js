const express = require("express");
const compRouter= express.Router();
const {Ordermodel}= require("../models/order_model");
const {Compmodel}= require("../models/companies_model");



compRouter.get("/",async (req,res)=>{
    try {
        const comp= await Compmodel.find();
        res.send(comp)
    } catch (err) {
        console.log(err);
        res.send({"error":"something went wrong"})
    }
});


compRouter.post("/add",async (req,res)=>{
    const payload= req.body;
    try {
        const newcomp= new Compmodel(payload);
        await newcomp.save();

        res.send("companies has been added")
    } catch (err) {
        console.log(err);
        res.send({"error":"something went wrong"})
    }
});

compRouter.patch("/edit/:symbol",async (req,res)=>{
    const payload= req.body;
    const Symbol= req.params.symbol;
    console.log(Symbol);
    try {
        const data= await Compmodel.find({symbol:Symbol});
        console.log(data)
        if(!data){
            res.send("Company has not listed in our server")
        }else{
            
            await Compmodel.findOneAndUpdate({symbol:Symbol},payload);
            res.send("company has been updated");
        }  
    } catch (err) {
        console.log(err);
        res.send({"error":"something went wrong"})
    }
});

compRouter.delete("/delete/:symbol",async (req,res)=>{
    
    const Symbol= req.params.symbol;
    try {
        const data= await Compmodel.find({symbol:Symbol});
        if(!data){
            res.send("Company has not listed in our server")
        }else{
            
            await Compmodel.findOneAndDelete({symbol:Symbol});
            res.send("company has been Deleted");
        }  
    } catch (err) {
        console.log(err);
        res.send({"error":"something went wrong"})
    }
});

compRouter.get("/:symbol/stats", async(req,res)=>{
    try {
        // console.log(client.GET(symbol))
        const Symbol= req.params.symbol;
        const data= await Ordermodel.find({company_symbol:Symbol}).sort({price:-1});
        let max=data[0].price;
        let min=data[data.length-1].price;
        let no= data.length;
        
        res.send({"max-price":max,"min-price":min,"number":no})
    } catch (err) {
        console.log(err);
        res.send({"error":"something went wrong"})
    }
})


module.exports={
    compRouter
}