// express external module hai (npm install express se download kiya tha)
// isliye http jaisa seedha require nahi - pehle install karna padta hai
const express = require("express");
const questionRoutes = require("./questionRoutes"); //  questionRoutes.js se router import kar rahe hain
require("./db");
const nodemailer = require("nodemailer");
const cron = require('node-cron');
const Question = require("./Question");  

// express() call karne par "app" object milta hai
// isi app object se hum routes define karenge aur server start karenge
const app = express();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,         // ye gmail access krta hai 
    pass: process.env.GMAIL_APP_PASSWORD,  // password access krta hai 
  },
});


function getDueQuestions() {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() -3);
  return Question.find({ dateAdded: { $lte: threeDaysAgo} });
}

function sendReminderEmail(questionNames) {
  const namesString = questionNames.join(", ")
  transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.RECIPIENT_USER,
    subject: "DSA Revision Reminder",
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #333;">📚 Time to Revise!</h2>
        <p style="font-size: 16px;">Your Scheduled Revision is due for:</p>
        <p style="font-size: 18px; font-weight: bold; color: #4CAF50;">${namesString}</p>
        <p style="font-size: 14px; color: #777;">Keep up the consistency — head over to your DSA Tracker dashboard to mark it done.</p>
      </div>
    `, 
  })
  .then(() => {
    console.log("Email Send SuccessFully!");
  })
  .catch((error) => {
    console.log("Email Sending Error:", error);
  });
}

// ye eek function hai jo (incoming) mtlb hm jo raw data JSON formet
// me dete hai ye usko js ke formet me convert krta hai
// , aur use req.body mein daal deta hai. Agar ye line missing ho (app.use(express.json()) na
// likha ho), to req.body undefined aayega — chahe Postman se kitna bhi data bhej do,
// Express use samajh hi nahi payega.
app.use(express.json());
const cors = require("cors");
app.use(cors()); 

app.use("/questions", questionRoutes); // "/questions" se shuru hone wala koi bhi request questionRoutes file ko jayega

// app.get(path, callback) - jab koi GET request "/" (home) par aaye, ye callback chalega
// GET = browser jab normally URL kholta hai, wo GET request hoti hai (data maangna)
app.get("/", (req, res) => {
  // res.send() - Express ka method, http module ke res.end() jaisa hi kaam karta hai
  // lekin zyada flexible hai (string, object, etc. sab handle kar leta hai)
  res.send("Ye Home Page!!");
});

// dusra route - /dashboard path ke liye alag callback
// dhyan do: yaha koi if/else nahi - Express khud route ko match karke
// sahi callback chalata hai, humein manually check nahi karna
app.get("/dashboard", (req, res) => {
  res.send("Ye Dashboard Page hai!!");
});

// Har rooz subha 7 :30 AM par reminder email Trigger hogaa
cron.schedule('50 12 * * *' , () => {
  console.log('Cron triggered: sending reminder email...');

  getDueQuestions().then((questions) => {
    if(questions.length === 0){
      console.log("Koyi due question nhi aayi hain aaj.");
      return;
    }

    const questionNames = questions.map((question) => question.questionName);
    sendReminderEmail(questionNames);
  });
});

// app.listen() - http module ke server.listen() jaisa
// port 3000 par server activate karta hai
app.listen(3000, () => {
  // sendReminderEmail("Two Sum");
  console.log("Express Server Chal Raha Hai: http://localhost:3000");
});

