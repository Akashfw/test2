const mongoose= require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    role:{type:String , enum: ["customer","seller"],default:"customer"}
});

const Usermodel= mongoose.model("user",userSchema);

module.exports={
    Usermodel
}