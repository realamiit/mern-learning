# MERN Learning — All Mock Interview Answers (Day 1–6)

## Day 1 — Variables & Scope

**Q1: What is the difference between `let` and `const`?**
> A: `let` is used when the value needs to change in the future. `const` is used when the value is fixed and should never be reassigned. Example: `questionName` would be `let` (changes often), `userId` would be `const` (never changes).

**Q2: Why don't we use `var` anymore?**
> A: `var` does not respect block scope — it leaks outside the `{}` block it's declared in. This causes accidental overwrites and hard-to-find bugs in large codebases. `let` and `const` are block-scoped and prevent this.

**Q3: JavaScript is dynamically typed — what does that mean?**
> A: JavaScript automatically determines a variable's data type at runtime based on the value assigned — we never explicitly write `int`, `String`, etc. Example: `let x = 5` makes `x` a Number automatically.

**Q4: Is Node.js a programming language?**
> A: No. Node.js is a runtime environment built on Chrome's V8 engine. It lets JavaScript run outside the browser and adds capabilities like file access, networking, and database connections.

**Q5: What is NPM?**
> A: NPM (Node Package Manager) has 3 roles — it's an online registry (npmjs.com), an installer (downloads packages into a project), and a manager (tracks installed packages and their versions).

---

## Day 2 — Data Types

**Q1: How many primitive data types are there in JavaScript?**
> A: 7 — String, Number, Boolean, Null, Undefined, Symbol, and BigInt. In MERN development, mainly the first 5 are used.

**Q2: What is the difference between `null` and `undefined`?**
> A: `null` means the developer intentionally set the variable to empty, knowing a value will come later. `undefined` means a variable was declared but never assigned any value — it happens by default/accident. Example: `dueDate = null` (intentionally not set yet) vs `let reminderTime;` (forgot to assign).

**Q3: What does `typeof null` return and why?**
> A: It returns `"object"` — this is a well-known JavaScript bug that has existed since 1995. `null` is actually a primitive value, not an object. The correct way to check is `variable === null`.

**Q4: Output of this code?**
```javascript
let x;
const y = null;
console.log(typeof x);         // undefined
console.log(typeof y);         // object
console.log(x === undefined);  // true
console.log(y === null);       // true
```
> A: `undefined`, `object`, `true`, `true`

---

## Day 3 — Functions

**Q1: What is the difference between a Parameter and an Argument?**
> A: Parameter is the placeholder name used when defining a function. Argument is the actual value passed when calling that function.

**Q2: What does `return` do? How is it different from `console.log()`?**
> A: `return` sends a value out of the function so it can be used elsewhere, and stops further execution inside that function. `console.log()` only prints to the terminal — it doesn't send any value back.

**Q3: Convert to arrow function:**
```javascript
function multiply(a, b) {
    return a * b;
}
```
> A: `const multiply = (a, b) => a * b;`

**Q4: Output of this code?**
```javascript
function test() {
    let x = 5;
}
console.log(x);
```
> A: ReferenceError — `x` is scoped inside the function and not accessible outside.

**Q5: Function Declaration vs Arrow Function — basic difference?**
> A: Function Declaration uses the `function` keyword and is more verbose. Arrow Function uses `=>`, is shorter, and supports implicit return for single-line bodies.

---

## Day 4 — Arrays

**Q1: What is an Array?**
> A: A single variable that stores multiple values in an ordered list. In DSA Tracker, all question names are stored together in one array instead of creating a separate variable for each.

**Q2: Array indexing kis number se start hoti hai? `array[5]` agar exist na kare to kya hoga?**
> A: Indexing always starts from 0 across JS, Java, Python, C++. If an array has 5 elements, valid indexes are 0–4. Accessing an out-of-range index like `array[5]` does not throw an error — it returns `undefined`.

**Q3: `push()` vs `pop()`?**
> A: `push()` adds an element to the end of an array. `pop()` removes the last element. Both work on the end of the array.

**Q4: `console.log("Data:", arr)` vs `console.log("Data:" + arr)`?**
> A: Comma keeps the array as a separate argument — it prints with brackets, showing the real array structure. Plus forces string concatenation — the array becomes a comma-separated string with no brackets.

