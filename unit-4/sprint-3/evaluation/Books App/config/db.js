const mongoose = require("mongoose");

require('dotenv').config();

const connection = mongoose.connect(process.env.url);

const bookSchema = mongoose.Schema({
    title : String,
    genre : String,
    price : Number,
    author : String
});


const Bookmodel = mongoose.model("book",bookSchema);

module.exports={
    connection,
    Bookmodel
}