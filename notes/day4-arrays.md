# Day 4 — JavaScript Arrays

## 📌 Concepts Covered

| Term | Full Form | Definition |
|---|---|---|
| Array | — | A single variable that stores multiple values in an ordered list |
| Index | — | The position number of an element inside an array, starting from 0 |
| `length` | — | Property that returns the total number of elements in an array |
| `push()` | — | Method that adds a new element to the END of an array |
| `pop()` | — | Method that removes the last element from an array |
| `forEach()` | — | A loop method built specifically for arrays — runs a function once for every element |
| Callback Function | — | A function passed as an argument to another function (used inside `forEach`) |

---

## 💻 Syntax Reference Card

```javascript
// Creating an array
const questions = ["Two Sum", "Binary Search", "Merge Sort"];

// Accessing by index (starts from 0)
console.log(questions[0]);   // "Two Sum"
console.log(questions[2]);   // "Merge Sort"
console.log(questions[10]);  // undefined — no error, index doesn't exist

// Length of array
console.log(questions.length);  // 3

// push() — add to the end
questions.push("Linked List");

// pop() — remove from the end
questions.pop();

// forEach() — loop through every element
questions.forEach(function (question, index) {
    console.log(index, question);
});

// comma vs plus when printing arrays
console.log("Data:", questions);   // shows array as-is: [ 'Two Sum', ... ]
console.log("Data:" + questions);  // converts to string: "Two Sum,Binary Search,..."
```

---

## ❓ Confusion Box

| Question | Answer |
|---|---|
| `comma` aur `plus` dono "kaam" karte hain console.log mein — same hi hai kya? | No. Comma passes the array as a separate argument — JS shows its real structure with brackets. Plus forces string conversion — brackets disappear, elements get joined with commas. |
| Array ke galat index access karne pe Java jaisa error aata hai kya? | No — unlike Java's `ArrayIndexOutOfBoundsException`, JavaScript silently returns `undefined` for out-of-range indexes. |

---

## ❌ Mistake Box (Actual Mistakes Made)

| Mistake | Correction |
|---|---|
| Pehle guess kiya tha comma aur plus "same output" denge | Comma keeps array structure intact; plus converts it to a string, removing brackets |
| Guess badal ke "error aayega" bola comma/plus test mein | Neither throws an error — both just format the output differently |
| Array definition mein "contiguous memory, same datatype" bola (C++/Java style) | JS arrays are flexible — they can hold mixed data types and don't require fixed memory blocks like in Java/C++ |

---

## 🎤 Mock Interview — Record

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

## 🔁 Quick Revision Checklist
- [ ] Array stores multiple values in one variable
- [ ] Indexing starts from 0
- [ ] Out-of-range index → `undefined`, not an error
- [ ] `push()` adds to end, `pop()` removes from end
- [ ] Comma in `console.log` preserves structure; `+` converts to string
- [ ] `forEach(function(element, index) {...})` loops through every array element