**Q5: What does `forEach` do?**
> A: `forEach` is a loop built specifically for arrays. It calls a given function once for every element. The callback's first parameter is the element's value, and the optional second parameter is its index.

---

## Day 5 — Objects

**Q1: What is an Object in JavaScript?**
> A: An object is a collection of key-value pairs. In DSA Tracker, a single question is stored as an object: `{ name: 'Two Sum', topic: 'Array', difficulty: 'Easy' }`.

**Q2: Array vs Object — when to use which?**
> A: Arrays require remembering index positions, which becomes impossible to track with 100+ items. Objects use named keys, so the data is self-explanatory — `question.name` is immediately clear, unlike `question[0]`.

**Q3: Can you change a property of a `const` object? Can you reassign the whole object?**
> A: Yes, properties can be changed (`question1.difficulty = 'Medium'`). No, the variable itself cannot be reassigned to a completely new object. `const` only locks the variable's reference, not the object's internal content.

**Q4: What happens if a key name doesn't match exactly when accessing?**
```javascript
const user = { userName: "Amit" };
console.log(user.username);  // lowercase 'n'
```
> A: It prints `undefined`, not an error — object key access is case-sensitive, and `username` doesn't match the actual key `userName`.

**Q5: What is "Array of Objects" and why is it used in DSA Tracker?**
> A: An Array of Objects is an array where each element is an object representing a complete record. In DSA Tracker, each question (with its name, topic, difficulty) is one object, and all questions are stored together in one array — making the data structured, scalable, and easy to loop through.

---

## Day 6 — Dates & Equality Operators

**Q1: `==` vs `===`?**
> A: `==` checks only the value and allows type conversion. `===` checks both value and type. Always prefer `===` to avoid unexpected bugs from automatic type conversion.

**Q2: What does `new Date()` return?**
> A: It returns a Date object representing the current date and time from the system clock, in ISO format: `YYYY-MM-DDTHH:MM:SS.sssZ`.

**Q3: Why is the function approach better than writing the same logic manually multiple times?**
> A: It reduces code duplication, improves maintainability (one place to fix bugs or change logic), and improves readability since the function name describes its purpose.

**Q4: What happens to `today` after passing it into a function that modifies a Date object?**
> A: Date objects are passed by reference in JavaScript. The function parameter and the outer variable point to the same memory location, so modifying the date inside the function also modifies the original variable outside.


# Mock Interview Revision — Day 7 & Day 8 (Node.js + Express.js)

## Day 7 — http Module & Request-Response Cycle

**Q1: Node.js mein `http` module use karne ke liye kya `npm install http` chalana padta hai? Reason bhi do.**

> Nahi, `http` module ke liye `npm install` ki zaroorat nahi hai, kyunki ye Node.js ka built-in module hai — Node.js install karte hi automatically available ho jata hai. Hum sirf `require('http')` likh kar import karte hain. `npm install` sirf external/third-party modules (jaise Express) ke liye chahiye, jo Node.js ke saath nahi aate.

---

**Q2: `createServer()` ke callback function mein `req` aur `res` — ye exactly kya represent karte hain, aur inka role kya hai?**

> `req` (request object) mein wo saari information hoti hai jo client ne server ko bheji hai — URL, method, headers. `res` (response object) ka use hum client ko data wapas bhejne ke liye karte hain, jaise `res.end()` se. Dono callback function ke parameters hain jo har incoming request par automatically trigger hota hai.

---

**Q3: Agar `server.listen(3000, ...)` ki jagah `server.listen(5000, ...)` likh do, to browser mein `http://localhost:3000` access karne par kya hoga?**

> Server crash nahi hoga — wo normally chalega, bas port 5000 par listen karega. Browser mein `http://localhost:3000` try karne par connection fail hoga (port 3000 par koi sun nahi raha), error jaisa "ERR_CONNECTION_REFUSED" dikhega.

---

**Q4: Agar `req.url === "/dashboard"` ki jagah `req.url = "/dashboard"` (sirf ek `=`) likh dete, to kya hota?**

> Hamesha "Yeh dashboard page hai!" print hoga, chahe URL kuch bhi ho — kyunki `=` comparison nahi karta, balki `req.url` ki value ko `/dashboard` se overwrite/assign kar deta hai. Assignment operation khud ek value return karta hai (jo string assign hui), aur non-empty string `if()` mein hamesha truthy hoti hai. Isliye condition hamesha true ban jata hai.

