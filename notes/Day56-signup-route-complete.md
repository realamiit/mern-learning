# Day 56 — Blog App: Signup Route Complete (bcrypt hashing, save, try/catch)

## Full Form & Definitions

| Term | Full Form / Meaning | One-line Definition |
|---|---|---|
| bcrypt.hash() | Bcrypt hashing function | Plain password ko hashed string mein convert karta hai, salt rounds ke saath |
| Salt rounds | Hashing complexity factor | Number jo batata hai hashing kitni complex/secure hogi (higher = zyada secure, slow) |
| new Model() | Mongoose document instance | Schema se ek naya, in-memory document object banata hai (abhi DB mein save nahi hua) |
| .save() | Mongoose save method | In-memory document ko actually MongoDB database mein save (write) karta hai |
| 201 Created | HTTP status code | Jab POST request se naya resource successfully create ho jaye |
| 500 Internal Server Error | HTTP status code | Server-side/unexpected error ke liye (client ki galti nahi, server ki problem) |
| try/catch | Error handling block | `try` mein risky code, `catch` mein error handle — server crash hone se bachata hai |

---

## Concept Summary

### bcrypt.hash() — password hashing
- Syntax: `const hashedPassword = await bcrypt.hash(password, 10);`
- Do arguments: plain password, aur salt rounds (10 common value hai).
- `await` zaroori hai kyunki `bcrypt.hash()` Promise return karta hai — bina `await` ke, `hashedPassword` mein actual hashed string ki jagah ek unresolved Promise object aa jata.

### new User() + .save() — document create aur save
- `new User({ ... })` sirf ek **in-memory JavaScript object** banata hai — database mein save nahi karta.
- `await newUser.save()` actually MongoDB mein write karta hai. `await` zaroori hai kyunki ye asynchronous database operation hai.
- **Critical rule:** Password field mein **hashedPassword** use karna hai, plain `password` variable nahi — warna poora hashing ka purpose hi khatam ho jata hai.

### Status codes — 200 vs 201 vs 400 vs 500
- **200** — generic "OK" (kuch fetch/update hua)
- **201** — "Created" — jab POST se naya resource create hota hai (jaise naya user signup)
- **400** — "Bad Request" — client ki galti (jaise duplicate email se signup try karna)
- **500** — "Internal Server Error" — server-side/unexpected problem (client ki galti nahi)

### try/catch — signup route mein kyun zaroori
- `try/catch` ka **duplicate-email check ya validation se koi seedha lena-dena nahi hai** — wo already `if (existingUser)` se handle hota hai.
- `try/catch` sirf **unexpected errors** ke liye hai — jaise database connection achanak fail ho jaye, MongoDB server down ho jaye, ya koi aisi cheez fail ho jaye jo predict nahi ki thi.
- Bina `try/catch` ke, aisi situation mein server **crash** ho sakta hai ya request **hang** ho sakti hai — user ko kabhi response nahi milega.
- Pattern: poora route logic `try` block ke andar, aur `catch (error)` block mein error console log + `res.status(500).json(...)` error response.

---

## Confusion Box

**Q: Password field mein `password` (plain) ya `hashedPassword` use karna hai?**
A: Hamesha `hashedPassword` — plain password kabhi database mein save nahi hona chahiye, warna bcrypt hashing ka poora purpose hi khatam ho jata hai.

**Q: 200 aur 201 mein kya farak hai?**
A: 200 generic success hai. 201 specifically tab use hota hai jab POST request se ek **naya resource create** hua ho (jaise signup mein naya user banna).

**Q: try/catch kis cheez ke liye hai — validation ke liye ya unexpected errors ke liye?**
A: Sirf **unexpected errors** ke liye (jaise DB crash). Validation (jaise duplicate email check) alag se `if` statement se handle hoti hai, `try/catch` se uska koi seedha connection nahi hai.

---

## Mistake Box (actual mistakes made)

1. `password: password` (plain) likha newUser object mein — sahi hai `password: hashedPassword`, warna hashing ka fayda khatam.
2. Response status "success ke liye 200 use hota hai" bola — sahi hai **201** jab naya resource create ho raha ho.
3. "Somthins went wrong" — spelling galti, sahi hai "Something went wrong".
4. "rigesterd" — spelling galti do baar, sahi hai "registered" (R-E-G-I-S-T-E-R-E-D).
5. try/catch add karte waqt `/login` route mein galti se `/signup` ka poora logic paste kar diya, aur `mongoose.connect()` jaisi irrelevant cheez bhi mix kar di — concepts overlap ho gaye thake hue dimag ki wajah se.
6. Catch block ke liye status code poochne pe `400` bola — galat, 400 client-side error ke liye hai; sahi hai **500** server-side/unexpected error ke liye.
7. Mock interview mein try/catch ka role `existingUser` validation check se jod diya — do completely alag concepts hain, try/catch ka validation logic se koi seedha connection nahi hai.

---

## Mock Interview Record

**Q1: try/catch signup route mein kyun zaroori hai — agar na ho aur bcrypt.hash() ya newUser.save() fail ho jaye to kya hoga?**
- Amit's answer: "try catch signup route me zaroori is liye hai kyuki humein ek baar try karna hoga pehle ki user valid hai ya invalid hai ye pata karne ke liye... agar new user fail ho jaye to matlab hai ki user existing hai database mein"
- Score: 2/10
- Polished answer: "try/catch ka existingUser validation se koi lena dena nahi hai — wo already if statement se handle hota hai. try/catch sirf unexpected errors ke liye hai, jaise database connection achanak fail ho jana ya MongoDB server down ho jana. Bina try/catch ke, aisi situation mein server crash ho sakta hai ya request hang ho sakti hai — user ko response hi nahi milega. try/catch error ko gracefully catch karke ek proper 500 error response bhejta hai, server crash nahi hone deta."

**Session note:** Session ke end mein concepts thode mix hone lage (thakan ki wajah se lagta hai) — agle session ki shuruat mein try/catch ka role revise karna zaroori hai, taaki concept solid ho jaye.

---

## Syntax Reference Card

```javascript
// Complete signup route (Day 56 — final)
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        });

        await newUser.save();

        return res.status(201).json({ message: "User Registered Successfully!" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

// Login route — still a stub, to be built next session
router.post('/login', async (req, res) => {
    // login logic yahan aayega baad mein
});
```