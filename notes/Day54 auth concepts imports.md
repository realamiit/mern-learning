# Day 54 — Blog App: Auth Concepts (bcrypt vs JWT) + authRoutes.js Imports

## Full Form & Definitions

| Term | Full Form / Meaning | One-line Definition |
|---|---|---|
| bcrypt | Password hashing library | Plain text password ko ek irreversible scrambled string mein convert karta hai, aur login ke waqt compare karta hai |
| JWT | JSON Web Token | Login successful hone ke baad banaya jaane wala token, jo user ko authenticated maintain karta hai bina baar-baar password bheje |
| express.Router() | Express Router | Chhote, alag route files banane deta hai jo baad mein main `server.js` se jode jaate hain |
| require() (local file) | CommonJS local import | Apni khud ki file import karne ka syntax, relative path (`./` ya `../`) ke saath |
| localStorage | Browser storage | Client-side (browser) storage jahan JWT token save hota hai — server database mein nahi |

---

## Concept Summary

### Password security — bcrypt kyun
- Password **plain text** mein save karne se, agar database kabhi hack ho jaye, hacker ko turant sab passwords mil jaate hain.
- **bcrypt** password ko hash (scramble) karta hai — hashed string se original password nikalna practically impossible hota hai.
- Bcrypt **do jagah** use hota hai: **signup** (password hash karke save) aur **login** (`bcrypt.compare()` se diya gaya password aur DB ka hashed password match karna).

### bcrypt vs JWT — role clearly alag hain
- **bcrypt** → password hashing/comparison ke liye (signup + login dono mein)
- **JWT** → sirf login **successful hone ke baad** ek token banane ke liye, jo authentication maintain karta hai
- JWT token **database mein store nahi hota** — ye **client-side** (browser ke localStorage ya cookie) mein store hota hai
- Protected route access karte waqt, browser token ko request header mein bhejta hai (`Authorization: Bearer <token>`); server `jwt.verify()` se check karta hai valid hai ya nahi

### Full auth flow
1. **Signup:** Password → `bcrypt.hash()` → hashed password DB mein save
2. **Login:** Email+password → DB se hashed password nikalo → `bcrypt.compare()` se match check → match hua to `jwt.sign()` se token banao → response mein bhejo → browser localStorage mein save hota hai
3. **Protected route:** Browser token bhejta hai header mein → server `jwt.verify()` se check karta hai → valid hai to access milta hai

### express.Router() aur local file imports
- `express.Router()` (capital R) se ek mini-router banta hai jisme routes define karke, baad mein `server.js` mein main app se jodte hain.
- Local files import karne ke liye `require()` mein **relative path** dena padta hai (`./` current folder, `../` ek level upar) — npm packages ki tarah sirf naam nahi likh sakte.
- `require()` mein do cheezein alag hain: **left side (variable naam)** khud choose kar sakte ho, **right side (quotes ke andar)** hamesha exact package naam ya exact file path hona chahiye.

---

## Confusion Box

**Q: JWT token database mein store hota hai kya?**
A: Nahi — JWT token client-side (browser ke localStorage ya cookie) mein store hota hai. Server sirf token generate karta hai aur baad mein verify karta hai, khud store nahi karta.

**Q: bcrypt aur JWT dono authentication ke liye hain, to inka kaam alag kaise hai?**
A: bcrypt sirf password ko hash/compare karta hai (security ke liye, taaki plain text kabhi store na ho). JWT login ke baad ek token banata hai jisse user session maintain rahe — dono completely alag purpose serve karte hain, ek dusre ka substitute nahi hain.

---

## Mistake Box (actual mistakes made)

1. "Password hash karna zaroori hai kyunki zyada safe hai" — bahut generic jawab, exact reason (hacker ko plain text turant mil jayega vs hashed se nikal nahi payega) clarify karna pada.
2. Bola "JWT signup ke time use hota hai, bcrypt login ke time galat password pe" — poora galat mapping tha; sahi hai bcrypt dono (signup + login) mein, JWT sirf login success ke baad.
3. "JWT token database mein store hota hai" — galat; token client-side (browser) mein store hota hai.
4. "Token server pe cookies mein store hota hai" — phir se confusion; cookie bhi client-side (browser) hi hoti hai, server-side nahi.
5. `const bcrypt = require('bcryptjs')` likha — jabki project mein actual installed package `bcrypt` hai, `bcryptjs` nahi (alag packages hain).
6. AI-generated poora route code (imports + signup/login structure) paste kar diya bina khud likhe — teaching method ke against, isliye scratch se dobara karwaya gaya.
7. `express.router()` (lowercase r) bola — sahi hai `express.Router()` (capital R), jaisa `mongoose.Schema` mein bhi tha.
8. Local file import mein sirf `require("User")` likha — ye npm package samjha jayega, path nahi. Sahi hai `require("../models/User")` (relative path).
9. `require(" jsonwebtoken")` — quotes ke andar extra space thi.
10. `require("jwt jsonwebtoken")` — package naam aur variable naam ko galat tarike se mix kar diya ek hi string mein.
11. `const jwt = require("jwt")` — package ka actual naam `jsonwebtoken` hai, `"jwt"` naam ka package exist nahi karta; variable naam (`jwt`) aur package naam (`"jsonwebtoken"`) alag ho sakte hain, ye confuse hua.

---

## Mock Interview Record
(Is session mein formal scored mock interview nahi hua — concept clarification aur galtiyon ko turant correct kiya gaya real-time mein. Agle session mein bcrypt/JWT + Router concepts pe brutal mock interview liya jayega.)

---

## Syntax Reference Card

```javascript
// authRoutes.js — final imports (Day 54 tak)
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
```

```javascript
// Local file import pattern
const User = require("../models/User");
// "../" = ek level upar jao (routes se backend tak)
// "models/User" = models folder ke andar User.js file (extension ke bina)
```

```javascript
// bcrypt usage pattern (preview — signup/login mein aayega)
const hashedPassword = await bcrypt.hash(plainPassword, 10);
const isMatch = await bcrypt.compare(enteredPassword, hashedPasswordFromDB);
```

```javascript
// jwt usage pattern (preview — login mein aayega)
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
```