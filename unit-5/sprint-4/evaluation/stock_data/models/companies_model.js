const mongoose= require("mongoose");

const compschema= mongoose.Schema({
    name:String,
    symbol:String
});

const Compmodel= mongoose.model("companies", compschema);

module.exports={
    Compmodel
}