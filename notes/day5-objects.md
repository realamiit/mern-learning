# Day 5 — JavaScript Objects

## 📌 Concepts Covered

| Term | Full Form | Definition |
|---|---|---|
| Object | — | A collection of key-value pairs used to store related data together |
| Key | — | The name/label of a piece of data inside an object |
| Value | — | The actual data associated with a key |
| Dot Notation | — | Syntax to access an object's value using `objectName.keyName` |
| Array of Objects | — | An array where each element is an object representing one complete record |

---

## 💻 Syntax Reference Card

```javascript
// Creating an object
const question1 = {
    name: "Two Sum",
    topic: "Array",
    difficulty: "Easy",
    solvedDate: "2026-06-20",
    nextRevisionDate: "2026-06-23"
};

// Accessing values — dot notation
console.log(question1.name);          // "Two Sum"
console.log(question1.difficulty);    // "Easy"

// Changing a property — ALLOWED even with const
question1.difficulty = "Medium";

// Reassigning the whole variable — NOT ALLOWED with const
// question1 = { name: "New Question" };  //  TypeError

// Array of Objects — real DSA Tracker structure
const allQuestions = [
    { name: "Two Sum", topic: "Array", difficulty: "Easy" },
    { name: "Reverse Linked List", topic: "Linked List", difficulty: "Medium" },
    { name: "Binary Search", topic: "Array", difficulty: "Easy" }
];

// Accessing one object inside the array
console.log(allQuestions[0]);         // full object
console.log(allQuestions[0].name);    // "Two Sum"

// Looping through array of objects
allQuestions.forEach(function (question) {
    console.log(question.name + " - " + question.difficulty);
});
```

---

## ❓ Confusion Box

| Question | Answer |
|---|---|
| `const` object ki property change ho sakti hai kya? | Yes — `const` only prevents reassigning the variable to a new object. It does NOT lock the object's internal properties. |
| Object ki key spelling mismatch ho to error aata hai kya? | No — JavaScript silently returns `undefined`. It does not throw an error for a non-existent key. |
| Array vs Object — kab kya use karein? | Array when order matters and items are similar (list of names). Object when each piece of data needs a clear label (name, topic, difficulty). Array of Objects combines both — a list of labeled records. |

---

## ❌ Mistake Box (Actual Mistakes Made)

| Mistake | Correction |
|---|---|
| Object ki key likhi `solveDate`, access kiya `solvedDate` | Key names must match EXACTLY everywhere — even one letter difference causes `undefined`, not an error |
| Spelling: "Eassy" instead of "Easy" | Always double check string values for typos |
| Spelling: "nextRevsionDate" instead of "nextRevisionDate" | Consistent, correct spelling matters — especially for keys used repeatedly |
| Called `allQuestions` (an Array) an "Object" in mock interview | An Array of Objects is still fundamentally an Array — each individual item inside it is the Object |

---

## 🎤 Mock Interview — Record

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

## 🔁 Quick Revision Checklist
- [ ] Object = key-value pairs
- [ ] Access values using dot notation: `object.key`
- [ ] `const` object → properties CAN change, variable CANNOT be reassigned
- [ ] Mismatched key name → `undefined`, not an error
- [ ] Array of Objects = list of structured records — DSA Tracker's core data shape
- [ ] `forEach` works on Array of Objects too — loop gives one object at a time
