// router file - sirf "question" se related routes yaad rkhegaa
const express = require("express");
// express.Router() - ek mini-app jaisa object banata hain isme hum alag alg se routes define kr Sakte hain , sirf "/" object ko touch nhi krna padegaa
const router = express.Router();
const Question = require("./Question");
const authMiddleware = require("./authMiddleware");

router.get("/", authMiddleware, (req, res) => {
  Question.find({ userId: req.user.userId })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Fetch error:", error);
      res.send("Error fetching questions");
    });
});

// Practice route - topic/difficulty filtering (not used in current UI, kept for reference)

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

//  question/add"
router.post("/add", authMiddleware, (req, res) => {
  const newQuestion = new Question({
    questionName: req.body.questionName,
    topic: req.body.topic,
    difficulty: req.body.difficulty,
    link: req.body.link,
    dateAdded: new Date(),
    userId: req.user.userId,
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

router.get("/due3", authMiddleware, (req, res) => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  Question.find({ dateAdded: { $lte: threeDaysAgo }, userId: req.user.userId })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Due Question error:", error);
      res.send("Error fetching due questions");
    });
});

router.get("/due7", authMiddleware, (req, res) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  Question.find({ dateAdded: { $lte: sevenDaysAgo }, userId: req.user.userId  })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Due Question error:", error);
      res.send("Error fetching due questions");
    });
});

router.get("/due15", authMiddleware, (req, res) => {
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
  Question.find({ dateAdded: { $lte: fifteenDaysAgo }, userId: req.user.userId })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Due Question error:", error);
      res.send("Error fetching due questions");
    });
});

router.get("/due30", authMiddleware, (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  Question.find({ dateAdded: { $lte: thirtyDaysAgo }, userId: req.user.userId })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Due Question error:", error);
      res.send("Error fetching due questions");
    });
});

router.get("/dueCustom", authMiddleware, (req, res) => {
  Question.find({ revisionAfterDays: { $ne: null }, userId: req.user.userId })
    .then((questions) => {
      const dueCustomQuestions = questions.filter((question) => {
        const q = question.toObject();
        const revisionDueDate = new Date(q.dateAdded);
        revisionDueDate.setDate(revisionDueDate.getDate() + q.revisionAfterDays);
        return revisionDueDate <= new Date();
      });
      res.send(dueCustomQuestions);
    })
    .catch((error) => {
      console.log("Due custom question error:", error);
      res.send("Error fetching due custom questions");
    });
});

//   Delete route
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    await Question.findByIdAndDelete(id);
    res.json({
      message: "Question deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// Custom revision days update karne ke liye route
router.patch("/:id", authMiddleware, (req, res) => {
  const id = req.params.id;
  const revisionAfterDays = req.body.revisionAfterDays;
  Question.findByIdAndUpdate(id, { revisionAfterDays: revisionAfterDays })
    .then((updatedQuestion) => {
      res.json({ message: "Revision days updated successfully!", updatedQuestion });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// module.exports - is file ko "router" object ko export kar rahe hain
// taki express-server.js (ya koi aur file) ise IMPORT karke use kar sake
module.exports = router;