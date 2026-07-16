# Day 26 — node-cron (Automated Scheduling)

## Concepts & Definitions

**node-cron** — Ek npm package jo Node.js application ke andar ek scheduler chalata hai, jisse koi function ek defined time pattern (cron expression) ke hisaab se automatically, repeatedly execute hota hai.

**Cron Expression** — Ek 5-field string jo batati hai function kab-kab trigger hoga. Format:
```
minute   hour   day-of-month   month   day-of-week
  *        *          *          *          *
```

**24-hour format (military time)** — Time represent karne ka tareeka jisme din 0 se 23 tak ke hours mein baanta jaata hai, koi AM/PM label nahi hota. Cron expressions hamesha isी format mein likhe jaate hain, 12-hour (AM/PM) format mein nahi.

**`cron.schedule(expression, callback)`** — node-cron ka main function, jo 2 arguments leta hai:
1. Cron expression (string)
2. Callback function — jo schedule match hone par chalega

---

## Cron Expression — Field Reference

| Field | Range | Meaning |
|---|---|---|
| minute | 0-59 | kis minute pe chalega |
| hour | 0-23 | kis hour pe chalega (24-hour format) |
| day-of-month | 1-31 | mahine ki kaunsi tareek |
| month | 1-12 | saal ka kaunsa mahina |
| day-of-week | 0-7 | 0 aur 7 dono Sunday, 1=Monday...6=Saturday |

`*` ka matlab — "har value" (koi restriction nahi, wo field har baar match karega)
`*/N` ka matlab — "har N units pe" (jaise `*/5` = har 5 minute pe)

---

## 12-hour to 24-hour Conversion Rule

- **AM times** → convert nahi karna padta. Jaisa hai waisa hi likho.
  - 4 AM → `4`, 9 AM → `9`
- **PM times** → 12 add karo (except 12 PM).
  - 3 PM → `15` (3+12), 7 PM → `19` (7+12), 11 PM → `23` (11+12)
- **12 PM (noon)** → exception, seedha `12` hi likhte hain, 12+12=24 nahi karte.
- **12 AM (midnight)** → seedha `0` likhte hain.

---

## Syntax Reference Card

```javascript
const cron = require('node-cron');   // package import

cron.schedule('30 7 * * *', () => {
  // ye function har roz 7:30 AM (24-hour format) pe chalega
  sendReminderEmail();
});
```

Common examples:
```
30 7 * * *     → roz subah 7:30 AM
0 19 * * *     → roz sham 7:00 PM (19 = 7 PM in 24-hr)
0 0 1 * *      → har month ki 1st tareek, midnight (12:00 AM)
0 9 * * 1      → har Monday subah 9:00 AM
*/5 * * * *    → har 5 minute pe (testing ke liye useful)
```

---

## Confusion Boxes

**Q: node-cron aur cron expression ke "5 fields" vs `cron.schedule()` ke "arguments" mein kya farak hai?**
A: Ye do alag cheezein hain. Cron expression ek **string** hai jiske andar 5 fields hoti hain (minute, hour, day-of-month, month, day-of-week). `cron.schedule()` ek **function** hai jo sirf 2 arguments leta hai — wo poori expression string (pehla argument) aur ek callback function (doosra argument). Expression string pehle argument ke andar jaati hai.

**Q: Agar cron ka time already nikal chuka ho (server abhi 2:17 PM pe start hua, aur cron 2:35 PM ka set kiya), to kya wo turant trigger hoga?**
A: Nahi, agar time set kiya gaya ho lekin galat AM/PM interpretation ki wajah se already nikal chuka ho (jaise 24-hour format na samajhne ki wajah se), to wo agle din us time ka wait karega — turant trigger nahi hoga.

**Q: Agar server band (stop) kar diya jaaye, to scheduled cron job phir bhi background mein chalta rahega?**
A: Nahi. node-cron koi OS-level ya independent background process nahi hai — ye Node.js process ke andar hi chalta hai. Agar Node process (server) band ho jaaye, to cron scheduler bhi turant khatam ho jaata hai.

---

## Mistake Boxes (actual mistakes made)

1. **Typo:** `require('node-corn')` likha tha instead of `require('node-cron')` — "corn" (makka) aur "cron" (scheduler) alag words hain, spelling confuse ho gayi thi. Error: `Cannot find module 'node-corn'`.

