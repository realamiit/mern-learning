# Day 18 - useEffect, fetch(), CORS

## Definitions

| Term | Matlab |
|---|---|
| useEffect | React Hook jo component render hone ke baad code chalata hai |
| [] dependency array | useEffect ko control karta hai — kab chalega |
| fetch() | Browser ka built-in function jo HTTP request bhejta hai |
| CORS | Cross-Origin Resource Sharing — browser security rule jo alag origins ke beech requests block karta hai |
| cors package | Express mein npm package jo CORS allow karta hai |

## Concept Notes

### useEffect ke teen cases
```jsx
useEffect(() => {...})           // har render pe ⚠️
useEffect(() => {...}, [])       // sirf ek baar (page load) ✅
useEffect(() => {...}, [count])  // count change hone pe ✅
```

### Data fetch karne ka pattern
```jsx
const [questions, setQuestions] = useState([])

useEffect(() => {
  fetch('http://localhost:3000/questions')
    .then((res) => res.json())
    .then((data) => setQuestions(data))
}, [])
```

### JSX mein list render karna
```jsx
<ul>
  {questions.map((q) => (
    <li key={q._id}>
      {q.questionName} — {q.topic} — {q.difficulty}
    </li>
  ))}
</ul>
```

### CORS fix
```bash
npm install cors
```
```javascript
const cors = require("cors");
app.use(cors()); // express-server.js mein add karo
```

## Confusion Box

| Question | Answer |
|---|---|
| useEffect mein [] kyun? | Sirf ek baar (page load pe) chalane ke liye. Bina [] ke har re-render pe chalega |
| CORS error kyun aaya? | Browser security rule — alag ports (5173 vs 3000) ke beech requests block hoti hain by default |

## Mistake Box

| Mistake | Correction |
|---|---|
| `question` likha `questions` ki jagah | Variable naam exact match hona chahiye — `questions` (plural) use kiya tha useState mein |

## Mock Interview

**Q1: useEffect mein [] kyun diya?**
- Amit's answer: "pehli baar browser mein jaate hain to pehli baar dikhta hai, sirf ek baar render hone pe"
- Polished answer: "[] empty array isliye diya kyunki sirf ek baar chalana chahte hain — jab component pehli baar render ho (page load pe). Bina [] ke har re-render pe chalega (infinite loop risk). [value] dene se us value ke change hone pe chalega."

**Q2: CORS error kyun aaya?**
- Amit's answer: "browser ka security rule hai, ek request se dusri request ko block karta hai, CORS = Cross-Origin Resource Sharing"
- Polished answer: "CORS browser ka security rule hai jo alag origins (different port/domain) ke beech requests block karta hai. React (5173) se Express (3000) pe request bhejne pe browser ne block kiya. Fix: npm install cors + app.use(cors()) Express mein."

## Syntax Reference Card

```jsx
// useEffect — page load pe ek baar
useEffect(() => {
  fetch('http://localhost:3000/questions')
    .then((res) => res.json())
    .then((data) => setQuestions(data))
}, [])

// JSX list rendering
{questions.map((q) => (
  <li key={q._id}>{q.questionName}</li>
))}
```

```javascript
// Express mein CORS fix
const cors = require("cors");
app.use(cors());
```