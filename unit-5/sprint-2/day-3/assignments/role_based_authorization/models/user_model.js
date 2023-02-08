const mongoose= require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    role:{type : String, enum : ["customer", "seller"], default : "customer"}
});

const UserModel= mongoose.model("users",userSchema);


module.exports={
    UserModel
}