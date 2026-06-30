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
      console.log("Fetch error:", error);
      res.send("Error fetching questions");
    });
});

//   tssk  to filter all array questions
router.get("/arrays", (req, res) => {
  Question.find({ topic: "Arrays" })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Fetch error:", error);
      res.send("Error fetching questions");
    });
});

// task    to filter all linkedList questions
router.get("/linkedList", (req, res) => {
  Question.find({ topic: "Linked List" })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Fetch error:", error);
      res.send("Error fetching questions");
    });
});

// task recursion
router.get("/recursion", (req, res) => {
  Question.find({ topic: "Recursion" })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Fetch error:", error);
      res.send("Error fetching questions");
    });
});

//  task easy

router.get("/easy", (req, res) => {
  Question.find({ difficulty: "Easy" })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Fetch error:", error);
      res.send("Error fetching easy questions");
    });
});

//  task medium
router.get("/medium", (req, res) => {
  Question.find({ difficulty: "Medium" })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Fetch error:", error);
      res.send("Error fetching medium questions");
    });
});

//  task hard
router.get("/hard", (req, res) => {
  Question.find({ difficulty: "Hard" })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Fetch error:", error);
      res.send("Error fetching hard questions");
    });
});

// task prt this is combination section 

router.get("/easy-arrays", (req, res) => {
  Question.find({ topic: "Arrays", difficulty: "Easy" })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Fetch error:", error);
      res.send("Error fetching questions");
    });
});

// ye route ka full path banega: "/question/add"
router.post("/add", (req, res) => {
  const newQuestion = new Question({
    questionName: req.body.questionName,
    topic: req.body.topic,
    difficulty: req.body.difficulty,
    dateAdded: new Date(),   // this is current Date actualy 
  });

  newQuestion
    .save()
    .then(() => {
      res.send("Question saved successfully!");
    })
    .catch((error) => {
      console.log("Save error:", error);
      res.send("Error saving question");
    });
});

// module.experts - is file ko "router" object ko EXPORT kar rahe hain
// taki express-server.js (ya koi aur file) ise IMPORT karke use kar sake
module.exports = router;
