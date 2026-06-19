# Day 3 — JavaScript Functions

## 📌 Concepts Covered

| Term | Full Form | Definition |
|---|---|---|
| Function | — | Reusable block of code that performs a specific task |
| Parameter | — | Placeholder name used when defining a function |
| Argument | — | Actual value passed when calling a function |
| Return | — | Sends a value out of a function; stops further execution inside it |
| Arrow Function | — | Shorter syntax for writing functions using `=>` |
| Implicit Return | — | Arrow function shortcut that returns a value without writing `return` (only for single-line bodies) |
| Function Scope | — | Variables declared inside a function are only accessible within that function |

---

## 💻 Syntax Reference Card

```javascript
// Function Declaration
function functionName(parameter1, parameter2) {
    return parameter1 + parameter2;
}

// Calling (invoking) a function
functionName(argument1, argument2);

// Arrow Function — long form
const functionName = (parameter1, parameter2) => {
    return parameter1 + parameter2;
};

// Arrow Function — short form (implicit return)
const functionName = (parameter1, parameter2) => parameter1 + parameter2;

// Function Scope
function test() {
    let x = 5;       // only accessible inside this function
}
console.log(x);       // ReferenceError: x is not defined
```

---

## ❓ Confusion Box

| Question | Answer |
|---|---|
| `console.log()` vs `return` — same hai kya? | No. `console.log()` only prints to terminal. `return` sends a value out of the function so it can be stored/used elsewhere. |
| Implicit return kab use karte hain? | Sirf jab function body ek hi line ki ho — multi-line body ke liye `{ }` aur `return` zaroori hai. |

---

## ❌ Mistake Box (Actual Mistakes Made)

| Mistake | Correction |
|---|---|
| Parameter naam Capital letter se shuru kiya (`Day` instead of `day`) | Parameters/variables always camelCase — lowercase se start |
| "Revsion" likha comment mein | Correct spelling: "Revision" |
| `node function.js` run kiya (file naam galat) | File ka exact naam tha `functions.js` — typo se error aaya |
| Socha `return` ka matlab hai "function band ho gaya" | `return` ka primary kaam value bhejna hai; side effect ke taur pe execution stop hota hai |
| Q4 mock interview mein reasoning incomplete di — "bahar accessible nahi" bola but "kyun" nahi bataya | Function apna alag scope banata hai — andar declare hua variable sirf usi function tak limited rehta hai |

---

## 🎤 Mock Interview — Record

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

## 🔁 Quick Revision Checklist
- [ ] Function = reusable code block
- [ ] Must be called/invoked to run
- [ ] Parameter = placeholder, Argument = actual value
- [ ] `return` ≠ `console.log()`
- [ ] Arrow function = `=>`, shorter syntax
- [ ] Implicit return only for single-line bodies
- [ ] Function creates its own scope