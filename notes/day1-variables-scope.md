# Day 1 — Variables, Scope & Node.js Basics

## 📌 Concepts Covered

| Term | Full Form | Definition |
|---|---|---|
| JS | JavaScript | Dynamically typed scripting language — runs in browser and Node.js |
| Node.js | Node JavaScript Runtime | V8 engine + extra system powers — runs JS outside the browser |
| NPM | Node Package Manager | Registry + Installer + Version Tracker for JavaScript packages |
| V8 | V8 Engine | Google's JS engine that converts JS into machine code |
| `let` | — | Block-scoped variable — value can be reassigned |
| `const` | Constant | Block-scoped variable — value cannot be reassigned |
| `var` | Variable | Old declaration keyword — does NOT respect block scope, avoid using it |
| camelCase | — | Naming convention — first word lowercase, next words start with capital letter |
| Block Scope | — | A variable is only accessible within the `{}` it was declared in |
| Dynamic Typing | — | JS determines a variable's type automatically at runtime |
| Git | — | Local version control system that tracks code history |
| GitHub | — | Online/cloud storage for Git repositories |

---

## 💻 Syntax Reference Card

```javascript
// Variable Declaration
let variableName = value;      // reassignable
const FIXED_VALUE = value;     // non-reassignable

// Naming Convention
let studentName = "Amit";      // camelCase ✅
let studentname = "Amit";      // ❌ wrong

// Print to terminal
console.log(variableName);

// Block Scope
{
    let x = 10;   // only accessible inside this block
}
// x not accessible here

// var — avoid this
{
    var y = 10;   // leaks outside the block
}
// y IS accessible here — this is the bug with var

// Run a file
node filename.js
```

\`\`\`bash
# Git Commands — Daily Use
git status                  # see what changed
git add .                   # stage everything
git commit -m "message"     # take a snapshot
git push -u origin main     # first time push
git push                    # after first time, this is enough

# Navigation
pwd                          # current location
cd foldername                # move into a folder
cd ..                        # move one folder up
mkdir foldername             # create a new folder
\`\`\`

---

## ❓ Confusion Box

| Question | Answer |
|---|---|
| `const` reassign kiya — error kyun nahi aaya terminal mein? | PowerShell strict mode error nahi dikhata; value silently ignore ho jaati hai. Browser/strict mode mein TypeError aata hai. |
| Scope kya hota hai? | Variable kis area mein accessible hai — usi area ko scope kehte hain. |
| `--allow-unrelated-histories` kyun use kiya Git mein? | Local aur GitHub ki commit history alag thi — yeh flag dono histories ko merge hone deta hai. |
| `git remote -v` mein 2 lines (fetch/push) kyun dikhti hain? | fetch = GitHub se code lena, push = GitHub pe code bhejna — dono ek hi URL pe point karte hain. |

---

## ❌ Mistake Box (Actual Mistakes Made)

| Mistake | Correction |
|---|---|
| `maxlevel` likha (lowercase l) | `maxLevel` likhna chahiye — camelCase follow karo |
| Comment mein "in java" likha JS file mein | "in JavaScript" likhna chahiye tha |
| `const` reassign pe socha "error nahi aayega kyunki value pehle se thi" | `const` value change hone hi nahi deta — reasoning galat tha |
| Primitive datatypes ginte waqt "var bhi ek datatype hai" jaisi confusion | `var` declaration keyword hai, datatype nahi |

---

## 🎤 Mock Interview — Record

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

## 🔁 Quick Revision Checklist
- [ ] `let` = changeable, `const` = fixed
- [ ] `var` leaks out of blocks — avoid it
- [ ] JS is dynamically typed — no explicit type declarations
- [ ] Node.js = V8 engine + extra powers (not a language)
- [ ] NPM = registry + installer + manager
- [ ] Git tracks history locally, GitHub stores it online