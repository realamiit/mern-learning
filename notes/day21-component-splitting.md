# Day 21 — Component Splitting (Props, Export/Import)

## Concepts Covered

**Component Splitting** — UI ke logical hisson ko alag-alag chote reusable components mein todna, taaki code readable, maintainable, aur reusable rahe.

**Props (Properties)** — data jo ek component ko bahar se (parent component se) milta hai, jaise HTML attributes. Props read-only hote hain — component khud apne props ko change nahi kar sakta.

**Destructuring in props** — `({ questions, title, onDelete })` — seedha props object se values nikaal lena, baar baar `props.` likhne ke bajaye.

**Default Export** — `export default ComponentName` — file se sirf ek cheez default export hoti hai; import karte waqt curly braces nahi lagte, naam kuch bhi rakh sakte ho.

**Named Export** — `export { ComponentName }` — file se multiple named exports ho sakte hain; import karte waqt exact naam match karna padta hai, curly braces zaroori hain.

**DRY Principle (Don't Repeat Yourself)** — same code baar baar likhne ke bajaye, ek reusable jagah banana jahan se sab use ho sake.

---

## Syntax Reference Card

```javascript
// 1. Reusable component with props (DueSection.jsx)
const DueSection = ({ questions, title, onDelete }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            {q.questionName} — {q.topic} — {q.difficulty}
            <button onClick={() => onDelete(q._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DueSection

// 2. Import in App.jsx (default import — no curly braces)
import DueSection from './DueSection'

// 3. Using the component 4 times with different props
<DueSection questions={dueQuestions.due3} title="Due in 3 days" onDelete={deleteQuestion} />
<DueSection questions={dueQuestions.due7} title="Due in 7 days" onDelete={deleteQuestion} />
<DueSection questions={dueQuestions.due15} title="Due in 15 days" onDelete={deleteQuestion} />
<DueSection questions={dueQuestions.due30} title="Due in 30 days" onDelete={deleteQuestion} />
```

---

## Confusion Boxes (Questions Amit Asked)

**Q: Component ko bahar se data kaise milta hai?**
A: **Props** ke through — HTML attribute jaisा syntax (`<DueSection questions={...} title="..." />`), component function ke parameter mein destructure karke access hota hai.

**Q: 4 baar same component use karne se messy nahi ho jayega kya?**
A: Ulta — **saaf hota hai**. Pehle jo ~35-40 lines ka repeated JSX tha (due3/due7/due15/due30 alag-alag manually likhe), ab sirf 4 clean lines mein sab render ho jaata hai — ek hi jagah (`DueSection.jsx`) mein structure define hai, sirf props alag pass ho rahe hain.

**Q: `.then()` vs `async/await` mein farak kya hai?**
A: Dono Promises handle karte hain, bas syntax alag hai. `.then()` callback chain hai; `async/await` synchronous jaisa dikhne wala style hai jisme `await` ka matlab hai "Promise resolve hone tak ruk jao". Function ko `async` keyword se mark karna zaroori hai agar uske andar `await` use karna ho.

---

## Mistake Boxes (Actual Mistakes Amit Ne Kiye)

**Mistake 1:** Ek hi component naam se do baar declare kiya:
```javascript
// GALAT
function DueSection({ questions, title, onDelete})   // adhoora, body missing
const DueSection = () => {...}                        // dusra declaration, props missing
```
**Fix:** Sirf ek declaration honi chahiye, props usi mein liye jaate hain jahan actual function body ho.

**Mistake 2:** `.map()` galat variable pe call kiya:
```javascript
// GALAT
{onDelete.map((q) => (...))}   // onDelete ek function hai, array nahi
```
**Fix:** `.map()` sirf array pe chalta hai — `questions.map(...)` use karna tha, `onDelete` sirf button ke `onClick` mein call hona chahiye tha.

**Mistake 3:** Reusable component (`DueSection.jsx`) ke andar hi purane due7/due15/due30 wale hardcoded blocks copy-paste kar diye — poora concept ulta ho gaya:
```javascript
// GALAT — DueSection.jsx ke andar
<h2>Due in 3 Days</h2>   // hardcoded, {title} use nahi kiya
{questions.map(...)}
<h2 onClick={showDue7Questions}>Due in 7 days</h2>   // ye yahan bilkul nahi hona chahiye
{dueQuestions.due7.map(...)}
```
**Fix:** `DueSection.jsx` sirf **ek generic structure** rakhega (`{title}`, `{questions}` props se), koi due7/due15/due30 ka hardcoded mention nahi. Multiple due sections `App.jsx` mein 4 alag `<DueSection ... />` calls se banenge.

**Mistake 4:** State variable naam mein typo — `dueQuestions` ki jagah `DueSections` likh diya (capital D, S, plural):
```javascript
// GALAT
questions={DueSections.due7}
```
**Fix:** Exact variable naam match karna zaroori hai — `dueQuestions.due7`.

**Mistake 5:** Import path galat assume kiya:
```javascript
// GALAT — file components/ folder mein nahi thi
import DueSection from './components/DueSection'
```
**Fix:** File `src/` mein seedhe thi, isliye sahi path `./DueSection` tha (bina `components/` ke). Hamesha actual file location confirm karo VS Code sidebar mein, path assume mat karo.

**Mistake 6:** Undefined functions (`showDue3Questions` etc.) `onClick` mein use kiye bina banaye — crash ka risk tha jab tak hataya nahi gaya.
**Fix:** Koi bhi function use karne se pehle confirm karo wo defined hai ya nahi (Ctrl+F se search karke).

---

## Mock Interview — Day 21

**Q1: Props kya hote hain, useState se kaise alag hain?**
- **Amit ka answer:** "Props ek bundle hai useState se alag hai is tarah hai kyuki" (incomplete)
- **Polished answer:** Props — data jo component ko **bahar se (parent se)** milta hai, **read-only** hota hai. `useState` — data jo component **khud apne andar manage** karta hai aur **khud change** kar sakta hai. Core farak: props external hai (parent control karta hai), state internal hai (component khud control karta hai).

**Q2: `export default` vs `export { }` mein farak?**
- **Amit ka answer:** "Dono ek dusre ke purak hain, syntax alag thoda sa" ❌ **Galat**
- **Polished answer:** Ye do **competing tarike** hain (ek saath use nahi hote, alag-alag scenario ke liye). `export default` — file se ek hi default export, import mein koi bhi naam rakh sakte ho, curly braces nahi. `export { Name }` — named export, multiple ho sakte hain ek file se, import mein exact naam match karna zaroori, curly braces lagti hain.

**Q3: Agar prop naam mismatch ho (`title` pass kiya, `heading` expect kiya) toh kya hoga?**
- **Amit ka answer:** "Crash ho jata" ⚠️ **Directionally sahi, incomplete**
- **Polished answer:** Crash **nahi** hota seedha — jo prop mismatch hai (`heading`) wo React mein **`undefined`** ban jaata hai, screen par sirf **khaali** dikhta hai us jagah, koi error nahi aata. Crash sirf tab hota agar `.map()` jaise method ko `undefined` array pe call kiya jaye.

**Q4: Component splitting ka fayda is project ke context mein?**
- **Amit ka answer:** "No idea" (khud bataya)
- **Polished answer:** (1) Repetition khatam — 35-40 lines se 4 lines mein aa gaya. (2) Single source of truth — ek jagah fix karo, sab jagah update ho jaata hai. (3) Readability — App.jsx chota, samajhne mein aasan. (4) Scalability — naya due section add karna ho toh sirf ek naya `<DueSection ... />` call likhna hai.

**Score: 1/4 fully correct direction (Q3), 3/4 need clear revision — especially Q1, Q2, Q4. Concept revise karna zaroori hai agle session se pehle.**