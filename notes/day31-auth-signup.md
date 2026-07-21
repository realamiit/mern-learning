# Day 31 — Authentication Part 1: Password Hashing + Signup Route

## 🌳 Flow Overview (Tree Format)

```
AUTHENTICATION SETUP
│
├── 1. Install bcrypt
│     npm install bcrypt
│
├── 2. Create User Schema (User.js)
│     - name, email, password fields (all required: true)
│
├── 3. Create User Routes file (userRoutes.js)
│     - Import: express, router, bcrypt, User
│     - Signup route: POST /signup
│         → hash password with bcrypt.hash()
│         → save new User with hashed password
│     - Export: module.exports = router
│
├── 4. Connect to express-server.js
│     - Import: const userRoutes = require("./userRoutes");
│     - Mount: app.use("/users", userRoutes);
│
└── 5. Test with Postman
      POST http://localhost:3000/users/signup
      Body (JSON): { "name", "email", "password" }
      → Check MongoDB: password should be a long scrambled string, not plain text
```

---

## Concepts & Definitions

**Hashing** — Ek **one-way** mathematical function jo password ko ek scrambled string mein convert karta hai. Original password **kabhi wapas nikala nahi ja sakta** (irreversible) — sirf verify kiya ja sakta hai ki koi given password, is hash se match karta hai ya nahi.

**Encryption** — **Reversible** hai — sahi key ho to encrypted data wapas original form mein decrypt ho sakta hai (jaise WhatsApp ke end-to-end encrypted messages). Passwords ke liye hum encryption nahi, **hashing** use karte hain — kyunki humein kabhi bhi original password wapas nikalne ki zaroorat nahi hoti, sirf match verify karna hota hai.

**bcrypt** — Ek npm library jo password hashing ke liye industry-standard hai. Do main functions:
- `bcrypt.hash(password, saltRounds)` — password ko hash karta hai (signup ke waqt use hota hai)
- `bcrypt.compare(plainPassword, hashedPassword)` — plain password ko hash se compare karta hai, `true`/`false` return karta hai (login ke waqt use hoga — Day 32 mein)

Dono functions **Promise return karte hain** — isliye `.then()` ya `async/await` zaroori hai.

**saltRounds (cost factor)** — `bcrypt.hash()` ka doosra argument (usually `10`). Ye batata hai bcrypt **kitni baar** internally hashing process repeat/complicate kare. Jitna zyada number, utna secure lekin slow.

⚠️ **saltRounds ≠ Salt** — ye 2 alag cheezein hain:
- **saltRounds** — ek number jo hashing complexity control karta hai (humein manually dena padta hai)
- **Salt** — bcrypt **automatically** har password ke liye ek random string generate karta hai aur hashing mein add karta hai, taaki 2 users ka same password ho bhi to unke hash **alag-alag** banein (rainbow-table attacks se bachata hai). Ye automatic hai, manually kuch nahi karna padta.

**Destructuring** — `const { name, email, password } = req.body;` — ek shortcut syntax jo kisi object se **multiple properties ek saath** nikaal kar alag variables banata hai, bina `req.body.name`, `req.body.email` baar-baar likhne ke.

---

## Code Reference

### User.js (Schema)
```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
```

**Naya syntax note:** Jab field ke baare mein sirf type batana ho: `fieldName: String`. Jab additional rules (jaise `required`) bhi chahiye: `fieldName: { type: String, required: true }`.

### userRoutes.js (Signup Route)
```javascript
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("./User");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hashedPassword) => {
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      return newUser.save();
    })
    .then(() => {
      res.send("User registered successfully!");
    })
    .catch((error) => {
      console.log("Signup error:", error);
      res.send("Error registering user");
    });
});

module.exports = router;
```

### express-server.js (Connection)
```javascript
const userRoutes = require("./userRoutes");
// ...
app.use("/users", userRoutes);
```

---

## Confusion Boxes

