const mongoose= require("mongoose");
  require("dotenv").config();
const connection = mongoose.connect(process.env.mongourl);

const movieSchema= mongoose.Schema({
    title:String,
    language:String,
    rating:Number,
    poster:String,
});

const Moviemodel= mongoose.model("movie",movieSchema);

module.exports={
    connection,
    Moviemodel
}