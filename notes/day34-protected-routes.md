# Day 34 — Authentication Part 4: Protected Routes + Middleware

## 🌳 Flow Overview (Tree Format)

```
PROTECTED ROUTE SETUP
│
├── 1. Create authMiddleware.js
│     - Read token from Authorization header
│     - Verify token using jwt.verify()
│     - If valid: attach decoded data to req.user, call next()
│     - If invalid/missing: send 401 error, do NOT call next()
│
├── 2. Import middleware in questionRoutes.js
│     const authMiddleware = require("./authMiddleware");
│
├── 3. Apply middleware to a route
│     router.get("/", authMiddleware, (req, res) => { ... });
│     (3 arguments now: path, middleware, callback)
│
└── 4. Test with Postman
      - No token → 401 "No token provided"
      - Valid fresh token (Authorization tab, Bearer Token type) → 200 OK with data
```

---

## Concepts & Definitions

**Middleware** — A function that runs **before** the actual route handler, to check/intercept the request. Unlike a normal route handler `(req, res)`, middleware takes a **third parameter**: **`next`** — a function that, when called, tells Express "the check passed, continue to the actual route handler."

**How middleware connects to a route:**
```javascript
router.get("/", authMiddleware, (req, res) => { ... });
```
Express runs `authMiddleware` first. If it calls `next()`, the actual callback `(req, res) => {...}` runs next. If the middleware instead sends a response (e.g., `res.status(401).send(...)`) and does **not** call `next()`, the actual callback **never runs** — the request is stopped there.

**Authorization Header** — Tokens are sent from client to server via a special HTTP header:
```
Authorization: Bearer <token>
```
"Bearer" is a convention word indicating what follows is a token.

**`authHeader.split(" ")[1]`** — Step by step:
- `authHeader` looks like `"Bearer eyJhbGci..."`
- `.split(" ")` breaks the string at the space, creating an array: `["Bearer", "eyJhbGci..."]`
- `[1]` picks the second element (index 1) — the actual token, skipping the word "Bearer".

**`jwt.verify(token, secretKey, callback)`** — Checks if the token is valid (signed with the correct secret, not expired). The callback receives `(error, decoded)`:
- If `error` exists → token is invalid/expired → send 401
- If valid → `decoded` contains the original payload (`userId`, `email`) — this gets attached to `req.user` so later code in the route can know who made the request.

**HTTP Status 401** — Means "Unauthorized" — the request lacks valid authentication credentials.

---

## Code Reference

### authMiddleware.js
```javascript
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("No token provided");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).send("Invalid token");
    }
    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;
```

### Applying it to a route (questionRoutes.js)
```javascript
const authMiddleware = require("./authMiddleware");

router.get("/", authMiddleware, (req, res) => {
  Question.find()
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Fetch error:", error);
      res.send("Error fetching questions");
    });
});
```

---

## Confusion Boxes

**Q: Middleware aur normal route handler mein farak kya hai?**
A: Normal route handler `(req, res)` leta hai. Middleware ek extra teesरा parameter `next` bhi leta hai, jise call karके batाता hai "check pass ho gaya, aage badो." Bina `next()` call kiye, request wahीं ruk jaाती hai.

**Q: `router.get("/", authMiddleware, (req, res) => {...})` mein order kaise chalता hai?**
A: Pehले `authMiddleware` chalता hai. Agar wo `next()` call karta hai, tabhी doosра (asли) callback chalता hai. Agar middleware `next()` call kiye bina hi response bhеज देता hai (jaise 401 error), to asли callback **kabhi nahi chalता**.

**Q: `.split(" ")[1]` kya karta hai?**
A: Poori header string ko space ke jagah se todके ek array banाता hai (`["Bearer", "token..."]`), phिर index `[1]` se doosра element (actual token) nikालता hai.

---

## Mistake Boxes (actual mistakes made)

1. **`jwt.verify()` mein comma ki jagah dot laga diya:** `jwt.verify(token.process.env.JWT_SECRET, ...)` likha था — isse JavaScript ise ek hi expression samajhता hai (`token` ke andar se `.process.env.JWT_SECRET` access karने ki koshish), jo galat hai kyunki `token` ek string hai, uske andar aisी koi property nahi hoती. Fix: comma se separate kiya — `jwt.verify(token, process.env.JWT_SECRET, ...)`.

2. **Testing issue (not a code bug):** Postman mein `/questions` request test karte waqt, purana/expired ya missing token use ho raha था kyunki Authorization tab mein token dobara refresh/set nahi kiya gaya था har baar naya login karने ke baad. Isse baar-baar "Invalid token" ya "No token provided" aata raha, jab tak fresh token sahi se Authorization tab mein daalke test nahi kiya. **Sabak:** JWT ek baar generate hone ke baad reuse nahi hota agar naya login ho raha ho — har naye test ke liye fresh token Authorization mein dalna zaroori hai.

3. **Debugging console.logs cleanup:** Temporarily `console.log("Secret being used:", ...)` aur `console.log("JWT verify error:", ...)` add kiye थे debugging ke liye — issue solve hone ke baad dono hataye gaye, taaki production code clean rahे.

---

## Mock Interview — Actual Q&A (Score 2.5/4)

**Q1. Middleware kya hai, normal route se kaise different?**
- *Student's answer:* 🟡 Partial — concept sahi (beech mein check karta hai), lekin `next` parameter ka naam missing tha.
- *Polished answer:* Middleware `(req, res, next)` leta hai — extra `next` parameter route handler ko aage chalाने ke liye hota hai.

**Q2. `authMiddleware` aur asli callback ka order/relationship?**
- *Student's answer:* ✅ Correct — pehले middleware, `next()` call hone par hi asли callback.

**Q3. `.split(" ")[1]` step-by-step?**
- *Student's answer:* Not answered.
- *Polished answer:* String ko space se todके array banाता hai, index `[1]` se token (doosра element) nikालता hai.

**Q4. Aaj ka debugging issue ka root cause?**
- *Student's answer:* ✅ Correct — khud pehchana ki Postman mein purana/expired token use ho raha था, code ka bug nahi tha.

---

## Testing Verified (Postman)

| Scenario | Auth Header | Response |
|---|---|---|
| No token | (none) | 401 "No token provided" |
| Fresh valid token (Bearer Token, Authorization tab) | Present | 200 OK — full questions array |

---

## Syntax Reference Card

```javascript
// Middleware function signature
function middlewareName(req, res, next) {
  // check logic
  // next();  → continue to route handler
  // OR res.status(4xx).send(...)  → stop here, don't call next()
}

// Applying middleware to a route (3 arguments)
router.get("/path", middlewareName, (req, res) => { ... });

// Reading Bearer token from header
const token = req.headers.authorization.split(" ")[1];

// Verifying a token
jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
  if (error) { /* invalid */ }
  else { /* decoded has the original payload */ }
});
```

---

## Pending / Next Session

- Apply `authMiddleware` to other relevant routes (add, delete, due-questions, etc.) once ready to make the app fully multi-user
- Frontend: send the JWT token from React (store after login, attach to future fetch requests)
- Frontend: build actual Signup/Login forms/pages (currently only tested via Postman)
- Future (deferred): GitHub contribution graph / coding platform submission tracking

# notes 
(https://docs.google.com/document/d/1TwZhB8Gz0GsI8dWfaCqC7aahLjM5hyvRauQcujtVo8o/edit?tab=t.0#heading=h.y4qppima13b3)