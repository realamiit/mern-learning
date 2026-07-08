# Day 20 — Due Questions Dashboard (React + Object State)

## Concepts Covered

**useState** — full form: "use State" — React hook jo component ke andar changeable data store karta hai.

**useEffect** — full form: "use Effect" — React hook jo component render hone ke baad side-effects (jaise API calls) run karta hai.

**Spread Operator (`...`)** — ek JavaScript syntax jo object/array ke saare existing elements ko copy karke naye object/array mein daal deta hai.

**Object State Pattern** — multiple related values (due3, due7, due15, due30) ko ek hi state object mein rakhna, alag-alag `useState` variables ke bajaye.

**`.map()`** — array method jo har element pe function chalakar naya transformed array return karta hai — React mein JSX list render karne ke liye use hota hai.

**`key` prop** — React ko unique identifier deta hai har list item ke liye, taaki efficiently track ho sake kaunsa item add/update/delete hua.

**CORS (Cross-Origin Resource Sharing)** — browser security policy jo alag origin (port/domain) se aane wali requests ko block karti hai jab tak server explicitly allow na kare.

---

## Syntax Reference Card

```javascript
// 1. Object state declaration — sirf defaults, koi prev nahi
const [dueQuestions, setDueQuestions] = useState({
  due3: [], due7: [], due15: [], due30: []
});

// 2. useEffect + partial state update via spread
useEffect(() => {
  fetch('http://localhost:3000/questions/due3')
    .then((res) => res.json())
    .then((data) => {
      setDueQuestions(prev => ({ ...prev, due3: data }));
    });
}, []);

// 3. Rendering list with .map() + key
<ul>
  {dueQuestions.due3.map((q) => (
    <li key={q._id}>{q.questionName}</li>
  ))}
</ul>
```

---

## Confusion Boxes (Questions Amit Asked)

**Q: `useState` ke andar `prev => ({...prev, due3: data})` kyun likh sakte, jab initial value set kar rahe hote hain?**
A: `prev` sirf tab valid hai jab state **update** ho rahi ho. `useState(...)` ke andar state **create** ho rahi hai — abhi tak koi "previous version" exist hi nahi karta, isliye `prev` likhna invalid syntax hai.

**Real-world example diya gaya:** Naya bank account khulte waqt "starting balance ₹0" likhte hain, "purane balance mein ₹500 add karke" nahi likh sakte — kyunki account abhi bana hi nahi hai. Wahi logic `useState` (account opening) vs `setState` (transaction/update) pe apply hota hai.

**Q: Agar `...prev` object mein pehle likhen aur overwrite key baad mein likhen, toh order se farak padta hai kya?**
A: Haan — JavaScript object mein same key do baar ho toh **jo baad mein likhi jaati hai wahi final value** banti hai. Isliye hamesha `{...prev, due3: data}` (spread pehle, overwrite baad mein) likhna hai, ulta nahi.

---

## Mistake Boxes (Actual Mistakes Amit Ne Kiye)

**Mistake 1:** `useState` ke initial value ke andar hi `prev => ({...prev, due3: data})` pattern likh diya:
```javascript
// GALAT
const [dueQuestions, setDueQuestions] = useState({
  due3: ([...prev, due3: data])[],
  ...
});
```
**Fix:** `useState` mein sirf defaults (`due3: []`), `prev` wala update pattern sirf `setDueQuestions(prev => ...)` call ke andar likhna hai — alag jagah.

**Mistake 2:** Field name galat likha — `q.questions` ya `q.question` likha, jabki Mongoose Schema mein field ka actual naam `questionName` hai.
**Fix:** Hamesha Schema file check karke exact field name confirm karna, guess nahi karna.

**Mistake 3:** `.map()` calls `return(...)` JSX ke **bahar**, component function body mein direct likh diye — wo kabhi render nahi hote (dead code).
**Fix:** Saara JSX (including `.map()`) sirf `return(...)` ke andar hona chahiye. Component structure: (1) state/useEffect/functions upar, (2) sirf JSX `return()` ke andar, koi declaration wahan nahi.

