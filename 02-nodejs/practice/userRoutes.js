const express = require("express"); // routes banane ka framework
const router = express.Router();    // routes banane ka framework
const bcrypt = require("bcrypt");  // For thr security
const User = require("./User");   // database operations ke liye


router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    bcrypt.hash(password, 10)
    .then((hashedPassword) => {
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });
        return newUser.save();
    })
    .then(() => {
        res.send("User registered successfully!");
    })
    .catch((error) => {
        console.log("Signup error:", error);
        res.send("Error Registering user");
    });
});


// module.exports - is file ko "router" object ko export kar rahe hain
// taki express-server.js (ya koi aur file) ise IMPORT karke use kar sake
module.exports = router;