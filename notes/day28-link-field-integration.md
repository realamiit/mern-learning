# Day 28 — Question Link Field + Clickable LeetCode Icon Integration

## Concepts & Definitions

**Optional Schema Field** — Ek Mongoose schema field jise `required: true` nahi diya jaata, matlab document us field ke bina bhi valid/saveable rehta hai. `link: String` (bina `required`) is tarah ki field hai.

**Props Drilling (basic form)** — Parent component se child component ko data + setter functions pass karna, taaki child us data ko read/update kar sake, bina apna khud ka state banaye. `link` aur `setLink` ko `QuestionForm` mein isी tarah pass kiya gaya.

**Vite `public` folder** — Vite project ka special folder jiska content seedha web server ke **root path (`/`)** pe serve hota hai. `public/logo.png` file ko JSX mein `src="/logo.png"` se access karte hain — `public` word path mein nahi likhte.

**Static text (`" "`) vs Dynamic expression (`{ }`) in JSX** — `href="URL_YAHAN"` mein quotes ke andar likhi cheez ek **fixed/constant string** hoti hai, jo kabhi nahi badalti. `href={q.link}` mein curly braces ke andar likhi cheez ek **JavaScript expression** hoti hai, jise JS process/evaluate karta hai — is case mein `q.link` ki current value use hoti hai, jo har question ke liye alag ho sakti hai.

**`target="_blank"`** — HTML anchor (`<a>`) tag ka attribute jo link ko ek **naye browser tab** mein kholta hai, current tab ko replace kiye bina. Isse current page (DSA Tracker) khula rehta hai jab external link (LeetCode) pe click karte hain.

---

## Why `link` is Optional (not required)

Spaced-repetition scheduling logic (Day 3/7/15/30 reminders) sirf `dateAdded` aur `revisionAfterDays` pe depend karta hai — `link` field pe nahi. Agar `link` ko `required: true` banate, to:
- Purani already-added questions (jinme link nahi hai) invalid ho jaatin
- Bina link ke naya question add karna bhi block ho jaata

Optional rakhne se system flexible rehta hai — `link` sirf ek **convenience/UX enhancement** hai, core functionality nahi.

---

## Full Integration Flow (Backend → Frontend)

### 1. Schema (Question.js)
```javascript
const questionSchema = new mongoose.Schema({
  questionName: String,
  topic: String,
  difficulty: String,
  dateAdded: Date,
  revisionAfterDays: Number,
  link: String,   // naya optional field
});
```

### 2. Backend Route (questionRoutes.js)
```javascript
router.post("/add", (req, res) => {
  const newQuestion = new Question({
    questionName: req.body.questionName,
    topic: req.body.topic,
    difficulty: req.body.difficulty,
    link: req.body.link,   // naya field yahan bhi add karna zaroori
    dateAdded: new Date(),
  });
  newQuestion.save()
    .then(() => res.send("Question saved successfully!"))
    .catch((error) => {
      console.log("Save error:", error);
      res.send("Error saving question");
    });
});
```

### 3. QuestionForm Component (QuestionForm.jsx)
```jsx
const QuestionForm = ({questionName, setQuestionName, topic, setTopic, difficulty, setDifficulty, handleSubmit, link, setLink}) => {
  return (
    <div>
      <input placeholder="Question Name" value={questionName} onChange={(e) => setQuestionName(e.target.value)} />
      <input placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
      <input placeholder="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
      <input placeholder='Question Url' value={link} onChange={(e) => setLink(e.target.value)} />
      <button onClick={handleSubmit}>Add Question</button>
    </div>
  )
}
```
⚠️ Important: `link`/`setLink` **props ki list mein add** karne hote hain, kisi file se import **nahi** kiye jaate — props ka concept hai ki parent component data/setters child ko pass karta hai.

### 4. Parent Component (App.jsx)
```javascript
const [link, setLink] = useState("");   // naya state

function handleSubmit() {
  fetch("http://localhost:3000/questions/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ questionName, topic, difficulty, link }),
  })
    .then(() => {
      setQuestionName("");
      setTopic("");
      setDifficulty("");
      setLink("");   // form clear
      return fetch("http://localhost:3000/questions");
    })
    .then((res) => res.json())
    .then((data) => setQuestions(data));
}
```

```jsx
<QuestionForm
  questionName={questionName}
  setQuestionName={setQuestionName}
  topic={topic}
  setTopic={setTopic}
  difficulty={difficulty}
  setDifficulty={setDifficulty}
  handleSubmit={handleSubmit}
  link={link}
  setLink={setLink}
/>
```

