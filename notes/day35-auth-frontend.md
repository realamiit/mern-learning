# Day 35 — Auth Frontend: AuthForm + handleSubmit + JWT Storage

## Concepts Covered (Full Form + Definition)

- **JSX (JavaScript XML)** — HTML jaisi syntax jo JavaScript ke andar likhi jaati hai, React components ka UI describe karne ke liye.
- **useState** — React Hook jo component ke andar local state (data jo change ho sakta hai) manage karta hai.
- **e.preventDefault()** — Event object ka method jo browser ke default behavior (jaise form submit pe page reload) ko rokta hai.
- **fetch API** — Browser ka built-in method jo HTTP requests bhejne ke liye use hota hai (GET, POST, etc.).
- **JSON.stringify()** — JavaScript object ko JSON-formatted string mein convert karta hai (HTTP body sirf string carry karta hai).
- **response.json()** — Fetch response ko JavaScript object mein parse karta hai (async operation, await lagta hai).
- **localStorage** — Browser ka built-in key-value storage jo data ko permanently store karta hai (jab tak manually clear na ho).
- **res.send() vs res.json()** — Express ke response methods; res.send() raw/mixed response bhejta hai, res.json() explicitly JSON format + correct Content-Type header set karta hai.
- **HTTP Status Codes** — Response ke saath bheja gaya number jo request ka result batata hai (200 = success, 401 = unauthorized, 404 = not found, 500 = server error).
- **response.ok** — Fetch API ka boolean property, true jab status code 200-299 range mein ho.
- **Authorization Header** — HTTP header jisme JWT token bheja jaata hai protected routes access karne ke liye, format: `Bearer <token>`.

---

## Confusion Box (Questions Asked + Answers)

**Q: `/AuthForm` route pe direct browser mein jaane se kyun kaam nahi kiya?**
A: React mein bina `react-router-dom` setup ke, URL paths automatically components se map nahi hote. Component ko `App.jsx` mein import karke render karna padta hai, aur root URL (`/`) pe access karna padta hai.

**Q: Backend deploy kiya hua hai Render pe, to localhost pe test kyun kar rahe hain?**
A: Deployment aur local development alag purposes serve karte hain. Local backend (`node express-server.js`) fast testing ke liye use hota hai; Render wala deployed backend production users ke liye hai. Dono independent hain — testing ke liye local backend chalate hain.

**Q: localStorage mein token kitni der tak rehta hai?**
A: localStorage ka koi automatic expiry nahi hota — data hamesha rehta hai jab tak manually clear na ho. JWT token khud `expiresIn` (jaise "1h") ke baad backend ke liye invalid ho jaata hai, lekin localStorage se automatically delete nahi hota.

---

## Mistake Box (Actual Mistakes Made)

1. **Component naam mismatch:** `AuthFrom` likha tha (typo) instead of `AuthForm` — import/export mismatch ka risk.
2. **`onclick` lowercase:** React mein JSX event handlers camelCase hote hain (`onClick`), lowercase `onclick` kaam nahi karta.
3. **`handleSubmit` function ka closing brace missing:** `catch` block ke baad `};` nahi likha, jisse `return()` JSX function ke andar hi confuse ho gaya — resulted in stray extra `}` at file end.
4. **`"Contain-Type"` typo:** Sahi header name `"Content-Type"` hai.
5. **Galat port assume kiya:** Backend `.env`/code mein port 3000 pe chal raha tha, lekin `BASE_URL` mein `5000` likh diya tha — `ERR_CONNECTION_REFUSED` aaya.
6. **`res.send()` use kiya JSON expect karte hue:** Backend `res.send("string")` bhej raha tha, frontend `response.json()` se parse karne ki koshish kar raha tha — `SyntaxError: Unexpected token` aaya. Fix: `res.json({...})` use karna.
7. **Multiple signup requests:** Testing ke dauran button ko multiple baar click kiya, jisse 10 duplicate requests gayi (bug nahi, manual behavior tha).

---

## Mock Interview — Day 35

**Q1: `fetch()` mein `Content-Type: application/json` header kyun zaroori hai?**
- Amit's answer: "Server ko batata hai data JSON format mein hai ya raw" (partial, technical mechanism missing)
- Polished answer: Express ka `express.json()` middleware Content-Type header check karta hai ye decide karne ke liye ki request body parse kare ya nahi. Header missing hone par `req.body` undefined/empty aa jaata hai, jisse request silently fail hoti hai.
- Score: 6/10

**Q2: `res.send()` aur `res.json()` mein exact fark kya hai?**
- Amit's answer: Confused database storage format ke saath (galat)
- Polished answer: `res.json(object)` — object ko JSON string mein convert karta hai AUR `Content-Type: application/json` header automatically set karta hai. `res.send()` string ke liye raw text (Content-Type: text/html) bhejta hai. Database storage se in dono ka koi lena-dena nahi hai.
- Score: 3/10

**Q3: `response.ok` kis range ke liye true hota hai?**
- Amit's answer: 200-299 range, 401 pe false — correct
- Polished answer: Same as above, fully correct.
- Score: 10/10

**Q4: localStorage mein token store karne ke baad browser band karke dobara kholne pe token rahega?**
- Amit's answer: "Hum time duration dete hain isliye utna time tak rehta hai" (galat — localStorage aur JWT expiry ko mix kiya)
- Polished answer: localStorage hamesha persist karta hai jab tak manually clear na kiya jaye — koi automatic expiry nahi. JWT token khud apni `expiresIn` duration ke baad backend ke liye invalid ho jaata hai, lekin localStorage entry khud delete nahi hoti.
- Score: 2/10

**Q5: JWT token localStorage se next steps mein kahan use hoga?**
- Amit's answer: "Baar baar password nahi dena padega" (directionally sahi, but header format missing)
- Polished answer: Token ko protected routes access karte waqt `Authorization` header mein bhejna padta hai, format: `Authorization: Bearer <token>`. Ye backend ke `authMiddleware.js` mein verify hota hai.
- Score: 5/10

**Total: 26/50 — Needs revision on res.send()/res.json() and localStorage persistence concepts.**

---

## Syntax Reference Card

```js
// Fetch POST request with JSON body
const response = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
});
const data = await response.json();

// localStorage
localStorage.setItem("token", data.token);
localStorage.getItem("token");
localStorage.removeItem("token");

// Express response methods
res.json({ message: "success" });          // JSON response
res.status(401).json({ message: "fail" }); // JSON response with status code

// Sending token in future protected requests
fetch(url, {
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
});
```