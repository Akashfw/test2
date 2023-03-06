const mongoose = require("mongoose");

const userSchema= mongoose.Schema({
    name:String,
    country:String,
    state:String,
    email:String,
    address:Array
});

const Usermodel = mongoose.model("user", userSchema);

const orderSchema= mongoose.Schema({
    name:String,
    cost:Number,
    quantity:Number,
    created_by: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status:String,
    date:Date
});

const Ordermodel= mongoose.model("order",orderSchema);

module.exports={
    Ordermodel
}




module.exports={
    Usermodel
}