### 5. Displaying Clickable Icon in List
```jsx
<li key={q._id}>
  {q.questionName} — {q.topic} — {q.difficulty}
  <a href={q.link} target="_blank">
    <img src="/LeetCode_logo_rvs.png" alt="LeetCode" width="20" />
  </a>
  ...
</li>
```

---

## Confusion Boxes

**Q: `link` aur `setLink` ko component mein use karne ke liye import karna chahiye?**
A: Nahi. Ye **props** hote hain — parent component se child ko pass hote hain. Import sirf tab hota hai jab koi cheez **kisi doosri file se separately export/define** hui ho, jaise npm packages ya utility functions. State variables aur unke setters props ke through hi share hote hain.

**Q: Backend mein `link: req.body.link` add karne ke baad bhi pehli baar test karne pe link save kyun nahi hui?**
A: Kyunki backend server **already purane code ke saath chal raha tha** (running process). Node.js server code changes ko live reload nahi karta (jab tak `nodemon` jaisa tool use na ho) — har backend change ke baad server ko **manually restart** karna padta hai, tabhi naya code effect mein aata hai.

**Q: `src="/logo.png"` mein `public` word kyun nahi likha, jabki file `public/logo.png` mein rakhi hai?**
A: Vite ka `public` folder ek special root-serving folder hai — iska content seedha application ke root URL (`/`) se serve hota hai. `public` sirf ek build-time convention hai, runtime URL path mein wo included nahi hota.

---

## Mistake Boxes (actual mistakes made)

1. **Backend file ko frontend mein import karne ki koshish:** `import { link } from '../../02-nodejs/practice/questionRoutes'` — ye conceptually galat tha. Frontend (React/browser) aur backend (Node/Express server) alag runtime environments hain, ek doosre ki files seedha import nahi ho sakti. Fix: `link`/`setLink` ko props ke through pass kiya.

2. **Server restart bhool jaana:** Backend route mein `link: req.body.link` add karne ke baad bhi, running server ko restart nahi kiya — isliye pehli baar test karne pe MongoDB mein `link` field save hi nahi hui thi (poora field missing tha document mein).

3. **Placeholder text ko literal string chhod dena:** `<a href="URL_YAHAN">` mein `"URL_YAHAN"` example/placeholder tha, lekin ise `{q.link}` (dynamic expression) mein convert karna bhool gaye the — isliye icon dikh raha tha, lekin click karne pe sahi URL pe redirect nahi ho raha tha.

---

## Mock Interview — Actual Q&A (Score 3/5)

**Q1. `link` field ko `required: true` na banake sirf `link: String` kyun rakha?**
- *Student's answer:* "String format mein hi link hota hai, isliye String use kiya" (❌ Galat — question ka matlab miss hua, `String` vs `required` mix ho gaya)
- *Polished answer:* Optional rakha kyunki scheduling logic `link` pe depend nahi karta — sirf convenience field hai. Required banate to purani/bina-link questions invalid ho jaatin.

**Q2. Pehli baar `link` MongoDB mein save kyun nahi hui, code sahi hone ke baavjood?**
- *Student's answer:* ✅ Correct (route mein line missing thi) — additional point: server restart na karna bhi ek factor tha.

**Q3. `public` folder path mein `public` word kyun nahi aata?**
- *Student's answer:* (Koi jawab nahi diya)
- *Polished answer:* Vite `public` folder ko root (`/`) se serve karta hai — build convention hai, runtime path mein include nahi hota.

**Q4. `href="URL_YAHAN"` vs `href={q.link}` mein core difference?**
- *Student's answer:* ✅ Correct — quotes = static/constant string, curly braces = JS expression jo dynamically process/evaluate hota hai.

**Q5. `target="_blank"` ka kaam?**
- *Student's answer:* "Dusre page ko smoothly render karta hai" (❌ Galat)
- *Polished answer:* Link ko naye browser tab mein kholta hai, current tab ko replace kiye bina — taaki original page (DSA Tracker) khula rahe.

---

## Syntax Reference Card

```javascript
// Schema - optional field
link: String,

// Backend route - saving optional field from request body
link: req.body.link,

// React - useState for new field
const [link, setLink] = useState("");

// Passing as prop
<QuestionForm link={link} setLink={setLink} ... />

// Clickable icon with dynamic URL, opens in new tab
<a href={q.link} target="_blank">
  <img src="/logo.png" alt="LeetCode" width="20" />
</a>
```

**Reminder:** Backend code change karne ke baad **hamesha server restart karo** (`Ctrl+C` → `node express-server.js`), warna purana code hi chalta rahega.

---

## Pending / Next Session

- Dashboard email mein bhi clickable link/button add karna (abhi sirf plain text names dikhte hain email mein)
- Future (deferred): GitHub contribution graph / coding platform submission tracking