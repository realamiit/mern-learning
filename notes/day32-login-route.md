# Day 32 — Authentication Part 2: Login Route

## 🌳 Flow Overview (Tree Format)

```
LOGIN ROUTE SETUP
│
├── 1. Extract email + password from req.body
│     const { email, password } = req.body;
│
├── 2. Find user by email
│     User.findOne({ email: email })
│     → returns a single user object, OR null if no match
│
├── 3. Check if user exists
│     if (!user) → send "User not found", STOP here
│     (this check MUST happen before bcrypt.compare, or app crashes)
│
├── 4. Compare passwords (only reached if user exists)
│     bcrypt.compare(password, user.password)
│     → returns true or false (a Promise)
│
└── 5. Respond based on match
      isMatch === true  → "Login successful!"
      isMatch === false → "Wrong password"
```

---

## Concepts & Definitions

**`find()` vs `findOne()`** —
- `Question.find({...})` → always returns an **array** (even if 0 or 1 result)
- `User.findOne({...})` → returns a **single object**, or **`null`** if nothing matches — never an array. Used when we expect at most one match (e.g., email is unique per user).

**Why `bcrypt.compare()` is nested inside `User.findOne().then()`** — The `user` variable is only accessible **inside** the `.then()` callback where it was created (JavaScript scope). `bcrypt.compare(password, user.password)` needs `user.password`, so it must be written inside that same `.then()` block — writing it outside would cause `user is not defined`.

**Why the `if (!user)` check is critical** — `User.findOne()` returns `null` when no match is found. `null` has no properties — trying to access `user.password` when `user` is `null` throws:
```
TypeError: Cannot read properties of null (reading 'password')
```
This crashes the request with an ugly error instead of a clean message. The `if (!user)` check catches this case **before** reaching `bcrypt.compare()`, allowing a friendly "User not found" response instead of a crash.

---

## Code Reference

```javascript
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
            res.send("Login successful!");
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

**Q: `User.findOne()` agar match na mile to kya deta hai?**
A: **`null`** — ye database se aane wali raw value hai. "User not found" ek separate string hai jo humne khud `if (!user)` block ke andar likha hai; `null` aur "User not found" do alag cheezein hain.

**Q: `bcrypt.compare()` ka code `.then()` ke andar hi kyun likha, bahar kyun nahi?**
A: `user` variable sirf `User.findOne().then((user) => {...})` ke callback ke **scope ke andar** exist karta hai. Bahar likhne se `user is not defined` error aata, kyunki JavaScript scope ke bahar us variable ka koi wajood nahi hota.

**Q: `if (!user)` check hata dein to kya hoga?**
A: Agar email match na kare, `user` `null` hoga. Bina check ke, code seedha `bcrypt.compare(password, user.password)` pe pahunchेga, jaha `null.password` access karne ki koshish se app **crash** ho jaayega (`TypeError`), koi friendly message nahi milega.

---

## Mistake Boxes (actual mistakes made)

1. **`.then` vs `.than` typo:** `bcrypt.compare(...).than((isMatch) => {...})` likha था — `.than` koi valid method nahi hai, isse `TypeError: ...then(...).than is not a function` aata. Fixed to `.then`.

2. **Mock interview mein `null` vs custom message confuse hua:** Q1 mein "User not found" bola jab actual `User.findOne()` return value poocha gaya tha — `null` (raw DB return) aur "User not found" (humara khud likha message) alag cheezein hain, ye distinction clear karna zaroori hai.

3. **Mock interview mein error scenario galat samjha:** Bina `if (!user)` check ke, socha "User not found" hi aayega — actual mein app **crash** hota (TypeError), koi graceful message nahi aata. Ye important insight hai: validation checks isliye likhte hain taaki crashes na hon, sirf "nicer messages" ke liye nahi.

---

## Mock Interview — Actual Q&A (Score ~1/3, clarified after)

**Q1. `User.findOne()` match na mile to kya return karta hai?**
- *Student's answer:* "User not found" (❌ Galat — humara khud likha message bataya, DB ka actual return value nahi)
- *Polished answer:* `null` — humara code isko check karke apna khud ka message bhejta hai.

**Q2. `bcrypt.compare()` `.then()` ke andar kyun likha, bahar kyun nahi?**
- *Student's answer:* "Email check ke baad password check hota hai" (🟡 Partial — flow sahi bataya, scope ka technical reason missing)
- *Polished answer:* `user` variable sirf `.then()` ke scope ke andar accessible hai — bahar likhne se `user is not defined` error aata.

**Q3. Bina `if (!user)` check ke, galat email dene par kya hota?**
- *Student's answer:* "User not found aayega" (❌ Galat)
- *Polished answer:* App crash ho jaata — `TypeError: Cannot read properties of null (reading 'password')`, kyunki `null.password` access karne ki koshish hoti.

---

## Testing Verified (Postman)

| Scenario | Input | Response |
|---|---|---|
| Correct email + correct password | `test@example.com` / `mypassword123` | ✅ "Login successfull!" |
| Wrong/non-existent email | `test@exampl.com` (typo) | ✅ "User not found" |
| Correct email + wrong password | `test@example.com` / `mypassword23` | ✅ "Wrong password" |

---

## Syntax Reference Card

```javascript
// Find a single document (not an array)
User.findOne({ email: email })
  .then((user) => {
    if (!user) {
      return res.send("User not found");  // stop here if no match
    }
    // safe to access user.password below this point
  });

// Compare plain password to stored hash
bcrypt.compare(plainPassword, hashedPassword)
  .then((isMatch) => {
    // isMatch is true or false
  });
```

**Key rule:** Hamesha `if (!user)` (ya similar null-check) lagao `findOne()` ke baad, `bcrypt.compare()` ya koi bhi `user.xyz` access karne se **pehle** — warna null-reference crash ka risk hai.

---

## Pending / Next Session

- **JWT (JSON Web Token)** — login successful hone par ek token generate karna, taaki user baar-baar password na de
- **Protected routes** — kuch routes sirf logged-in users ke liye accessible banana
- Cleanup: "Eooro logging in" aur "successfull" jaise typos fix karna
- Future (deferred): GitHub contribution graph / coding platform submission tracking

# notes (https://docs.google.com/document/d/18zbllpnTxbwR9rU5DkXtOC42ls1yIWNneOokdJqys6w/edit?tab=t.0#heading=h.tycz366cn8s1)