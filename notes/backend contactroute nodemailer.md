# Day 15 — Backend: Contact Route + Nodemailer Email

> Learning journal — Portfolio Website Project
> Mentor: Claude | Student: Amit Gupta

---

## 🎯 Goal of the Day
1. Contact form ka data receive karke MongoDB mein save karna
2. Email notification bhejna jab bhi naya message aaye

---

## 🧠 Concept: POST Route + Middleware

Ab tak sirf **GET** route tha (data lene ke liye). Ab chahiye **POST** route — data bhejne ke liye (jaisa form submit).

```js
app.use(express.json());
```
Yeh middleware zaroori hai — jab frontend JSON data bheje, isko JS object mein convert karta hai taaki `req.body.name` jaisa easily access ho sake. Yeh line **routes se pehle** honi chahiye.

---

## 🧠 Concept: Contact Route (Full Flow)

```js
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    await transporter.sendMail({...});

    res.status(200).json({ success: true, message: 'Message saved successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Something went wrong' });
  }
});
```

### Key Points
- `const { name, email, message } = req.body` → **destructuring**: `req.body` object se seedha 3 variables nikal leta hai
- `new Message({...})` → Model se naya document banata hai (abhi memory mein, DB mein nahi)
- `await newMessage.save()` → ab actually database mein save karta hai
- `try/catch` → agar `try` ke andar koi error aaye (DB down, etc.), poora server crash hone ke bajaye `catch` wala code chalta hai
- `res.status(200/500).json({...})` → response bhejta hai, saath mein HTTP status code (200 = success, 500 = server error)

⚠️ **Order matters:** Saari `require()` lines sabse upar, phir `app`/`PORT` setup, phir `app.use()` middleware, phir DB connection, phir routes, aur `app.listen()` sabse end mein. JS top-se-bottom chalta hai — kisi variable ko use karne se pehle define karna zaroori hai.

---

## 🧠 Concept: Nodemailer (Gmail Se Email Bhejna)

### Gmail App Password
Normal Gmail password se email nahi bhej sakte (security) — **App Password** chahiye:
1. Google Account → Security → 2-Step Verification ON karo
2. Security → App Passwords → naam do → Generate
3. 16-character password milta hai, ek hi baar dikhta hai

### Setup Code
```js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```
- `createTransport({...})` → ek "postman" banata hai jo emails bhejega
- `auth` → email + App Password, dono `.env` mein rakhte hain (secrets kabhi code mein direct nahi)

### Email Bhejna
```js
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.EMAIL_USER,
  subject: 'New Contact Form Message',
  text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
});
```

---

## 🧠 New Concept: Template Literals (Backticks)

```js
`Name: ${name}`   // ✅ Sahi — backtick ke andar ${} se variable insert hota hai
'Name: ${name}'   // ❌ Galat — single quote mein ${name} literal text ban jata hai, variable nahi
```

- Backtick (`` ` ``) key Tab ke upar, tilde (`~`) ke sath hoti hai
- `${variableName}` se seedha variable ki value string ke andar daal sakte hain — `+` se jodne ki zaroorat nahi
- `\n` → naya line (line break)

---

## 🐛 Errors Mile Aur Fix Kiye

| Error | Reason | Fix |
|---|---|---|
| `app.post()` code `app` banne se pehle likha | JS top-se-bottom chalta hai — `app` define hone se pehle use nahi ho sakta | Saari requires/setup upar, routes baad mein |
| Duplicate `require('mongoose')` etc. | Copy-paste karte waqt same line do baar aa gayi | Duplicate lines delete ki |
| `await transporter.sendMail()` route ke bahar | `await` sirf `async function` ke andar chalta hai | Code ko `app.post()` ke andar move kiya |
| Single quotes mein `${name}` | Template literal syntax sirf backticks ke saath kaam karta hai | Backticks use kiye |

---

## 📌 Key Takeaway
1. Backend ka poora flow: **request aana → validate/process karna → database mein save karna → response bhejna** — yeh pattern har CRUD operation mein repeat hota hai
2. `try/catch` production code mein essential hai — kisi bhi async operation (DB, email, API) ke fail hone par poora server crash nahi hona chahiye
3. Secrets (`EMAIL_PASS`, `MONGO_URI`) hamesha `.env` mein — App Password jaisi cheezein bhi normal password jitni hi sensitive hain