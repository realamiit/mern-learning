# Day 27 — Dynamic Due-Questions Fetch + Cron + Email Integration

## Concepts & Definitions

**Standalone function (vs Route handler)** — Ek plain JavaScript function jo `req`/`res` nahi leta. Ye tab use hota hai jab humein kisi logic (jaise DB query) ko kisi HTTP request ke bina bhi call karna ho — jaise cron job ke andar se.

**Promise** — Ek object jo represent karta hai kisi asynchronous operation (jaise DB query) ka **future result**. `Question.find(...)` jaisa Mongoose method hamesha Promise return karta hai — actual data nahi, isliye result access karne ke liye `.then()` (ya `async/await`) lagana zaroori hota hai.

**`.map()`** — Array method jo har element pe ek function chalata hai aur us function se return hui value se **naya array** banata hai. Array-to-array transformation. Original array ki length same rehti hai.

**`.join(separator)`** — Array method jo array ke elements ko ek **single string** mein combine karta hai, diye gaye separator ke saath har element ke beech mein. Sirf strings/numbers pe meaningful result deta hai — objects pe `[object Object]` jaisa useless output deta hai.

---

## Why a New Standalone Function Was Needed

Purana `/due3-details` route Express route handler hai:
```javascript
router.get("/due3-details", (req, res) => {
  // ... query
  res.send(questionsWithDates);
});
```
Ye `req`/`res` leta hai kyunki isko HTTP request ke through call kiya jaata hai (browser/Postman se).

Cron job ke andar koi HTTP request nahi aati — cron sirf timer-based function call hai. Isliye ek naya **standalone function** banaya gaya jo query kare aur data **return** kare (`res.send()` ke bina):

```javascript
function getDueQuestions() {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  return Question.find({ dateAdded: { $lte: threeDaysAgo } });
}
```

⚠️ **Important:** Ye function `Question.find(...)` ko seedha `return` karta hai — matlab ye **Promise return karta hai, actual data nahi**. Isliye call karte waqt `.then()` zaroori hai:
```javascript
getDueQuestions().then((questions) => { ... });
```

---

## Full Integration Flow

```javascript
// Imports zaroori: dono files independent scopes hain, isliye
// express-server.js mein bhi Question model alag se import karna pada
const Question = require("./Question");

function getDueQuestions() {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  return Question.find({ dateAdded: { $lte: threeDaysAgo } });
}

function sendReminderEmail(questionNames) {
  const namesString = questionNames.join(", ");   // array of strings -> single string
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
  .then(() => console.log("Email Send SuccessFully!"))
  .catch((error) => console.log("Email Sending Error:", error));
}

cron.schedule('35 2 * * *', () => {
  console.log('Cron triggered: sending reminder email...');

  getDueQuestions().then((questions) => {
    if (questions.length === 0) {
      console.log("Koyi due question nhi aayi hain aaj.");
      return;   // function ko yahin exit karo, email bhejne wala code neeche na chale
    }

    const questionNames = questions.map((question) => question.questionName);
    sendReminderEmail(questionNames);
  });
});
```

**Data flow summary:**
```
Question.find() → Promise<Array of Objects>
    → .then((questions) => ...)
    → .map(q => q.questionName) → Array of Strings
    → sendReminderEmail(questionNames)
    → .join(", ") → Single readable String
    → email HTML mein insert
```

---

## Confusion Boxes

**Q: `req/res` `getDueQuestions()` mein kyun nahi hai, jabki `/due3-details` route mein hai?**
A: `/due3-details` ek Express route hai — isko HTTP request trigger karta hai, isliye `req` (incoming data) aur `res` (response bhejne ke liye) chahiye. `getDueQuestions()` ek plain function hai jo cron (internal timer) se call hota hai — koi HTTP request/response involved nahi, isliye `req/res` ki zaroorat nahi.

**Q: Ek file mein `require("./Question")` kiya, to doosri file mein bhi wo automatically available ho jaata hai?**
A: Nahi. Har `.js` file apne aap mein independent scope hai. `require(...)` sirf usी file ke andar valid hota hai jahan likha gaya hai. Doosri file mein wahi model chahiye to usko bhi alag se `require` karna padega — chahe dono files ek doosre se related (jaise ek dusre ko import kar rahi) ho.

**Q: `.join()` ko directly objects ke array pe chala do (bina `.map()` ke), to kya milega?**
A: `[object Object], [object Object]` jaisa useless output milega — kyunki `.join()` ko object ke andar se field nikalna nahi aata, wo sirf object ko force se string mein convert karne ki koshish karta hai, jiska default representation `[object Object]` hota hai. Isliye pehle `.map()` se objects se specific field (string) nikalni padti hai, tabhi `.join()` sahi output dega.

