# Day 33 — Authentication Part 3: JWT Token Generation

## 🌳 Flow Overview (Tree Format)

```
JWT SETUP
│
├── 1. Install jsonwebtoken
│     npm install jsonwebtoken
│
├── 2. Add secret key to .env
│     JWT_SECRET=some_long_random_string
│     (never hardcode this in code — same reasoning as GMAIL_APP_PASSWORD)
│
├── 3. Import in userRoutes.js
│     const jwt = require("jsonwebtoken");
│
├── 4. Generate token on successful login
│     jwt.sign(payload, secretKey, options)
│       - payload: { userId: user._id, email: user.email }
│       - secretKey: process.env.JWT_SECRET
│       - options: { expiresIn: "1h" }
│
└── 5. Send token in response
      res.send({ message: "Login successful!", token: token })
```

---

## Concepts & Definitions

**Why JWT is needed** — HTTP requests are **stateless** — the server doesn't remember who logged in on a previous request. JWT solves this: after a successful login, the server generates a token and hands it to the user. The user sends this token with every future request, and the server can verify identity from the token — without asking for the password again.

**`jwt.sign(payload, secretKey, options)`** — the function that creates a JWT. Three parts:
- **`payload`** — data to store inside the token (e.g., `userId`, `email`) so the token can later be traced back to a specific user.
- **`secretKey`** — a secret string known only to the server, used to "sign" the token so it can't be faked. Stored in `.env`, never hardcoded.
- **`options`** — e.g., `{ expiresIn: "1h" }` — controls how long the token stays valid.

**What `expiresIn` actually does** — It does **not** automatically generate a new token after the time limit. It only marks the **current token as invalid** once that time passes — the server will reject it if used after expiry. Getting a new token requires the user to **log in again**.

**Why expiry matters (the real risk without it)** — If a token never expires and it gets leaked (stolen, found in browser history, etc.), an attacker would have **permanent** access as that user. With expiry, a leaked token is only useful for a limited window (e.g., 1 hour), after which it's automatically useless.

---

## Code Reference

```javascript
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.send("User not found");
      }
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign(
              { userId: user._id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            res.send({ message: "Login successful!", token: token });
          } else {
            res.send("Wrong password");
          }
        });
    })
    .catch((error) => {
      console.log("Login error:", error);
      res.send("Error logging in");
    });
});
```

---

## Confusion Boxes

**Q: `expiresIn: "1h"` ka matlab hai token har 1 hour mein automatically renew hota hai?**
A: Nahi — `expiresIn` sirf batata hai token **kab tak valid rahega**. 1 hour ke baad, purana token invalid ho jaata hai — koi naya token automatically nahi banता. User ko naya token lene ke liye **dobara login karna padता hai**.

**Q: Token expiry ka real security benefit kya hai?**
A: Agar token leak ho jaaye (chura liya jaaye ya kahin expose ho jaaye), bina expiry ke wo **hamesha ke liye** kaam karega — attacker ko permanent access. Expiry set karने se, leaked token sirf limited time tak hi valid rehta hai, uske baad automatically bekaar ho jaata hai.

---

## Mistake Boxes (actual mistakes made)

1. **Variable naming mismatch (`tocken` vs `token`):** Token store karне ke liye variable banaya `tocken` (typo), lekin response bhejते waqt `token` likha (jo defined nahi tha). JavaScript mein spelling mismatch = completely alag variables, isliye `token is not defined` error aata. Fix: dono jagah same spelling (`token`) use kiya.

2. **Mock interview mein `expiresIn` ka behavior galat samjha:** Socha tha ki 1 hour baad automatically naya token generate hota hai — asal mein purana token sirf **invalid** ho jaata hai, naya token banane ke liye user ko dobara login karna zaroori hai.

---

## Mock Interview — Actual Q&A (Score 2.5/3)

**Q1. `jwt.sign()` ke 3 arguments aur unka kaam?**
- *Student's answer:* ✅ Correct — payload (user identity), secretKey (fake-proof banata hai), options (expiry duration).

**Q2. `JWT_SECRET` ko `.env` mein kyun rakha, code mein hardcode kyun nahi?**
- *Student's answer:* ✅ Correct — koi aur secret key na jaan sake, aur `.env` GitHub pe push nahi hoti.

**Q3. `expiresIn: "1h"` ka fayda, aur bina expiry ke risk?**
- *Student's answer:* 🟡 Partial — socha automatically naya token generate hota hai (❌ galat), lekin risk ka general idea (purana token block karna) sahi tha.
- *Polished answer:* Expiry sirf token ko invalid karti hai time ke baad — naya token banane ke liye dobara login chahiye. Bina expiry, leaked token permanent risk banता hai.

---

## Testing Verified (Postman)

Login request (`test@example.com` / `mypassword123`) response:
```json
{
  "message": "Login successful!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Syntax Reference Card

```javascript
// Install
npm install jsonwebtoken

// Import
const jwt = require("jsonwebtoken");

// .env
JWT_SECRET=some_long_random_string

// Generate a token
const token = jwt.sign(
  { userId: user._id, email: user.email },  // payload
  process.env.JWT_SECRET,                    // secret key
  { expiresIn: "1h" }                        // options
);

// Send token to client
res.send({ message: "Login successful!", token: token });
```

---

## Pending / Next Session

- **Protected routes** — verifying the JWT token on incoming requests (using `jwt.verify()`), so only logged-in users can access certain routes (e.g., viewing their own questions)
- **Middleware concept** — how Express middleware intercepts requests to check for a valid token before reaching the route handler
- Future (deferred): GitHub contribution graph / coding platform submission tracking

# notes documents (https://docs.google.com/document/d/1mDyX11VlrWy3-GgyVdwczmQ9yB5jkRYxCdCRPq4yiaI/edit?tab=t.0#heading=h.gvy8nef7sqb5)