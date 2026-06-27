// dotenv - .env file ko padh kar uske values ko process.env mein available banata hai
// .config() call karna zaroori hai, taki .env file load ho
require("dotenv").config();

// mongoose - MongoDB ke saath connect/interact karne ke liye
const mongoose = require("mongoose");

// .env file se MONGO_URI value uthate hain
// process.env - Node.js ka built-in object jisme environment variables store hoti hain
const mongoURI = process.env.MONGO_URI;

// mongoose.connect() - MongoDB se connection banane ki koshish karta hai
// ye ASYNC operation hai (turant complete nahi hota, internet pe jana padta hai)
// isliye .then() aur .catch() use karte hain - jab connection ban jaye ya fail ho
mongoose.connect(mongoURI)
  .then(() => {
    console.log("MongoDB se connection successful!");
  })
  .catch((error) => {
    // agar connection fail ho (galat password, internet issue, etc.)
    console.log("MongoDB connection mein error aaya:", error);
  });