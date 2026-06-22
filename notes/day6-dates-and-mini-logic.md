# Day 6 — Dates, Equality Operators & Mini Project Logic

## 📌 Concepts Covered

| Term | Full Form | Definition |
|---|---|---|
| `new Date()` | — | Built-in JavaScript object that returns the current date and time from system clock |
| `getDate()` | — | Returns the day number (1–31) of a Date object |
| `setDate()` | — | Sets/changes the day number of a Date object |
| `==` | Loose Equality | Compares only value, automatically converts types |
| `===` | Strict Equality | Compares both value AND type — recommended over `==` |
| Pass by Reference | — | When an object is passed to a function, both point to the same memory location — modifying one affects the other |
| Pass by Value | — | When a primitive (string/number/boolean) is passed to a function, a copy is made — modifying it doesn't affect the original |

---

## 💻 Syntax Reference Card

```javascript
// Getting current date
const today = new Date();
console.log(today);  // 2026-06-22T10:32:00.845Z (ISO format)

// Adding days to a date — REUSABLE function
function getRevisionDate(daysToAdd) {
    const revisionDate = new Date();
    revisionDate.setDate(revisionDate.getDate() + daysToAdd);
    return revisionDate;
}

console.log("Day 3:", getRevisionDate(3));
console.log("Day 7:", getRevisionDate(7));
console.log("Day 15:", getRevisionDate(15));
console.log("Day 30:", getRevisionDate(30));

// == vs ===
console.log(5 == "5");    // true  (only value checked)
console.log(5 === "5");   // false (value + type checked)

// Filtering Array of Objects using forEach + if
allQuestions.forEach(function (question) {
    if (question.difficulty === "Easy") {
        console.log(question.name);
    }
});

// Pass by Reference — Date objects
function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
}
const sample = new Date();
const result = addDays(sample, 5);
console.log(result);  // modified date
console.log(sample);  // ALSO modified — same object reference!
```

---

## ❓ Confusion Box

| Question | Answer |
|---|---|
| `allQuestions.difficulty` directly likh sakte hain kya? | No — `allQuestions` is an Array, not a single object. Need to use `forEach` to get one object at a time, then access `.difficulty` on that object. |
| Function ke andar Date object modify karne se bahar wala variable kyun badal jaata hai? | Because Date is an object — it's passed by reference. The function parameter and the outer variable point to the SAME memory location. |

---

## ❌ Mistake Box (Actual Mistakes Made)

| Mistake | Correction |
|---|---|
| `if (allQuestions.difficulty === "Easy")` likha | Should loop with `forEach` first to get individual objects, then check `question.difficulty` |
| `getRevisionDate.setDate(...)` likha function ke andar | Should have used the local variable `revisionDate.setDate(...)`, not the function's own name |
| Manually wrote the same date-calculation logic 4 times (Day 3, 7, 15, 30) | A single reusable function with a parameter (`daysToAdd`) replaces all 4 blocks |
| Console.log labels said "Day 3" for all outputs (7, 15, 30 too) | Copy-paste mistake — labels should match the actual value being logged |
| Predicted Q4 (Date pass-by-reference) would throw an error | No error occurs — but the original object DOES get modified, due to objects being passed by reference |

---

## 🎤 Mock Interview — Record

**Q1: `==` vs `===`?**
> A: `==` checks only the value and allows type conversion. `===` checks both value and type. Always prefer `===` to avoid unexpected bugs from automatic type conversion.

**Q2: What does `new Date()` return?**
> A: It returns a Date object representing the current date and time from the system clock, in ISO format: `YYYY-MM-DDTHH:MM:SS.sssZ`.

**Q3: Why is the function approach better than writing the same logic manually multiple times?**
> A: It reduces code duplication, improves maintainability (one place to fix bugs or change logic), and improves readability since the function name describes its purpose.

**Q4: What happens to `today` after passing it into a function that modifies a Date object?**
> A: Date objects are passed by reference in JavaScript. The function parameter and the outer variable point to the same memory location, so modifying the date inside the function also modifies the original variable outside.

---

## 🔁 Quick Revision Checklist
- [ ] `new Date()` = current date/time object
- [ ] `getDate()` reads day, `setDate()` changes day
- [ ] Always use `===`, avoid `==`
- [ ] `forEach` + `if` = filtering pattern for Array of Objects
- [ ] Functions reduce repeated code — use parameters instead of copy-pasting
- [ ] Objects (including Dates) are passed by reference — modifying inside a function can affect the original