---

## Day 8 — Express.js Setup & Routing

**Q1: `express()` function kya return karta hai, aur uska kya use hai?**

> `express()` ek function hai jo call hone par ek `app` object return karta hai. Ye `app` object server ka control center hai — isi se routes define karte hain (`app.get()`, `app.post()`) aur server ko port par activate karte hain (`app.listen()`). `app.get()` `express()` ka part nahi hai — wo `app` object banne ke baad ek alag method call hai.

---

**Q2: `http` module ke `res.end()` aur Express ke `res.send()` mein basic difference kya hai?**

> Dono response complete karke client ko bhejte hain — is mamle mein similar hain. Lekin `res.send()` zyada flexible/smart hai kyunki automatically detect karta hai data kis type ka hai — string ho to text, object/array ho to automatically JSON format mein convert karke bhejta hai. `res.end()` raw string/buffer hi handle karta hai, automatic conversion nahi karta.

---

**Q3: Agar `/randomurl` jaisa route request ho jo kahi match nahi karta, to kya hoga?**

> Express automatically "Cannot GET /path" response bhej deta hai jab koi defined route match nahi hota — saath mein HTTP status code 404 (Not Found) jata hai. Server crash nahi hota, ye Express ka built-in fallback mechanism hai, manually code likhne ki zaroorat nahi.

---

**Q4: Jab tum server file mein code change karte ho, kya wo change automatically running server mein reflect ho jata hai? Reason do.**

> Nahi, automatically reflect nahi hota. Node.js file ko ek baar read karke memory mein load kar leta hai jab server start hota hai. Baad mein file change karne se running process ko pata nahi chalta. Naya code lagu karne ke liye server ko manually band karke (Ctrl+C) dobara start karna padta hai.

---

## Quick Recap — Key Terms

| Term | One-line |
|---|---|
| `http` module | Built-in, server banane ke liye |
| `req` / `res` | Request object / Response object |
| `server.listen(PORT)` | Server ko port par activate karta hai |
| `express()` | Returns `app` object |
| `app.get(path, callback)` | Route define karta hai |
| `res.send()` | Smart response — auto JSON conversion |
| 404 / "Cannot GET" | Unmatched route ka default Express response |
| Server restart | Code change ke baad zaroori — Node.js live-reload nahi karta |

---

## Day 9 — POST Method, Postman, Route Matching

**Q1: app.get() aur app.post() mein basic difference kya hai?**

> app.get() un routes ke liye use hota hai jaha client data fetch/retrieve karna chahta hai server se. app.post() un routes ke liye use hota hai jaha client server ko data bhejta hai, jaise koi naya record create/save karna. Dono Express ke methods hain jo HTTP method-specific routing karte hain - path same ho sakta hai, lekin method (GET vs POST) alag hone se alag callback trigger hoga.

---

**Q2: Agar /add-question route sirf app.post() se defined ho, aur koi GET request se usi path ko hit kare, to kya hoga?**

> 404 Not Found aayega, kyunki path match hua (/add-question) lekin method match nahi hua (GET vs defined POST). Express route ko match karne ke liye path aur method dono check karta hai. Response hoga "Cannot GET /add-question".

---

## Quick Recap Addition

| Term | One-line |
|---|---|
| app.post(path, callback) | POST requests ke liye route define karta hai |
| Postman | GET ke alawa POST/PUT/DELETE test karne ka tool (browser sirf GET bhej sakta hai) |
| Route matching | Path AUR method dono match hone chahiye, sirf path kaafi nahi |
| req.body | POST data access karne ke liye - express.json() middleware chahiye (upcoming topic) |


---

## Day 10 — express.json() Middleware, req.body

**Q1: express.json() middleware ka kaam exactly kya hai, aur agar missing ho to req.body mein kya aata hai?**

> express.json() ek built-in Express middleware hai jo incoming JSON data ko parse karke JavaScript object mein convert karta hai aur req.body mein daal deta hai. Agar ye middleware missing ho, req.body undefined aayega, chahe Postman se kuch bhi data bhej diya jaye.

