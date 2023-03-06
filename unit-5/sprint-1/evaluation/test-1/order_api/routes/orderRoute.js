const express= require("express");
const {Ordermodel}= require("../model/usermodel");

const orderRouter= express.Router();

orderRouter.post("/add", async (req,res)=>{
      const item= req.body;
      try {
          const data= new Ordermodel(item);
          await data.save();
          const qty= Ordermodel.find().count();
          res.send({"data":data,"quantity":qty});
      } catch (err) {
          console.log("unable to place order");
          console.log(err)
      }
});

orderRouter.patch("/update/:_id", async (req,res)=>{
    const id= req.params;
    Ordermodel.findByIdAndUpdate(id)
})

module.exports={
    orderRouter
}