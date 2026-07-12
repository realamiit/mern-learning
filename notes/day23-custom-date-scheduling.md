# Day 23 — Custom Date Scheduling (Full Stack Feature)

## Concepts Covered

**Optional Schema Fields** — Mongoose mein agar koi field sirf type ke saath likhi jaaye (`revisionAfterDays: Number`), by default wo optional hoti hai jab tak `required: true` na likha jaaye.

**PATCH vs PUT** — PATCH sirf specify ki gayi fields update karta hai, baaki untouched rehti hain. PUT poora document replace kar deta hai — agar saari fields na bhejein, wo missing ho jaati hain. Jab sirf ek field update karni ho, PATCH sahi choice hai.

**Dynamic Date Calculation** — jab fixed interval (3/7/15/30) ki jagah har document ka apna alag number (`revisionAfterDays`) ho, static MongoDB query (`$lte`) se kaam nahi chalta. Iske liye saare relevant documents nikaal ke, JavaScript mein `.filter()` se manually calculate karna padta hai.

**`.filter()`** — array method jo sirf wahi elements rakhta hai jinke liye callback function `true` return kare (unlike `.map()` jo har element transform karta hai, sabko rakhta hai).

**Computed Property Names (Dynamic Object Keys)** — `{ [variable]: value }` syntax se object mein key ka naam ek variable ki value se banta hai, hardcoded nahi. Isse ek hi state object multiple dynamic entries track kar sakta hai (jaise har question ki apni input value).

**Controlled Input Fallback (`|| ""`)** — agar controlled input ki value `undefined` ho sakti hai (jaise state mein abhi tak entry nahi hai), `|| ""` fallback deना zaroori hai warna React "uncontrolled to controlled" warning deta hai.

---

## Syntax Reference Card

```javascript
// 1. Schema — optional field
revisionAfterDays: Number,

// 2. Backend PATCH route — update single field
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  const revisionAfterDays = req.body.revisionAfterDays;
  Question.findByIdAndUpdate(id, { revisionAfterDays: revisionAfterDays })
    .then((updatedQuestion) => {
      res.json({ message: "Revision days updated successfully!", updatedQuestion });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// 3. Backend — dynamic due calculation with .filter()
router.get("/dueCustom", (req, res) => {
  Question.find({ revisionAfterDays: { $ne: null } })
    .then((questions) => {
      const dueCustomQuestions = questions.filter((question) => {
        const q = question.toObject();
        const revisionDueDate = new Date(q.dateAdded);
        revisionDueDate.setDate(revisionDueDate.getDate() + q.revisionAfterDays);
        return revisionDueDate <= new Date();
      });
      res.send(dueCustomQuestions);
    })
    .catch((error) => res.send("Error fetching due custom questions"));
});

// 4. Frontend — dynamic input state (computed keys)
const [customDaysInput, setCustomDaysInput] = useState({});

<input
  type="number"
  placeholder="Days"
  value={customDaysInput[q._id] || ""}
  onChange={(e) => setCustomDaysInput(prev => ({ ...prev, [q._id]: e.target.value }))}
/>

// 5. Frontend — setCustomDays function
const setCustomDays = (id) => {
  fetch(`http://localhost:3000/questions/${id}`, {
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ revisionAfterDays: customDaysInput[id] })
  })
    .then(() => {
      fetch("http://localhost:3000/questions/dueCustom")
        .then((res) => res.json())
        .then((data) => setDueQuestions(prev => ({ ...prev, dueCustom: data })));
    })
    .catch((err) => console.error("Set Days Error:", err));
};

// 6. Reusing existing DueSection component for the 5th time
<DueSection questions={dueQuestions.dueCustom} title="Custom Revision Questions" onDelete={deleteQuestion} />
```

---

## Confusion Boxes (Questions Amit Asked)

**Q: PUT vs PATCH mein farak kya hai?**
A: PUT poora document replace karta hai — agar sirf ek field bheji, baaki saari fields (`questionName`, `topic`, etc.) database se **gayab** ho jaati hain. PATCH sirf jo bheja hai wahi update karta hai, baaki **untouched** rehti hain. Jab sirf ek field change karni ho, PATCH sahi hai.

**Q: Ek hi form field (custom days input) sabhi questions ke liye alag-alag kaise track karein, bina 5 alag `useState` banaye?**
A: Ek hi state **object** banao (`useState({})`), aur har question ki `_id` ko **key** bana lo. Computed property syntax (`{ [q._id]: value }`) se dynamically sahi key update hoti hai — na ki hardcoded naam se.

**Q: 5 din wala revisionAfterDays set karne pe turant Custom section mein kyun nahi dikha?**
A: Ye bug nahi tha — `revisionAfterDays: 5` ka matlab hai "dateAdded ke 5 din baad due hoga". Agar `dateAdded` aaj ki hai, toh 5 din baad hi due hoga, abhi nahi. Turant test karne ke liye `revisionAfterDays: 0` use karna chahiye — isse turant "due" ban jaata hai.

---

## Mistake Boxes (Actual Mistakes Amit Ne Kiye)

**Mistake 1:** Naye `dueCustom` route ke liye galat/naya component (`DueCustom`) banane ki koshish ki, jabki existing reusable `DueSection` component ko hi naye props ke saath reuse karna tha.
```javascript
// GALAT
<DueCustom questions={dueQuestions.dueCustom} title="..." />
```
**Fix:** `DueSection` (existing component) use kiya, sirf naye props diye — koi naya component banane ki zaroorat nahi thi, yehi hai reusability ka fayda.

**Mistake 2:** Naya `useEffect` `useState` ke saath confuse kiya — galti se `useEffect` ko state banane ke liye use karne ki koshish ki:
```javascript
// GALAT
const [dueCustom, setDueCustom] = useState({});  // Sahi tha, lekin phir dubara alag se banaya jabki already dueQuestions object mein add karna tha
```
**Fix:** `useState` sirf state banane ke liye, `useEffect` sirf side-effects (fetch calls) ke liye — dono alag purpose ke hooks hain, ek dusre ki jagah use nahi karte.

**Mistake 3:** Button ko bina arrow function wrap kiye aur bina argument pass kiye likh diya:
```javascript
// GALAT
<button onClick={setCustomDays}>Set</button>
```
**Fix:** `<button onClick={() => setCustomDays(q._id)}>Set</button>` — arrow function se wrap karna zaroori hai (warna render hote hi call ho jaata), aur `q._id` pass karna zaroori tha taaki function ko pata chale kis question ka update karna hai.

**Mistake 4 (Testing insight, bug nahi):** Sochा ki 5 din wala `revisionAfterDays` set karne ke baad turant Custom section mein dikhna chahiye tha — ye galat expectation thi. Logic sahi tha, sirf calculation ko samajhne mein confusion thi.
**Fix:** `revisionAfterDays: 0` se turant test karna seekha — real-world mein number jitna bada hoga utna time lagega due hone mein, jo sahi/expected behavior hai.

---

## Debugging Highlights

1. **Purane test documents mein `dateAdded` missing thi** (Compass mein manually bane the) — isliye `dueCustom` route unhe kabhi "due" nahi maanta tha (`new Date(undefined)` = Invalid Date). Naye Add Question Form se bane documents mein ye problem nahi thi.
2. **Server galat folder se chal raha tha** (`02-nodejs/practice` ki jagah `03-mongodb/dsa-tracker-backend`) — same purana Day 20 wala issue phir se aaya, MongoDB connection error ke saath. Confirm hamesha karo sahi folder se server chal raha hai.