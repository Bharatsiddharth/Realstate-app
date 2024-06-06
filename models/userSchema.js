const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:{type:String, enum:["buyer", "seller", "agent"]},
})

const UserSchema = mongoose.model("user", userSchema);

module.exports = UserSchema;