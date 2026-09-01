# Day 11 — JavaScript: GitHub Contributions Grid (Fetch API) ⭐

> Learning journal — Portfolio Website Project
> Mentor: Claude | Student: Amit Gupta

---

## 🎯 Goal of the Day
GitHub ke real contribution data ko API se fetch karke ek visual grid banana — bilkul GitHub profile jaisa.

---

## 🧠 New Concept: Asynchronous JavaScript

### Problem
Ab tak jo bhi JS likha, sab **turant** chalta tha. Lekin API se data mangna alag hai — internet pe request jati hai, response aane mein time lagta hai. JS single-threaded hai (ek time pe ek kaam), isliye agar seedha "wait" kare toh **poora page freeze** ho jayega.

### Solution: `async` / `await` / `fetch()`

```js
async function getData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  console.log(data);
}
getData();
```

- `async function` → batata hai yeh function "wait kar sakta hai" bina page freeze kiye
- `fetch(url)` → kisi URL se data mangne ka built-in function
- `await` → "yahan ruk ja jab tak response na aaye, lekin baaki page chalte rehne do"
- `response.json()` → raw response ko JS object mein convert karta hai (yeh bhi async hai, isliye yahan bhi `await`)

💡 **Real-world API used:** `https://github-contributions-api.jogruber.de/v4/realamiit` — GitHub ki khud ki API complex auth maangti hai, isliye ek free public wrapper API use kiya.

---

## 🧠 Data Structure Samajhna

```json
{
  "total": {"2025": 87, "2026": 898},
  "contributions": [
    {"date": "2026-01-01", "count": 0, "level": 0},
    {"date": "2026-01-03", "count": 1, "level": 1}
  ]
}
```

- `contributions` ek **array** hai — har din ke liye ek object
- `level` (0-4) → GitHub jaisi color intensity ke liye use hota hai

---

## 🧠 New Concept: Dynamic HTML Creation (`createElement`)

Ab tak humne HTML manually likha tha. Ab JS se **naye elements khud banate** hain data ke hisaab se:

```js
async function getGithubData() {
  const response = await fetch('https://github-contributions-api.jogruber.de/v4/realamiit');
  const data = await response.json();

  const grid = document.getElementById('contributions-grid');

  data.contributions.forEach(function(day) {
    const box = document.createElement('div');
    box.classList.add('contribution-box');
    box.classList.add('level-' + day.level);
    box.title = day.date + ': ' + day.count + ' contributions';
    grid.appendChild(box);
  });
}

getGithubData();
```

### Key Points
- `document.createElement('div')` → naya, khaali div **banata** hai (abhi sirf memory mein, HTML mein nahi)
- `.classList.add(...)` → styling classes add karta hai
- `.title = "..."` → hover tooltip set karta hai
- `.appendChild(box)` → naye div ko **actual page mein daalta hai** — yehi step use screen pe dikhata hai

💡 **Pattern:** `contributions.forEach()` loop se, har din ke data se ek chhota box banaya — 365 din ka data, 365 boxes, automatically.

---

## 🎨 CSS — Level-based Coloring

```css
#contributions-grid {
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  gap: 4px;
}
.level-0 { background-color: #2d2d2d; }
.level-1 { background-color: #6b2d22; }
.level-2 { background-color: #8b3a28; }
.level-3 { background-color: #c47840; }
.level-4 { background-color: #ffb380; }
```
JS ne class add ki (`level-3` jaisi), CSS ne uska color decide kiya — same pattern jo `.reveal.active` mein tha (Day 9).

---

## 🐛 Debugging — Real World Session

### Bug 1: `drawParticles is not defined`
**Reason:** Purana function rename kiya tha (`drawParticles` → `animateParticles`), lekin end mein purana call (`drawParticles();`) delete karna bhool gaye — dono lines reh gayi thi.
**Fix:** Extra/purani call wali line delete ki.

### "Bug" jo bug nahi tha: `console.log` data nahi dikh raha tha
- Console mein data nahi dikha, lekin koi error bhi nahi tha
- **Network tab** se check kiya → Status Code `200 OK` mila → matlab request successful thi, data sahi aa raha tha
- Response tab mein actual JSON data confirm hua
- **Lesson:** Console.log kabhi display/filter settings ki wajah se chhup sakta hai — lekin agar Network tab mein Status `200` hai, toh code/API sahi kaam kar raha hai. Real problem check karne ka sabse reliable tarika **Network tab** hai, sirf console pe depend mat karo.

---

## 📌 Key Takeaway
1. **Async code** (`async/await/fetch`) real APIs se data lane ka standard tarika hai
2. **Network tab** debugging ka sabse powerful tool hai jab console confusing lage — Status Code turant batata hai request success hui ya nahi
3. **`createElement` + `appendChild`** se JS data ke basis pe khud HTML bana sakta hai — yeh pattern bade dynamic websites (jaise social media feeds) mein har jagah use hota hai