---

## Mistake Boxes (actual mistakes made)

1. **`dataAdded` vs `dateAdded` typo:** `getDueQuestions()` likhte waqt schema field ka naam `dateAdded` ki jagah `dataAdded` likh diya. MongoDB isse **error nahi deta** — silently query chal jaati hai lekin kabhi match nahi hoti, result hamesha empty array aata. Ye sabse risky type ka bug hai kyunki koi error signal nahi milta.

2. **`$lte` vs `$lti` typo:** MongoDB operator `$lte` (less than or equal) ki jagah `$lti` likh diya, jo ek invalid/non-existent operator hai.

3. **Old bug in `/due3-details` route (fixed today):** `threeDaysAgo.getDate = (threeDaysAgo.getDate() - 3)` likha tha — `setDate()` method ki jagah `getDate` property ko overwrite kar diya tha. Isse actual date value badalti nahi thi. Fix: `threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);`

4. **Catch block typo:** `console.log("Due question error", reeor)` — `error` parameter ka naam galat spell hua tha (`reeor`), jo ReferenceError deta.

5. **Missing import realization:** Shuru mein laga ki `questionRoutes.js` mein `Question` import hone ki wajah se `express-server.js` mein bhi automatically available hoga — galat samajh. Node.js mein har file ka apna independent scope hota hai; alag se import karna pada.

---

## Mock Interview — Actual Q&A (Score 0.5/5, then revised with follow-up clarification)

**Q1. `getDueQuestions()` `req, res` kyun nahi leta, jabki `/due3-details` route leta tha?**
- *Student's answer:* (Confusing wording, directionally correct)
- *Polished answer:* Route ko HTTP request trigger karti hai isliye `req/res` chahiye. `getDueQuestions()` cron (internal call) se chalta hai, koi HTTP involved nahi, isliye `req/res` ki zaroorat nahi.

**Q2. `getDueQuestions()` kya return karta hai — Promise ya actual data?**
- *Student's answer:* "Actual data deta hai" (❌ Galat)
- *Polished answer:* Promise return karta hai. `Question.find()` hamesha Promise deta hai, isliye `.then()` lagana zaroori hai result access karne ke liye.

**Q3. `.map()` aur `.join()` mein farak?**
- *Student's answer:* "map jodta hai, join separate karta hai" (❌ Ulta bola)
- *Polished answer:* `.map()` array ko transform karke naya array banata hai (object → string extraction). `.join()` array ko ek single string mein combine karta hai separator ke saath.

**Q4. Empty due-questions case mein `return;` kyun likha?**
- *Student's answer:* "console.log wala message return karega" (❌ Galat)
- *Polished answer:* `console.log()` sirf print karta hai, return nahi karta. `return;` (bina value) function ko turant exit kar deta hai, taaki neeche wala email-sending code na chale jab koi due question hi na ho.

**Q5. Galat field name (`dataAdded`) se MongoDB kya karega?**
- *Student's answer:* "error dega" (❌ Galat)
- *Polished answer:* MongoDB koi error nahi deta — silently empty result (`[]`) deta hai, kyunki field schema mein match hi nahi hota. Ye dangerous silent-failure bug hai.

**Follow-up clarification (after re-explanation):** Objects array pe direct `.join()` chalane se `[object Object]` milta hai — isliye `.map()` se pehle strings nikalna zaroori hai. Iske baad concept clear hua.

---

## Syntax Reference Card

```javascript
// Standalone function - no req/res, returns a Promise
function getDueQuestions() {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
  return Question.find({ dateAdded: { $lte: threeDaysAgo } });
}

// Consuming a Promise-returning function
getDueQuestions().then((questions) => {
  // questions = actual array of documents here
});

// Object array -> string array
const names = questions.map((q) => q.questionName);

// String array -> single string
const namesString = names.join(", ");
```

---

## Pending / Next Session

- Email mein dashboard link/button add karna (`<a href="...">`) — abhi tak sirf text hai, koi clickable link nahi.
- `Question` schema mein `link` field add karna (jo original LeetCode/GFG problem URL store kare) — abhi sirf `questionName` store hota hai.
- Future (deferred): GitHub contribution graph / coding platform submission tracking — core feature complete hone ke baad.

## notes snippets aur syntax reference card ke liye, refer to the above sections.
 https://docs.google.com/document/d/1oPj6zORmDi4Phl6xPdCKo0EcfkjA3UTac9CtRHUF9ho/edit?tab=t.0#heading=h.ay1kir2c523