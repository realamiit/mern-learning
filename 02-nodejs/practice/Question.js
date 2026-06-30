// Mongoose kr rhe hain schema aur modle banane ke liye 

const mongoose = require("mongoose");

// Schema: bluprint/Structure Define kr rha hain
// ye batate hain ki ek "question" document mein kaunse fields honge, aur unka type kya hoga

const questionSchema = new mongoose.Schema({
    questionName: String,  // Question kaname jaise "Two Sum"
    topic: String,            // topic jaise "Array"
    difficulty: String,      // difficulty level, jaise "Easy"/"Medium"/"Hard"
    dateAdded: Date,   // dateAdded me hmara date  add hoga 
});

// Model - is schema se "Question" naam ka model bana rahe hain
// Mongoose khud "Question" ko "questions" (lowercase + plural) collection se link karega
// ye wahi collection hai jo humne Compass mein dsaTracker database ke andar banaya tha

const Question = mongoose.model("Question", questionSchema);

// is Model ko export kar rahe hain, taki questionRoutes.js mein import karke
// actual save/find operations kar sakein
module.exports = Question;
