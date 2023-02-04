const mongoose= require("mongoose");

const userSchema = mongoose.Schema({
    email:String,
    pass:String
});

const UserModel= mongoose.model("users",userSchema);


module.exports={
    UserModel
}