**Q: `bcrypt.compare()` khud login "allow" karta hai?**
A: Nahi — `bcrypt.compare()` sirf `true`/`false` return karta hai (match hua ya nahi). Actual decision (login allow karna ya error dena) hum apne code mein khud likhte hain us `true`/`false` ke basis pe.

**Q: `saltRounds` aur `salt` same cheez hain?**
A: Nahi — `saltRounds` (jaise `10`) ek number hai jo hashing ki complexity/rounds control karta hai, humein manually dena padta hai. `salt` bcrypt khud automatically generate karta hai (random string) har password ke liye, taaki same password bhi alag hash banaye.

---

## Mistake Boxes (actual mistakes made)

1. **`require` vs `required` typo:** Schema mein `require: true` likha tha teeno fields mein, jo Mongoose ka valid keyword nahi hai (`require` file-import ke liye hota hai). Mongoose ise silently ignore kar deta — validation kaam nahi karta, bina field diye bhi save ho jaata, koi error nahi aata. Sahi keyword: `required: true`.

2. **Route path typo:** `/signup` ki jagah `/singup` likha tha ("g" aur "n" ka order galat). Isse frontend/Postman ka request kabhi match nahi karta, 404 milta — chahe baaki code perfect ho.

3. **Missing `module.exports`:** Pehli baar file banate waqt `module.exports = router;` line missing thi, jisse `express-server.js` file ko import hi nahi kar pata.

4. **Mock interview mein `saltRounds` ko "salting" bola** — terminology confusion (saltRounds ek number/cost-factor hai, "salt" ek alag automatic random-string mechanism hai).

---

## Mock Interview — Actual Q&A (Score 2.5/4)

**Q1. Hashing vs Encryption core difference?**
- *Student's answer:* ✅ Mostly correct — hashing irreversible/secure, encryption reversible (WhatsApp example diya). Chhoti terminology mix: encryption mein "extra keywords" ko salt bola, sahi term hai "key".

**Q2. `bcrypt.hash(password, 10)` mein `10` ka matlab?**
- *Student's answer:* "Salting" bola (❌ Galat)
- *Polished answer:* `10` saltRounds/cost factor hai — hashing complexity/rounds define karta hai. "Salt" khud automatic, random-string mechanism hai, alag concept.

**Q3. `const { name, email, password } = req.body;` syntax ka naam?**
- *Student's answer:* "Express se data leke use karna" (🟡 Half correct — naam missing)
- *Polished answer:* Iska naam **Destructuring** hai — object se multiple properties ek saath nikaal kar variables banane ka shortcut.

**Q4. Hashed passwords leak hone par hacker directly use kar sakta hai?**
- *Student's answer:* ✅ Mostly correct — directly use nahi kar sakta, terminology ("desalt") thodi loose thi.

---

## Syntax Reference Card

```javascript
// Install
npm install bcrypt

// Schema field with validation
fieldName: { type: String, required: true }

// Hash a password (signup)
bcrypt.hash(password, 10)
  .then((hashedPassword) => { /* save hashedPassword to DB */ });

// Compare password (login - next session)
bcrypt.compare(plainPassword, hashedPassword)
  .then((isMatch) => { /* true or false */ });

// Destructuring from req.body
const { name, email, password } = req.body;

// Router export/import pattern (same as questionRoutes.js)
module.exports = router;
const userRoutes = require("./userRoutes");
app.use("/users", userRoutes);
```

---

## Pending / Next Session

- **Day 32: Login route** — using `bcrypt.compare()` to verify password against stored hash
- **JWT (JSON Web Token)** — generating a token on successful login so the user doesn't need to send password on every request
- **Protected routes** — restricting certain routes (e.g., viewing own questions) to logged-in users only
- Future (deferred): GitHub contribution graph / coding platform submission tracking

# note: This session focused on password hashing and signup route. Next session will cover login and JWT-based authentication.

(https://docs.google.com/document/d/1oCC8hya1gkTciy1QCb_Qq6Vy5BDTGmVrVRCb-Gc--mc/edit?tab=t.0#heading=h.998ny03l9yth)