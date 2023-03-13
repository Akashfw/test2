const express = require("express");
const {Promodel}= require("../models/product_model");
const product_route= express.Router();
const {authenticate}= require("../middleware/authenticate");
const {authorise}= require("../middleware/authorise")

product_route.get("/products",authenticate, async (req,res)=>{
   const pro= await Promodel.find();
   res.send(pro)
});

product_route.post("/addproducts",authenticate,authorise(["seller"]), async (req,res)=>{
    const {name,price,quantity} = req.body;
    try {
        const pro= new Promodel({name,price,quantity});
        await pro.save();
        res.send("product has been added")
    } catch (err) {
        console.log(err);
        res.send("unable to add product")
    }
});

product_route.delete("/deleteproducts/:_id",authenticate,authorise(["seller"]), async (req,res)=>{
    
    try {
        const ID= req.params._id;
        console.log(ID)
          const user = await Promodel.find({_id:ID});
          await Promodel.deleteOne({name:user[0].name});
          console.log(user[0].name);
        res.send(`product with ID ${ID} has been Deleted`)
    } catch (err) {
        console.log(err);
        res.send("unable to delete product")
    } 
})


module.exports={
    product_route
}