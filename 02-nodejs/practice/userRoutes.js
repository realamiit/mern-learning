const express = require("express"); // routes banane ka framework
const router = express.Router();    // routes banane ka framework
const bcrypt = require("bcrypt");  // For thr security
const User = require("./user");   // database operations ke liye
const jwt = require("jsonwebtoken");  // jwt require kr liye 


router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;


if(name.trim() === ""){
    return res.status(400).json({ message: "Enter valid name" })
}

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
        res.json("User registered successfully!");
    })
    .catch((error) => {
        console.log("Signup error:", error);
        res.status(500).json({ message: "Error Registering user"});
    });
});



router.post("/login", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
    .then((user) => {
        if (!user) {
            return res.status(404).json({ message: "User not found"});
        }
        bcrypt.compare(password, user.password)
        .then((isMatch) => {
            if (isMatch) {
                const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
                );
                res.json({ message: "Login successful!", token: token })
            }else {
                res.status(401).json({ message: "Wrong password"});
            }
        });
    })
    .catch((error) => {
        console.log("Login error:", error);
        res.status(500).json({ message: "Error logging in"});
    });
});


// module.exports - is file ko "router" object ko export kar rahe hain
// taki express-server.js (ya koi aur file) ise IMPORT karke use kar sake
module.exports = router;