const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: String,
    role: { type: String, enum: ["buyer", "seller", "agent"] },
});

userSchema.plugin(plm, { usernameField: "email" });

const User = mongoose.model("User", userSchema);

module.exports = User;