**Mistake 4:** Galat folder se server run kiya — `02-nodejs/practice` (purana raw `http` module practice) chalu tha, `03-mongodb/dsa-tracker-backend` (actual Express+MongoDB server) ki jagah. Isse `/due3` route "Cannot GET" error deta raha.
**Fix:** Hamesha confirm karo kaunsi terminal/folder se server chal raha hai — console log messages se pehchano (purana server ka apna distinct log tha "Request aayi is Url par").

**Mistake 5:** CORS middleware (`cors` package) `server.js` mein missing tha naye backend mein, jiski wajah se saare fetch calls browser mein CORS error se block ho rahe the.
**Fix:** `app.use(cors())` add karna Express app setup mein, routes define hone se pehle.

---

## Mock Interview — Day 20

**Q1: `useState({...})` ke andar `prev` kyun nahi likh sakte?**
- **Amit ka answer:** "Kyuki iske andar hume spread nahi karna, ye already exist karta hai isliye hume isko spread karne ki zarurat nahi, prev sirf tab valid hai jab update ho raha ho na ki jab create ho raha ho."
- **Polished answer:** `prev` React ka convention hai state ke **current/existing value** ko reference karne ke liye update ke time. `useState(...)` call state ko **pehli baar create** karta hai — is point pe koi "existing state" hai hi nahi jiska reference liya ja sake, isliye `prev` yahan syntactically aur logically invalid hai.

**Q2: Agar spread operator hata ke sirf `{due3: data}` likhen, toh due7/due15/due30 ka kya hoga?**
- **Amit ka answer:** "Data spread nahi hoga matlab open hi nahi hoga, due7,15,30 vaise hi reh jayenge." ❌ **Galat**
- **Polished answer:** React ka `setState` **merge nahi karta, poora replace karta hai**. `setDueQuestions({due3: data})` poore object ko replace kar dega — matlab `due7`, `due15`, `due30` **`undefined` ho jayenge**, "vaise hi" bilkul nahi rahenge. Spread operator (`...prev`) hi purane keys ko preserve karta hai naye object mein copy karke.

**Q3: 4 alag useEffect vs 1 useEffect mein 4 fetch — performance farak?**
- **Amit ka answer:** "Ha kyuki sabke alag-alag work hain useEffect ke thats why hum different-2 time likhte hain." ⚠️ **Incomplete**
- **Polished answer:** **Performance mein koi farak nahi padta** — dono approach mein saari fetch calls **parallel** hi trigger hongi (kyunki sabka dependency array `[]` hai, sab mount ke time chalengi). Farak sirf **code organization aur fault isolation** ka hai — 4 alag `useEffect` mein agar ek fail ho, baaki teen independently kaam karte rahenge.

**Q4: `.map()` mein `key` prop kyun zaroori hai?**
- **Amit ka answer:** "Kyuki React mein har element ko ek unique key deni padti hai, taki React efficiently track kar sake kaun sa item update/add/delete hua ye sab dekhne ke liye use hota hai."
- **Polished answer:** ✅ Sahi hai — `key` React ko batata hai list ke har item ki **identity**, taaki re-render ke time React efficiently pata laga sake kya add/remove/reorder hua, bina poori list ko dobara banaye.

**Q5: CORS error kyun aaya, kaha fix hota hai?**
- **Amit ka answer:** "CORS error is liye aa raha tha kyuki mere code mein define hi nahi kiya tha, isko express-server.js mein rakhte hain."
- **Polished answer:** ✅ Sahi direction — CORS error isliye aaya kyunki backend response mein `Access-Control-Allow-Origin` header missing tha, jo `cors` npm package ke `app.use(cors())` se add hota hai. Ye setup **main server file** (jahan Express app banta hai, jaise `server.js`) mein, routes mount hone se pehle likha jaata hai.

**Score: 3/5 fully correct (Q1, Q4, Q5), 2/5 need revision (Q2, Q3) — especially Q2, jo core spread-operator concept hai.**