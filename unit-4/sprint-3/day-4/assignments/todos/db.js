const mongoose=require("mongoose");
require('dotenv').config()
const connection = mongoose.connect(process.env.mongourl);

const heroSchema= mongoose.Schema({
    name:String,
    city:String,
    power:Number,
    villian:String,
    language:String,
    is_active:Boolean
});

const HeroModel= mongoose.model("heroe",heroSchema)

module.exports={
    connection,
    HeroModel
}