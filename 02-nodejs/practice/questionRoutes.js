// router file - sirf "question" se related routes yaad rkhegaa
const express = require("express");

// express.Router() - ek mini-app jaisa object banata hain isme hum alag alg se routes define kr Sakte hain , sirf "/" object ko touch nhi krna padegaa
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

// /due3
router.get("/due3-details", (req, res) => {
  const threeDaysAgo = new Date();
  threeDaysAgo.getDate = (threeDaysAgo.getDate() - 3);
  Question.find({dateAdded: {$lte: threeDaysAgo}})
    .then((questions) => {
      // har question ko plain object me convert karo 
      //  aur revision date bhi add kroo

      const questionsWithDates = questions.map((questions) => {
        const q = questions.toObject();

        // due3 date = dateAdded + 3 days 
        const due3 = new Date(q.dateAdded);
        due3.setDate(due3.getDate() + 3);
        q.due3 = due3;
        return q;
      });
      res.send(questionsWithDates);
    })
    .catch((error) => {
      console.log("Due question error" , reeor);
      res.send("Error fetching due questions");
    });

  });


  // router.delete("/:id" ,res)   baad me krege means pending work 



// module.experts - is file ko "router" object ko EXPORT kar rahe hain
// taki express-server.js (ya koi aur file) ise IMPORT karke use kar sake
module.exports = router;