---

**Q2: Express (capital) vs express (lowercase) - kis JavaScript rule ki wajah se error aata hai?**

> JavaScript case-sensitive hai - declare karte time jo naming (uppercase/lowercase) use ki, exactly wahi baad mein use karte time bhi likhni padti hai. Express aur express JavaScript ke liye completely alag identifiers hain.


---

## Day 11 — express.Router(), module.exports, require() paths

**Q1: module.exports = router; line kyun zaroori hai? Missing ho to kya hoga?**

> JavaScript mein har file by default isolated/private hoti hai - ek file ke variables doosri file ko automatically nahi dikhte. module.exports se explicitly batate hain ki kya share karna hai. Missing ho to require() se empty object {} milega, router jaisa kaam nahi karega, app.use() mein error/unexpected behavior aayega.

---

**Q2: require("./questionRoutes") mein ./ kyun hai, require("express") mein nahi?**

> "./" ka matlab hai relative path - current folder mein khud ki banayi file dhoondo. Bina "./" ke, Node.js node_modules folder mein installed external package dhoondta hai.


---

## Day 12 — MongoDB Connection, process.env, Async (.then/.catch)

**Q1: process.env.MONGO_URI ka kaam exactly kya hai, value kaha se aati hai?**

> process.env Node.js ka built-in object hai jisme environment variables store hoti hain. .env file (text file) mein likhi gayi value ko dotenv.config() padhta hai, KEY=VALUE pattern todta hai, aur process.env object mein ek nayi property bana deta hai. Code mein process.env.MONGO_URI likhne se wo value mil jati hai.

---

**Q2: .then()/.catch() kyun use kiya, if/else kyun nahi mongoose.connect() ke saath?**

> mongoose.connect() asynchronous hai - internet ke through MongoDB se connect hone mein time lagta hai. if/else synchronous check hai, turant result chahiye hota hai, lekin connection process complete hone se pehle koi result hota hi nahi check karne ke liye. .then()/.catch() JavaScript ko batata hai ki jab bhi result aaye, success/fail handle karo, bina code ko block kiye.


---

## Day 13 — Mongoose Schema, Model, .save()

**Q1: new Question({...}) aur Question.save() alag steps kyun hain?**

> new Question({...}) sirf memory mein object banata hai - database mein kuch save nahi hota. .save() actually MongoDB ko bolta hai object ko permanently likhne ke liye. Analogy: new Question() = form bharna, .save() = form submit karna.

---

**Q2: require("./db") missing hone se "buffering timed out" error kaise aaya?**

> require("./db") missing tha, isliye db.js ka code kabhi execute nahi hua - MongoDB connection process kabhi shuru hi nahi hua. Jab .save() call hua POST request par, Mongoose ne connection dhoonda, nahi mila, 10 second wait kiya (timeout), aur error diya.

---

## Day 14 — Model.find(), MongoDB Flexibility

**Q1: Question.find() vs Question.find({topic: "Arrays"}) - difference?**

> find() bina filter ke saare documents deta hai. find({topic: "Arrays"}) sirf un documents ko return karta hai jinka topic field "Arrays" ho - lekin pura document milta hai dono cases mein, sirf list ki length filter ke hisaab se badalti hai.

---

**Q2: Agar sirf 1 document mein difficulty field ho, find({difficulty: "Medium"}) kya return karega?**

> Sirf wahi document(s) jinka difficulty field exactly match kare. Jin documents mein wo field absent hai, wo automatically exclude ho jate hain match na hone ki wajah se.


## Day 15 — Spaced Repetition, $lte Operator

**Q: Spaced repetition mein "due" question kaise identify karte hain MongoDB mein?**

> Pehle aaj ki date se 3 din pehle ki date calculate karte hain (new Date() + setDate(getDate() - 3)). Phir Question.find({ dateAdded: { $lte: threeDaysAgo } }) se sirf wahi documents milte hain jinka dateAdded threeDaysAgo se chhota ya equal ho — matlab jo questions 3 din pehle ya usse pehle add hue the, unka revision due hai.


## Day 16 — .toObject(), .map(), Revision Dates

**Q1: .toObject() kyun use kiya?**
> Mongoose document mein sirf schema-defined fields allowed hoti hain. .toObject() se plain JavaScript object banta hai jisme freely naye fields (jaise due3, due7) add kar sakte hain.

