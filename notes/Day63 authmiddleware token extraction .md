# Day 63 — Blog App: authMiddleware Token Extraction

## Full Form & Definitions

| Term | Full Form / Meaning | One-line Definition |
|---|---|---|
| req.headers | Request Headers object | Saare incoming HTTP headers ka object, keys hamesha lowercase mein |
| .split() | String split method | String ko ek separator (jaise space) ke basis pe tod ke array banata hai |
| Bearer token | Bearer authentication scheme | `Authorization` header ka standard format: `Bearer <token>` |
| jwt.verify() | JWT Verify function | Token ko secret key se check karta hai — genuine hai aur expire nahi hua |

---

## Concept Summary

### Header se token extract karna — step by step
1. `req.headers.authorization` — header ka value nikalta hai (hamesha **lowercase** property name, chahe client ne kaise bhi bheja ho).
2. Value hoti hai format mein: `"Bearer eyJhbGc..."` — do parts, space se separated.
3. `.split(" ")` se string ko array mein todte hain: `["Bearer", "eyJhbGc..."]`
4. `parts[0]` = `"Bearer"` (label), `parts[1]` = actual token — **index 1** chahiye, 0 nahi.

### Agla pending step (verify karna)
- `jwt.verify(token, process.env.JWT_SECRET)` — token ko usi secret key se verify karna hai jo `jwt.sign()` mein use hui thi.
- Verify successful hone pe decoded payload milta hai (jisme `userId` hota hai).
- Fail hone pe error throw hota hai — isliye `try/catch` zaroori hoga is step ke around.
- Valid hone pe `next()` call karna hai (request aage badhne dena), invalid/missing token pe error response (401/403 status).

---

## Confusion Box

**Q: parts[0] ya parts[1] — kaunsa actual token hai?**
A: `parts[0]` = `"Bearer"` (sirf label), `parts[1]` = actual JWT token. Index **1** use karna hai.

**Q: req.headers.Authorization (capital A) ya req.headers.authorization (lowercase)?**
A: Hamesha **lowercase** — `req.headers` object mein saari header keys automatically lowercase store hoti hain, chahe client ne kaise bhi capitalize karke bheja ho.

---

## Mistake Box (actual mistakes made)

1. `req.headers.Authorization` (capital A) likha — sahi hai lowercase `req.headers.authorization`.
2. `parts[0]` bola jab actual token wala index poocha gaya — sahi hai `parts[1]` (index 0 pe "Bearer" label hota hai).
3. Session mein baar-baar galat/purani files (DSA Tracker ka server.js, User.js model, authRoutes.js jo already complete tha) paste ki gayi jab specific chhote sawal poochte the — focus bhatakta raha, khaas kar session ke dusre half mein.
4. Session mein kaafi tangents aaye (business branding advice request, LinkedIn project description, HP LIFE certificate, hackathon prompt request) — inhe alag conversations mein handle karne ki salah di gayi, taaki coding session ka flow na tootey.

---

## Mock Interview Record
(Is session mein mock interview nahi liya gaya — `authMiddleware` abhi incomplete hai. `jwt.verify()` complete hone ke baad, poore middleware flow pe agle session mein brutal mock interview hoga.)

---

## Syntax Reference Card

```javascript
// authMiddleware.js — Day 63 tak (token extraction complete)
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    const parts = authHeader.split(" ");
    const token = parts[1];
    next();
}
```

**Agla session — pending steps:**
```javascript
// Ye add karna hai, try/catch ke saath:
try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded mein userId milega — req.userId = decoded.userId; jaisa kuch aage use hoga
    next();
} catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
}
```