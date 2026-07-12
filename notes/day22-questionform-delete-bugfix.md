# Day 22 — QuestionForm Component + Delete Bug Fix

## Concepts Covered

**Props with State Connection** — jab ek component ko sirf data display nahi karna, balki parent ke state ko update bhi karna ho, tab dono cheezein props ke through jaati hain: current value (jaise `questionName`) aur update function (jaise `setQuestionName`).

**Function as Prop** — functions bhi props ki tarah pass ho sakte hain (jaise `handleSubmit`, `onDelete`). Component andar sirf us function ko call karta hai; actual logic parent (jahan function bana) mein hota hai.

**Parallel Fetch Calls vs Sequential Chain** — jab multiple fetch calls ek doosre pe dependent nahi hote, unhe parallel likhna chahiye (alag-alag `.then()` chains, ek `.then()` block ke andar), na ki ek lambi sequential `.then()` chain mein — parallel calls fast aur zyada readable hote hain.

**Route Prefix Consistency** — Express Router jab `app.use("/questions", router)` se mount hota hai, andar ke saare routes (`/due3` etc.) ka actual path `/questions/due3` ban jaata hai. Har jagah (frontend fetch calls) yehi poora prefixed path use karna zaroori hai, warna 404 error aata hai.

---

## Syntax Reference Card

```javascript
// 1. QuestionForm.jsx — component jo state + setter function dono le raha hai props se
const QuestionForm = ({ questionName, setQuestionName, topic, setTopic, difficulty, setDifficulty, handleSubmit }) => {
  return (
    <div>
      <input placeholder="Question Name" value={questionName} onChange={(e) => setQuestionName(e.target.value)} />
      <input placeholder="Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
      <input placeholder="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
      <button onClick={handleSubmit}>Add Question</button>
    </div>
  )
}
export default QuestionForm

// 2. App.jsx mein use karna
<QuestionForm
  questionName={questionName}
  setQuestionName={setQuestionName}
  topic={topic}
  setTopic={setTopic}
  difficulty={difficulty}
  setDifficulty={setDifficulty}
  handleSubmit={handleSubmit}
/>

// 3. deleteQuestion — parallel refresh of all 5 lists after delete
const deleteQuestion = (id) => {
  fetch(`http://localhost:3000/questions/${id}`, { method: "DELETE" })
    .then(() => {
      fetch("http://localhost:3000/questions").then((res) => res.json()).then((data) => setQuestions(data));
      fetch("http://localhost:3000/questions/due3").then((res) => res.json()).then((data) => setDueQuestions(prev => ({...prev, due3: data})));
      fetch("http://localhost:3000/questions/due7").then((res) => res.json()).then((data) => setDueQuestions(prev => ({...prev, due7: data})));
      fetch("http://localhost:3000/questions/due15").then((res) => res.json()).then((data) => setDueQuestions(prev => ({...prev, due15: data})));
      fetch("http://localhost:3000/questions/due30").then((res) => res.json()).then((data) => setDueQuestions(prev => ({...prev, due30: data})));
    })
    .catch((err) => console.error("Delete Error:", err));
};
```

---

## Confusion Boxes (Questions Amit Asked)

**Q: Props kya hote hain, depth mein samjhao?**
A: Props ek component ko **bahar se (parent se)** data dene ka tarika hai — HTML attribute jaisa syntax. Component function ek `props` object leta hai (ya destructure karke `{name, value}` jaisa), aur jab bhi component use hota hai (`<Component name="X" />`), React automatically wo values pass kar deta hai.

**Q: Function bhi prop ho sakta hai kya?**
A: Haan — jaise `onDelete={deleteQuestion}` ya `handleSubmit={handleSubmit}`. Component andar sirf usko **call** karta hai (`onClick={() => onDelete(q._id)}`), lekin actual logic wahi hai jo parent mein likha gaya function.

**Q: Ek hi component 3 baar alag props se call karna vs 3 alag component tags mein alag props dena — kya farak hai?**
A: Agar tujhe **ek hi form** chahiye jisme saari fields ek saath hon, toh **ek hi component tag** mein saare props ek saath dene hain. 3 alag `<Component />` tags likhna 3 **alag copies** banayega — galat agar ek hi form banana ho.

---

## Mistake Boxes (Actual Mistakes Amit Ne Kiye)

**Mistake 1:** Naye component (`QuestionForm`) ka istemal galat kiya — pehle `DueSection` component ka naam use kar diya galti se:
```javascript
// GALAT
<DueSection questionName={setQuestionName} title="..." onDelete={...} />
```
**Fix:** Sahi component naam (`QuestionForm`) use karna, aur prop naam vs value ka sahi pairing rakhna (`questionName={questionName}`, function ki jagah state value pass nahi karni).

**Mistake 2:** Ek hi form ke liye 3 alag `<QuestionForm />` tags likh diye (alag-alag props ke saath) — isse 3 alag forms bante, ek nahi:
```javascript
// GALAT
<QuestionForm questionName={questionName} setQuestionName={setQuestionName} />
<QuestionForm topic={topic} setTopic={setTopic} />
<QuestionForm difficulty={difficulty} setDifficulty={setDifficulty} />
```
**Fix:** Ek hi `<QuestionForm />` tag mein saare 7 props ek saath dene the.

**Mistake 3:** Destructuring mein typo — `setTopic` ki jagah `srtTopic` likh diya, jabki JSX mein `setTopic` use ho raha tha. Isse `ReferenceError` aata.
**Fix:** Destructuring aur JSX mein prop ka naam **exact match** hona chahiye.

**Mistake 4 (Bada Bug):** `deleteQuestion` function mein sirf `questions` state refresh ho raha tha, `dueQuestions` (due3/7/15/30) nahi — isliye Due sections turant update nahi hote the, sirf manual page refresh pe update dikhte the.
**Fix:** `deleteQuestion` ke andar 4 extra parallel fetch calls add kiye — `due3`, `due7`, `due15`, `due30` ke liye, sabko `setDueQuestions` (spread operator ke saath) se update karke.

**Mistake 5:** Naye fetch calls mein galat/adhoora URL likha — `/due3` (bina prefix ke), jabki actual route `/questions/due3` tha (Express Router prefix ki wajah se). Isse 404 error aata tha, aur `dueQuestions` state kabhi update hi nahi hoti thi.
**Fix:** Saare 4 URLs mein `/questions` prefix add kiya — `useEffect` mein jo pehle se sahi URL tha, wahi pattern follow kiya.

---

## Debugging Process Jo Aaj Follow Kiya (Important Learning)

1. **Symptom notice kiya:** Delete turant reflect nahi ho raha, sirf refresh pe dikhta hai
2. **Galat guess clear kiya:** Socha ki All Questions se bhi delete ho raha hai wo bug hai — actually wo **sahi hai** (same document dono jagah dikhta hai, delete hone pe dono se hatna chahiye)
3. **`console.log` add kiya** debug karne ke liye, dekhne ke liye kya data aa raha hai
4. **Network tab check kiya** — 404 errors mile saare 4 due routes pe
5. **Root cause trace kiya** — galat/incomplete URL (prefix missing) — same jaisa Day 20 ka bug tha
6. **Fix kiya aur confirm kiya** — turant update ab kaam kar raha hai

**Key learning:** Jab UI expected behavior nahi de raha, **Network tab** aur **console.log** dono use karke systematically debug karna — guess karke seedha fix karne ki koshish na karna.