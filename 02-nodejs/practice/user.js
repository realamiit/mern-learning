const mongoose = require("mongoose");  // yha hmne mongooes require kiya huva hava hain 

// ab yha hm schema bnayege user ka Authentication ke liye 

const userSchema = new mongoose.Schema({
    name: {type: String, required: true },
    email: {type: String, required: true},
    password: {type: String, required: true},
});

const User = mongoose.model("User", userSchema);

module.exports = User;