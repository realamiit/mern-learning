# Day 25 — Gmail Email Alerts Setup (Nodemailer)

## Concepts Covered

**Nodemailer** — ek npm package jo Node.js se email bhejne ki capability deta hai (Gmail ya kisi bhi email service ke through). Ye sirf email bhejta hai jab isko call kiya jaye — khud se kabhi automatically nahi chalta.

**Nodemailer vs Cron Job** — Nodemailer email bhejta hai (action), Cron Job time ke basis pe automatically trigger karta hai (trigger). Automated daily alerts ke liye dono chahiye — Cron Job "kab bhejna hai" decide karega, Nodemailer "bhejne" ka kaam karega.

**Gmail App Password** — Gmail apna normal login password directly apps ko use karne nahi deta (security). Iske liye ek special 16-character "App Password" generate karna padta hai — ye sirf 2-Step Verification on hone ke baad available hota hai.

**dotenv package** — `.env` file ki values automatically load nahi hoti Node.js mein. `require("dotenv").config()` line chalani padti hai (kisi bhi file mein, jo pehle import ho) taaki `process.env.VARIABLE_NAME` se values access ho sakein poore app mein.

**Nodemailer Transporter** — `nodemailer.createTransport({...})` se ek "transporter" object banta hai jisme service (Gmail), aur auth credentials (`user`, `pass`) diye jaate hain. Isके baad `transporter.sendMail({...})` se actual email bhejte hain.

**HTML Email vs Plain Text** — Nodemailer mein `text` property se plain text email jaata hai, `html` property se formatted (styled) email — headings, colors, bold text waghera. Dono ek saath nahi dete, ek hi use hota hai.

---

## Syntax Reference Card

```javascript
// 1. .env file
GMAIL_USER=youremail@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop   // 16 characters, no spaces/quotes

// 2. server.js — imports and transporter setup
require("./db");   // dotenv.config() already runs inside db.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// 3. Function to send a reminder email
function sendReminderEmail(questionName) {
  transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: "DSA Revision Reminder",
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #333;">📚 Time to Revise!</h2>
        <p style="font-size: 16px;">Your scheduled revision is due for:</p>
        <p style="font-size: 18px; font-weight: bold; color: #4CAF50;">${questionName}</p>
        <p style="font-size: 14px; color: #777;">Keep up the consistency — head over to your DSA Tracker dashboard to mark it done.</p>
      </div>
    `,
  })
    .then(() => {
      console.log("Email Send Successfully!");
    })
    .catch((error) => {
      console.log("Email Sending Error:", error);
    });
}
```

---

## Confusion Boxes (Questions Amit Asked)

**Q: Nodemailer se hi kaam chal jayega, khud chalega?**
A: Nahi — Nodemailer sirf email bhejta hai jab isko call kiya jaye. Khud automatically time ke basis pe chalne ke liye alag se **Cron Job** chahiye hoga (agla topic).

---

## Mistake Boxes (Actual Mistakes Amit Ne Kiye)

**Mistake 1:** `nodemailer` package galat folder mein install kar diya (`02-nodejs/practice` ki jagah kisi aur folder mein socha) — turant clarify kiya aur sahi folder confirm kiya jahan actual working backend hai.

**Mistake 2:** Email function mein `to` field mein galti se password daal diya:
```javascript
// GALAT
to: process.env.GMAIL_APP_PASSWORD,
```
**Fix:** `to: process.env.GMAIL_USER` — `to` field mein hamesha email address jaana chahiye, credentials nahi.

**Mistake 3:** Template literal ke liye single quotes use kiye, backticks nahi:
```javascript
// GALAT — ${questionName} literal text ban jaata, variable value nahi
text: 'Time to revise: ${questionName}',
```
**Fix:** Backticks (`` ` ``) zaroori hain `${}` syntax ke liye — `` `Time to revise: ${questionName}` ``

**Mistake 4:** Typo — `consol.log` likha, `console.log` ki jagah. ReferenceError deta.

**Mistake 5 (Real debugging):** Pehla App Password use karne pe Gmail ne "Invalid login" error diya (`EAUTH`, code 535). Password length (16) aur email sahi the, lekin phir bhi fail ho raha tha.
**Fix:** Naya fresh App Password generate karke, screen se directly copy karke (typing nahi) `.env` mein update kiya — isse fix ho gaya. Lesson: agar credentials "sahi dikhte" hain phir bhi auth fail ho, ek fresh credential generate karke try karna reliable fix hai.

---

## Debugging Highlights

1. **Console.log se length verify kiya** — `process.env.GMAIL_APP_PASSWORD.length` print karke confirm kiya ki 16 characters hi hain (koi extra space/character nahi), taaki `.env` formatting ka issue rule out ho sake
2. **Fresh App Password regenerate karna** — jab formatting sahi hone ke baad bhi auth fail ho raha tha, purana password revoke karke naya banaya — isse issue resolve hua

**Key learning:** Authentication errors (`EAUTH`, `Invalid login`) ka matlab hamesha ye nahi ki tumhara code galat hai — credential khud corrupt/invalid ho sakta hai copy-paste ke dauraan, ya expire ho sakta hai. Fresh credential generate karna ek valid debugging step hai.

---

## Agla Step (Pending)

**Cron Job Setup** — `node-cron` package use karke, ek scheduled task banana hai jo **automatically, daily fixed time pe** check kare "kaun se questions aaj due hain" (due3/due7/due15/due30/dueCustom routes ka logic reuse karke), aur unke liye `sendReminderEmail()` call kare. Ye Day 26 mein cover hoga.