2. **12-hour vs 24-hour format confusion (main bug):** Current time dopahar **2:17 PM** tha, lekin cron expression mein hour field pe seedha `2` likh diya (`'35 2 * * *'`). Cron isse 24-hour format mein leta hai, isliye usne **raat/subah 2:35 AM** samjha — jo abhi se ~12 ghante door tha. Isliye schedule turant trigger nahi hua. Fix: PM time ko 24-hour format mein convert karna zaroori hai (2 PM → 14).

3. **Leftover testing code:** `app.listen()` ke callback ke andar `sendReminderEmail("Two Sum");` line reh gayi thi (Day 25 ki testing se) — ye server start hote hi turant email bhej deti thi, jisse pehle confusion hua ki email kahan se aa rahi hai (cron se ya kisi aur jagah se). Root cause dhoondhne ke liye poori file dekhni padi. Fix: ye standalone call hata di gayi.

4. **Missing argument in cron callback:** `sendReminderEmail()` function `questionName` parameter leta hai, lekin cron ke andar bina argument diye call kiya gaya (`sendReminderEmail();`). Isse email body mein `${questionName}` ki jagah "undefined" print hoga — abhi tak pending fix hai.

---

## Mock Interview — Actual Q&A (Round 1 — Score 2/5)

**Q1. node-cron package kis problem ko solve karta hai? Ye Nodemailer se kaise different hai?**
- *Student's answer:* node-cron trigger karta hai kab bhejna hai, Nodemailer us trigger ko accept karke email bhejta hai, dono package hain.
- *Verdict:* ✅ Correct

**Q2. Cron expression mein kitni fields hoti hain, aur unka order kya hai?**
- *Student's answer:* (Galat — `cron.schedule()` ka structure describe kiya, expression ki fields nahi)
- *Polished answer:* Cron expression mein 5 fields hoti hain, order: `minute hour day-of-month month day-of-week`.

**Q3. `0 0 1 * *` kab trigger hoga?**
- *Student's answer:* Har month ki 1st tareek, midnight ko. ✅ Correct

**Q4. `cron.schedule()` ke kitne arguments hote hain?**
- *Student's answer:* (Galat — 5 arguments bola, expression ki fields se confuse ho gaye)
- *Polished answer:* 2 arguments — (1) cron expression string, (2) callback function.

**Q5. Har Monday subah 9 baje ka expression?**
- *Student's answer:* `0 9 0 0 1` (Galat — day-of-month aur month mein `0` likha, jo invalid hai)
- *Polished answer:* `0 9 * * 1` — day-of-month aur month mein `*` hona chahiye jab koi restriction na ho; `0` invalid range hai.

---

## Mock Interview — Actual Q&A (Round 2 — Score 3/4)

**Q1. `cron.schedule()` ke arguments?**
- *Student's answer:* 2 arguments — cron expression string + callback function. ✅ Correct

**Q2. Hour field mein `14` ka matlab (12-hour format mein)?**
- *Student's answer:* 2 PM ✅ Correct

**Q3. Server band hone par cron background mein chalta rahega?**
- *Student's answer:* Nahi, kyunki server hi band ho jayega to background mein message kaise jayega. ✅ Correct
- *Polished answer:* Nahi — node-cron Node.js process ke andar hi chalta hai; process stop hote hi scheduler bhi khatam ho jaata hai, koi independent OS-level background service nahi hai.

**Q4. Aaj wale bug (2 AM vs 2 PM) ka root cause?**
- *Student's answer:* (Galat example diya — AM ko convert karne ki baat ki, jabki AM convert nahi hota)
- *Polished answer:* Hour field mein `2` likha jo dopahar 2 PM ka matlab tha, lekin cron 24-hour format mein leta hai isliye usne raat 2 AM samjha — PM ko 24-hour format mein convert karna (12 add karna) bhool gaya tha.

---

## Pending Fix (next session)

- `cron.schedule()` ke andar `sendReminderEmail()` ko bina argument ke call kiya ja raha hai — isse `questionName` `undefined` aayega email body mein. Ise MongoDB se actual due question fetch karke dynamically pass karna hoga.
- MongoDB connection error intermittently aaya tha (`MongooseServerSelectionError`) — ek baar successful bhi hua bina kuch fix kiye. Iska pattern track karna hoga agar dobara aaye.