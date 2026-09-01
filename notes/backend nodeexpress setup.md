# Day 13 — Backend Basics: Node.js + Express Server Setup

> Learning journal — Portfolio Website Project
> Mentor: Claude | Student: Amit Gupta

---

## 🎯 Goal of the Day
Phase 4 (Backend) shuru karna — Node.js project initialize karna aur ek basic Express server banana.

---

## 🧠 Concept: Frontend vs Backend

- **Frontend** (HTML/CSS/JS) → user ke **browser** mein chalta hai. Website kholte hi browser khud files download karke run karta hai.
- **Backend** (Node.js/Express) → ek **server** pe chalta hai. Iska kaam: data receive karna (jaise contact form), database mein save karna, frontend ko data bhejna.

💡 **Analogy:** Frontend = restaurant ka dining area (customer-facing), Backend = kitchen (actual processing kaam).

---

## 🧠 Concept: Node.js aur npm

- **Node.js** → JavaScript ko browser ke bahar, seedha computer/server pe chalane deta hai
- **npm** (Node Package Manager) → Node.js ke saath aata hai, packages/libraries install karne ke liye use hota hai

### `npm init -y`
Ek `package.json` file banata hai — project ka "identity card": naam, version, aur kaunse packages (dependencies) install hain, sab record karta hai. `-y` matlab sabhi setup questions ka default answer "yes" maan lo.

### `npm install express`
Express library download karke project mein daal deta hai.
- `node_modules` folder banta hai (Express + uski dependencies) — **bahut bada hota hai**
- `package.json` ke "dependencies" mein Express add ho jata hai

⚠️ **Important:** `node_modules` ko kabhi GitHub pe push nahi karte — `.gitignore` mein `node_modules` likh dete hain, taaki Git use track na kare. Koi bhi `npm install` chala ke isse dobara generate kar sakta hai `package.json` se.

---

## 🧠 Concept: Basic Express Server

```js
const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Key Points
- `require('express')` → Node.js mein import karne ka tarika (browser mein `<script>` tags, Node.js mein `require()`)
- `express()` → ek naya "app" object banata hai — yeh poora server represent karta hai
- `PORT` → server kaunse "darwaze" (port number) pe chalega (yahan 5000)
- `app.get('/', (req, res) => {...})` → ek **route** define karta hai: jab browser `/` (homepage) GET request se khole, yeh function chalega
  - `req` → request object (browser ne kya bheja)
  - `res` → response object (hum browser ko kya wapas bhejein)
  - `res.send(...)` → browser ko text response bhejta hai
- `app.listen(PORT, callback)` → server ko us port pe start karta hai, successfully start hone par callback chalta hai

### Server Chalane Ka Command
```bash
node server.js
```
Terminal mein `Ctrl + C` se server band kar sakte hain.

---

## 📌 Key Takeaway
Backend server banane ke 4 basic steps: (1) Express import karo, (2) app banao, (3) routes define karo (URL pe kya response dena hai), (4) server ko ek port pe listen karwao. Yehi structure har Express backend ka foundation hota hai — aage jitne bhi routes (jaise `/api/contact`) banayenge, sab isi `app` object pe add honge.