// router file - sirf "question" se related routes yaad rkhegaa
const express = require("express");

// express.Router() - ek mini-app jaisa object banata hai
// isme hum alag alg se routes define kr Sakte hain , sirf "/" object ko touch nhi krna padegaa
const router = express.Router();

const Question = require("./Question");

router.get("/", (req, res) => {
    Question.find()
    .then((questions) => {
        res.send(questions);
    })
    .catch((error) => {
        console.log("Fetch error:",error);
        res.send("Error fetching questions")
    });
});

// ye route ka full path banega: "/question/add"
router.post("/add", (req, res) => {
  const newQuestion = new Question({
    questionName: req.body.questionName,
    topic: req.body.topic,
    difficulty: req.body.difficulty,
  });

  newQuestion
    .save()
    .then(() => {
      res.send("Question saved successfully!");
    })
    .catch((error) => {
        console.log("Save error:", error)
      res.send("Error saving question");
    });
});

// module.experts - is file ko "router" object ko EXPORT kar rahe hain
// taki express-server.js (ya koi aur file) ise IMPORT karke use kar sake
module.exports = router;
