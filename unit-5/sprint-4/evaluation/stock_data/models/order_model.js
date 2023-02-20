const mongoose= require("mongoose");

const orderschema= mongoose.Schema({
    company_symbol: String,
   price:Number,
   time:String
});

const Ordermodel= mongoose.model("order", orderschema);

module.exports={
    Ordermodel
}






