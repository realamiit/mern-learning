// router file - sirf "question" se related routes yaad rkhegaa
const express = require("express");
// express.Router() - ek mini-app jaisa object banata hain isme hum alag alg se routes define kr Sakte hain , sirf "/" object ko touch nhi krna padegaa
const router = express.Router();
const Question = require("./Question");
const authMiddleware = require("./authMiddleware");

router.get("/", authMiddleware, (req, res) => {
  Question.find()
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Fetch error:", error);
      res.send("Error fetching questions");
    });
});


// Practice route - topic/difficulty filtering (not used in current UI, kept for reference)

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



//  question/add"
router.post("/add", (req, res) => {
  const newQuestion = new Question({
    questionName: req.body.questionName,
    topic: req.body.topic,
    difficulty: req.body.difficulty,
    link: req.body.link,
    dateAdded: new Date(), // this is current Date actualy
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

// date rkhna revision
// /questions/due - aaj Day 3 revision ke due questions
router.get("/due3", (req, res) => {
  
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);    //aaj ki date se 3 din pehle ki date calculate karen
  // sirf vhi question jo tin din pehele ya usse pehele add huyi hain ya the
  Question.find({ dateAdded: { $lte: threeDaysAgo } })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Due Question error:", error);
      res.send("Error fetching due questions");
    });
});

// /questions/due - aaj Day 7 revision ke due questions
router.get("/due7", (req, res) => {
  
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);    //aaj ki date se 7 din pehle ki date calculate karen
  // sirf vhi question jo tin din pehele ya usse pehele add huyi hain ya the
  Question.find({ dateAdded: { $lte: sevenDaysAgo } })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Due Question error:", error);
      res.send("Error fetching due questions");
    });
});

// /questions/due - aaj Day 15 revision ke due questions
router.get("/due15", (req, res) => {
 
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);    //aaj ki date se 15 din pehle ki date calculate karen
  // sirf vhi question jo tin din pehele ya usse pehele add huyi hain ya the
  Question.find({ dateAdded: { $lte: fifteenDaysAgo } })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Due Question error:", error);
      res.send("Error fetching due questions");
    });
});

// /questions/due - aaj Day 30 revision ke due questions
router.get("/due30", (req, res) => {

  const thirtyDaysAgo = new Date(); 
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);    //aaj ki date se 30 din pehle ki date calculate karen
  // sirf vhi question jo tin din pehele ya usse pehele add huyi hain ya the
  Question.find({ dateAdded: { $lte: thirtyDaysAgo } })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Due Question error:", error);
      res.send("Error fetching due questions");
    });
});


// Custom revision days wale questions ke liye due list
router.get("/dueCustom", (req, res) => {
  // Step 1: Sirf wo questions nikaalo jinme revisionAfterDays set hai (null nahi hai)
  Question.find({ revisionAfterDays: { $ne: null } })
    .then((questions) => {
      // Step 2: Har question ke liye calculate karo — kya uska revision time aa chuka hai
      const dueCustomQuestions = questions.filter((question) => {
        const q = question.toObject();

        // dateAdded + revisionAfterDays = revision due date
        const revisionDueDate = new Date(q.dateAdded);
        revisionDueDate.setDate(revisionDueDate.getDate() + q.revisionAfterDays);

        // Agar revisionDueDate aaj ki date se pehle ya barabar hai, toh ye question "due" hai
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
  router.delete("/:id" ,async (req, res) => {
    try{
     // id nikalo
     const id = req.params.id;

  // question delete karo
  await Question.findByIdAndDelete(id);

  // response bhejo
  res.json({
    message: "Question deleted successfully"
  });
  }catch (err){
    res.status(500).json({
      error: err.message
    });
  }
  });   

  // Custom revision days update karne ke liye route
router.patch("/:id", (req, res) => {
  const id = req.params.id;  // 

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
