# Day 62 — Blog App: authMiddleware Intro (next() + folder structure)

## Full Form & Definitions

| Term | Full Form / Meaning | One-line Definition |
|---|---|---|
| Middleware | Express Middleware | Function jo request ko route ke actual logic tak pahunchne se pehle intercept/process karta hai |
| next() | Next middleware function | Middleware ke andar call kiya jaata hai request ko aage badhne dene ke liye |
| Authorization header | HTTP Authorization Header | Request ke header mein token bhejne ka standard format: `Authorization: Bearer <token>` |
| Protected route | Protected Route | Route jo sirf valid/authenticated request hi access kar sake |

---

## Concept Summary

### Middleware kya hota hai
- Middleware ek "bichauliya" (in-between) function hai — request server ke actual route logic tak pahunchne **se pehle** chalta hai.
- Ye request ko check/modify/handle kar sakta hai, aur decide karta hai ki request aage badhni chahiye ya nahi.
- Example: `express.json()`, `cors()` — dono middleware hain jo already DSA Tracker mein use ho chuke hain.

### authMiddleware ka purpose
- Kuch routes ("protected routes") sirf **logged-in users** access kar sakein — jaise profile edit, post create.
- `authMiddleware` request ko check karta hai — agar valid JWT token nahi hai, to route ka logic **chalne hi nahi deta**, error return kar deta hai.
- Agar valid hai, to `next()` call karke request ko aage route ke logic tak jaane deta hai.

### next() — middleware ka teesra parameter
- Middleware function structure: `function authMiddleware(req, res, next) { ... }`
- `req`, `res` ke saath ek **teesra parameter `next`** hota hai.
- `next()` call karna matlab: "sab sahi hai, request ko aage route ke logic tak jaane do."
- Case-sensitive: `next()` (lowercase) sahi hai, `Next()` (capital N) galat — undefined variable error dega.

### Authorization header — token kahan se aata hai
- Jab client protected route access karta hai, wo apna saved JWT token request ke header mein bhejta hai: `Authorization: Bearer <token>`
- Middleware isi header se token nikalega, `jwt.verify()` se check karega valid hai ya nahi.

### Folder structure — middleware ka apna folder
- Alag concerns ko alag folders mein rakhna chahiye (separation of concerns):
  - `models/` — Schema/Model files (jaise `User.js`)
  - `routes/` — Route files (jaise `authRoutes.js`)
  - `middleware/` — Middleware files (jaise `authMiddleware.js`) — **naya folder, is session mein decide hua**

---

## Confusion Box

**Q: authMiddleware.js seedha server.js mein likh sakte hain kya?**
A: Nahi — modularity ke liye alag file/folder mein rakhna chahiye, jaisa models aur routes ke liye already kiya hai. Har concern ka apna folder hona chahiye.

**Q: next() kya karta hai exactly?**
A: Middleware ke andar jab request valid ho, `next()` call karke Express ko batate hain "is request ko aage route ke actual logic tak jaane do" — bina isके, request middleware pe hi ruk jaati, route kabhi chalta hi nahi.

---

## Mistake Box (actual mistakes made)

1. Pehle "Middleware" (khud concept ka naam) hi `next` parameter ke naam ki jagah bol diya — confusion tha `next` parameter aur "middleware" concept ke beech.
2. `Next()` (capital N) likha — case-sensitive JavaScript mein galat hai, sahi hai `next()` (lowercase).
3. `connectDB()` ko galti se `next()` ki jagah call kar diya — do alag functions ka confusion, jabki maine sirf pattern (naam + parentheses) example ke roop mein dikhaya tha.
4. AI-generated poora server.js code paste kar diya (jisme `.then()/.catch()` pattern tha, jabki project mein `async/await` use ho raha hai, aur hardcoded PORT bhi tha) — project ke actual code se match nahi karta tha, khud se nahi likha gaya tha.
5. Folder naam poochne pe baar-baar file ka naam (`authmiddlewere.js`) diya, folder ka naam nahi socha — aur spelling bhi galat thi ("middlewere" ki jagah "middleware").
6. Poore signup/login route ka already-complete code aur User.js model dobara paste kiya jab sirf ek folder ka naam poocha gaya tha — tangent/distraction session mein bar-bar hua.

---

## Mock Interview Record
(Is session mein formal mock interview nahi liya gaya — session bhatakta raha aur core concept (folder + next()) hi poora clarify karne mein time laga. Agle session mein authMiddleware poora likhne ke baad, iske concepts pe brutal mock interview liya jayega.)

---

## Syntax Reference Card

```javascript
// authMiddleware.js — basic shell (Day 62 tak, folder: middleware/)
function authMiddleware(req, res, next) {
    next();
}
```

```
# Folder structure (updated)
backend/
  models/
    User.js
  routes/
    authRoutes.js
  middleware/
    authMiddleware.js   <- naya folder + file, is session mein decide hua
```

**Next session mein karna hai:**
- `Authorization` header se token nikalna (`req.headers.authorization`)
- `Bearer ` prefix hatana
- `jwt.verify()` se token check karna
- Valid hone pe `next()`, invalid/missing hone pe error response