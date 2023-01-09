const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title : String,
    genre : String,
    price : Number,
    author : String
});


const Bookmodel = mongoose.model("book",bookSchema);

module.exports={
    Bookmodel
}