**Q2: .map() ka kaam kya tha is route mein?**
> .map() array ke har element pe ek function chalata hai aur transformed elements ka naya array return karta hai. Yahan har question ko .toObject() se convert kiya, due3 date calculate karke add ki, aur naya array return kiya.


## Day 17 — React Basics, JSX, useState

**Q1: useState mein [count, setCount] do alag cheezein kyun return karta hai?**
> Read aur write separate rakhna zaroori hai. count sirf current value padhne ke liye hai (directly change nahi kar sakte). setCount value change karne ka authorized tarika hai — jab call hota hai, React ko pata chalta hai UI re-render karna hai. Direct assignment se React ko pata nahi chalta ki state badli.

---

**Q2: JSX kya hai — normal HTML se kya alag hai?**
> JSX (JavaScript XML) ek syntax extension hai jo JS file mein HTML jaisa code likhne deta hai. Normal HTML static hota hai. JSX mein {} curly braces se JavaScript expressions directly embed kar sakte hain (jaise {count}), isliye UI dynamically state ke saath automatically update hoti hai.


## Day 18 Mock Interview

**Q1: useEffect mein [] kyun diya?**
> Amit's answer: "pehli baar browser mein jaate hain to pehli baar dikhta hai, sirf ek baar render hone pe"
> Polished answer: "[] empty array isliye diya kyunki sirf ek baar chalana chahte hain — jab component pehli baar render ho (page load pe). Bina [] ke har re-render pe chalega (infinite loop risk). [value] dene se us value ke change hone pe chalega."

**Q2: CORS error kyun aaya?**
> Amit's answer: "browser ka security rule hai, ek request se dusri request ko block karta hai, CORS = Cross-Origin Resource Sharing"
> Polished answer: "CORS browser ka security rule hai jo alag origins (different port/domain) ke beech requests block karta hai. React (5173) se Express (3000) pe request bhejne pe browser ne block kiya. Fix: npm install cors + app.use(cors()) Express mein."




## Day 19 Mock Interview

**Q1: onChange mein `e` aur `e.target.value` kya hai?**
> Amit's answer: "e variable hai, e.target.value se value set ho rahi hai"
> Polished answer: "`e` event object hai jo browser bhejta hai — us event ki info contain karta hai. `e.target` wo input element hai. `e.target.value` us input ka current text value hai jo user ne type kiya."

**Q2: JSON.stringify() kyun use kiya?**
> Amit's answer: "json format se string format mein convert karna tha"
> Polished answer: "fetch() body mein sirf string bhej sakta hai. JSON.stringify() JS object ko JSON string mein convert karta hai. Backend mein express.json() middleware use string ko wapas JS object mein convert karta hai."

### Pura cycle: JS Object → JSON.stringify() → String → Network → express.json() → JS Object


---

## Day 20 — Due Questions Dashboard

**Q1: `useState({...})` ke andar `prev` kyun nahi likh sakte?**
- **Answer:** `prev` state ke current/existing value ka reference hai — sirf update ke time valid. `useState(...)` state create karta hai, is point pe koi existing state hai hi nahi, isliye `prev` invalid.

**Q2: Agar spread operator hata ke sirf `{due3: data}` likhen, toh due7/due15/due30 ka kya hoga?**
- **Answer:** React setState merge nahi karta, poora replace karta hai. `due7`, `due15`, `due30` **undefined ho jayenge** — "vaise hi" nahi rahenge.

**Q3: 4 alag useEffect vs 1 useEffect mein 4 fetch — performance farak?**
- **Answer:** Performance mein koi farak nahi — sab parallel chalte hain (dependency array `[]`). Farak sirf code organization aur fault isolation ka hai.

**Q4: `.map()` mein `key` prop kyun zaroori hai?**
- **Answer:** React ko list item ki identity batata hai, taaki re-render pe efficiently track ho sake kya add/update/delete hua.

**Q5: CORS error kyun aaya, kaha fix hota hai?**
- **Answer:** `Access-Control-Allow-Origin` header missing tha backend response mein. `cors` package ka `app.use(cors())` main server file mein add karke fix hota hai.