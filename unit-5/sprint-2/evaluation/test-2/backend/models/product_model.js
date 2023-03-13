const mongoose= require("mongoose");

const productSchema= mongoose.Schema({
    name:String,
    price:Number,
    quantity:Number
})

const Promodel= mongoose.model("products",productSchema);

module.exports={
    Promodel
}