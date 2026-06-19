# Day 2 — JavaScript Data Types

## 📌 Concepts Covered

| Term | Full Form | Definition |
|---|---|---|
| String | — | Text data — written inside quotes |
| Number | — | Both integers and decimals — single type in JS |
| Boolean | — | Only 2 values — `true` or `false` |
| Null | — | Developer intentionally set the value as empty |
| Undefined | — | A variable was declared but never assigned a value |
| `typeof` | Type Of | Operator that returns the data type of a variable |
| Primitive Type | — | The basic, built-in data types in JavaScript |
| Symbol | — | Unique identifier type — advanced/rare use |
| BigInt | — | Used for numbers larger than the safe Number limit |

---

## 💻 Syntax Reference Card

\`\`\`javascript
// 6 Main Data Types
const name = "Amit";          // String  — text
const age = 20;                // Number  — integer
const price = 85.5;            // Number  — decimal
const isSolved = true;         // Boolean — true/false
const dueDate = null;          // Null    — intentionally empty
let lastDate;                  // Undefined — accidentally empty

// Type Check
typeof "Amit"          // "string"
typeof 20               // "number"
typeof true             // "boolean"
typeof null             // "object"   ← JS bug!
typeof undefined        // "undefined"

// Correct way to check for null/undefined
variable === null        // ✅ use this, not typeof
variable === undefined   // ✅ correct
\`\`\`

---

## ❓ Confusion Box

| Question | Answer |
|---|---|
| `typeof null` `"null"` kyun nahi return karta? | 1995 ka JavaScript bug — `null` ko internally object ki tarah store kiya gaya tha, aaj tak fix nahi hua. |
| `null` ko sahi se kaise check karein? | `variable === null` use karo, `typeof` use mat karo null ke liye. |
| `const` ko khaali (without value) kyun nahi declare kar sakte? | `const` = constant — agar abhi value nahi di aur baad mein doge, toh value "change" hogi, jo `const` ke against hai. |

---

## ❌ Mistake Box (Actual Mistakes Made)

| Mistake | Correction |
|---|---|
| `const lastRevisionDate;` likha (no value) | `const` ko declare karte waqt value zaroori hai — `let lastRevisionDate;` use karo |
| Primitive datatypes 4 bole | Actually 7 hain — String, Number, Boolean, Null, Undefined, Symbol, BigInt |
| `null` ka matlab ulta samjha — "baad mein nahi rakhte" | `null` = intentionally empty — developer ne khud set kiya, future mein value aane ki ummeed hai |
| `y === null` ka answer `false` bola jab `y` ko `null` assign kiya tha | `y = null` tha, isliye `y === null` → `true` |
| File naam `datatype.js` rakha (extra "s" missing) | Consistency ke liye file naming exact honi chahiye |

---

## 🎤 Mock Interview — Record

**Q1: How many primitive data types are there in JavaScript?**
> A: 7 — String, Number, Boolean, Null, Undefined, Symbol, and BigInt. In MERN development, mainly the first 5 are used.

**Q2: What is the difference between `null` and `undefined`?**
> A: `null` means the developer intentionally set the variable to empty, knowing a value will come later. `undefined` means a variable was declared but never assigned any value — it happens by default/accident. Example: `dueDate = null` (intentionally not set yet) vs `let reminderTime;` (forgot to assign).

**Q3: What does `typeof null` return and why?**
> A: It returns `"object"` — this is a well-known JavaScript bug that has existed since 1995. `null` is actually a primitive value, not an object. The correct way to check is `variable === null`.

**Q4: Output of this code?**
\`\`\`javascript
let x;
const y = null;
console.log(typeof x);         // undefined
console.log(typeof y);         // object
console.log(x === undefined);  // true
console.log(y === null);       // true
\`\`\`
> A: `undefined`, `object`, `true`, `true`

---

## 🔁 Quick Revision Checklist
- [ ] 7 primitive types — 5 common in MERN
- [ ] `null` = intentional, `undefined` = accidental
- [ ] `typeof null` = `"object"` (JS bug, not actually an object)
- [ ] Always use `=== null` / `=== undefined` for checks, not `typeof`
- [ ] `const` always needs a value at declaration