const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    role:[]
});


const UserModel= mongoose.model("user_data",userSchema);

module.exports={
    UserModel
}