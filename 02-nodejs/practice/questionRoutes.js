// router file - sirf "question" se related routes yaad rkhegaa
const express = require("express");

// express.Router() - ek mini-app jaisa object banata hai
// isme hum alag alg se routes define kr Sakte hain , sirf "/" object ko touch nhi krna padegaa
const router = express.Router();

// Dyan do: yha "/questions" nhi likha , sirf "/"
// kyuki "/questions" prefix express-server.js me app.use() se add hoga 
router.get("/", (req , res) => {
    res.send("Ye Sare questions !!! Solve it");
});

// ye route ka full path banega: "/question/add"
router.post("/add", (req , res) => {
    console.log(req.body.questionName + " Name ka ", "Naya Question add ho gya");
    res.send("Nya Question Add Ho Gya " + req.body.questionName + " Name ka");
});

// module.experts - is file ko "router" object ko EXPORT kar rahe hain
// taki express-server.js (ya koi aur file) ise IMPORT karke use kar sake
module.exports = router;