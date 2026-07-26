# Day 36 — Protected Routes, userId Filtering, Auto-Refresh on Login

## Concepts Covered (Full Form + Definition)

- **authMiddleware** — Express middleware function jo har protected route se pehle chalta hai, JWT token verify karta hai, aur invalid/missing token pe request ko block karke 401 bhej deta hai.
- **mongoose.Schema.Types.ObjectId** — Mongoose ka special data type jo MongoDB ke unique document ID (`_id`) ko store/reference karta hai, dusre collection se relationship banane ke liye.
- **ref (in Mongoose schema)** — Batata hai ki ek ObjectId field kis dusre model/collection ko point kar raha hai, taaki baad mein `.populate()` se poora related document nikala ja sake.
- **req.user** — authMiddleware dwara JWT se decode kiya gaya data (userId, email), jo route handler ke andar available hota hai request object pe attach hoke.
- **useEffect dependency array** — `useEffect(fn, [deps])` mein dusra argument batata hai ki effect kab dobara chalega — khaali `[]` matlab sirf ek baar (mount pe), aur variable hone par jab bhi wo variable change ho.
- **Lifting state up** — React pattern jisme parent component apna state-update function (setter) child ko prop ke roop mein deta hai, taaki child parent ka state modify kar sake.

---

## Confusion Box (Questions Asked + Answers)

**Q: Postman mein 401 aata hai lekin browser mein 200 kyun aa raha tha?**
A: Frontend ka `API_URL` deployed Render backend ki taraf point kar raha tha, jahan purana code (bina authMiddleware ke) chal raha tha. Postman local backend (naye code ke saath) test kar raha tha. Dono alag jagah the, isliye alag results aaye.

**Q: Login ke baad Dashboard automatically kyun nahi update ho raha tha, manual refresh kyun karna padta tha?**
A: Saare `useEffect`s ka dependency array khaali `[]` tha — matlab wo sirf component mount hote waqt chalte the, login hone ka koi signal detect nahi kar rahe the. Fix: `isLoggedIn` state banaya, use dependency array mein daala (`[isLoggedIn]`), aur login successful hone par `setIsLoggedIn(true)` call kiya — isse useEffect dobara trigger hua.

**Q: Kya User A, User B ke questions dekh sakta hai?**
A: Nahi, jab tak User A ke paas User B ka email/password na ho (jo normal login hi hai, koi security bug nahi). Backend har GET route mein `Question.find({ userId: req.user.userId })` filter lagata hai, jo sirf currently logged-in user ke token se match karne wale questions return karta hai.

---

## Mistake Box (Actual Mistakes Made)

1. **File paste karte waqt duplicate content:** `questionRoutes.js` ek baar aisi paste hui jisme poori file content ke andar hi dobara repeat ho gayi thi — resulted in invalid syntax (`async` ke baad `const express = require(...)` aa gaya). Fix: file poori clear karke clean version phir se likhi.
2. **Headers object galat jagah likha:** Kai baar `headers: {...}` ko `fetch()` ke bracket ke *bahar* likha gaya (jaise `useEffect` ke bahar ya `fetch()` call complete hone ke baad) — ye syntax error deta hai. Sahi jagah: `fetch(url, { headers: {...} })` — options object fetch ke andar hi hona chahiye.
3. **Prop naam mismatch:** `AuthForm` mein prop destructure karte waqt `{ setIsLoginMode }` likha, jabki chahiye tha `{ setIsLoggedIn }` — dono naam similar dikhte hain but alag purpose ke liye hain (ek local mode toggle ke liye, doosra login status ke liye).
4. **GET request mein unnecessary Content-Type:** `due3` jaisी GET request mein `Content-Type: application/json` header add kiya gaya, jabki ye sirf tab chahiye jab body bheji ja rahi ho (POST/PATCH mein) — GET requests mein sirf `Authorization` chahiye.
5. **`userId: user` likha instead of `req.user.userId`:** Mock interview jaisा confusion — `user` koi defined variable nahi tha isliye ye ReferenceError deta.

---

## Mock Interview — Day 36

**Q1: `useEffect` dependency array mein `[isLoggedIn]` daalne se kya signal milta hai?**
- Amit's answer: "Jyada farak nahi padta, refresh ho jayega" (galat)
- Polished answer: React ko signal milta hai ki jab bhi `isLoggedIn` ki value change ho, effect ko dobara chalao. Khaali `[]` array ka matlab hai effect sirf ek baar (component mount pe) chalega, kabhi dobara nahi — chahe koi state change ho jaye.
- Score: 3/10

**Q2: `req.user.userId` kahan se aata hai, poori chain?**
- Amit's answer: "Schema se aaya hai" (galat, confused)
- Polished answer: Login ke waqt `jwt.sign({userId, email}, JWT_SECRET)` se token banta hai → frontend token ko `Authorization` header mein bhejta hai → `authMiddleware.js` token verify karke `req.user = decoded` set karta hai → route ke andar `req.user.userId` available ho jaata hai.
- Score: 4/10

**Q3: Kya User A ko User B ke questions dikh sakte hain?**
- Amit's answer: Nahi (sahi), lekin "agar B ke pass A ki id/password ho" wali baat thodi misleading
- Polished answer: Nahi — `Question.find({ userId: req.user.userId })` filter ki wajah se sirf logged-in user ke apne questions milte hain. Agar koi doosre ka email/password use karke login karta hai, wo unka account access kar raha hoga — ye normal authentication behavior hai, security bug nahi.
- Score: 7/10

**Q4: `setIsLoggedIn` AuthForm se App.jsx ka state kaise update karta hai?**
- Amit's answer: "Import kiya isliye" (galat)
- Polished answer: "Lifting state up" pattern — App.jsx ne apna `setIsLoggedIn` function prop ke roop mein AuthForm ko diya (`<Authform setIsLoggedIn={setIsLoggedIn} />`). Chunki ye function ek reference hai jo App.jsx ke state ko control karta hai, AuthForm ke andar isे call karna seedha App.jsx ka state update karta hai.
- Score: 2/10

**Total: 16/40 — Needs strong revision on useEffect dependency arrays and JWT verification chain.**

---

## Syntax Reference Card

```js
// Mongoose ObjectId reference
userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
}

// Middleware on a route
router.get("/", authMiddleware, (req, res) => {
  Question.find({ userId: req.user.userId })
    .then((questions) => res.send(questions));
});

// Sending Authorization header from frontend
fetch(url, {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
});

// useEffect with dependency to re-trigger on state change
useEffect(() => {
  // fetch logic
}, [isLoggedIn]);

// Lifting state up — parent passes setter to child
// Parent (App.jsx):
<AuthForm setIsLoggedIn={setIsLoggedIn} />

// Child (AuthForm.jsx):
const AuthForm = ({ setIsLoggedIn }) => {
  // ... after successful login:
  setIsLoggedIn(true);
};
```