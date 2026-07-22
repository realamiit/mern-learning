const express = require("express"); // routes banane ka framework
const router = express.Router();    // routes banane ka framework
const bcrypt = require("bcrypt");  // For thr security
const User = require("./User");   // database operations ke liye
const jwt = require("jsonwebtoken");  // jwt require kr liye 


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

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email })
    .then((user) => {
        if (!user) {
            return res.send("User not found");
        }
        bcrypt.compare(password, user.password)
        .then((isMatch) => {
            if (isMatch) {
                const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
                );
                res.send({ message: "Login successful!", token: token })
            }else {
                res.send("Wrong password");
            }
        });
    })
    .catch((error) => {
        console.log("Login error:", error);
        res.send("Error logging in");
    });
});


// module.exports - is file ko "router" object ko export kar rahe hain
// taki express-server.js (ya koi aur file) ise IMPORT karke use kar sake
module.exports = router;