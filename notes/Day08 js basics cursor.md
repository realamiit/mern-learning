# Day 8 — JavaScript Basics (Custom Cursor)

> Learning journal — Portfolio Website Project
> Mentor: Claude | Student: Amit Gupta

---

## 🎯 Goal of the Day
Samajhna ki JavaScript se ek custom cursor kaise banate hain jo mouse ke saath move kare.

---

## 🧠 New Concepts Seekhe

### 1. `document.querySelector()`
HTML se ek element dhoondh ke JS variable mein store karta hai — CSS selector jaisi hi syntax use hoti hai.

```js
const cursor = document.querySelector('.custom-cursor');
```
👉 Ab `cursor` variable us actual HTML div ko refer karta hai.

---

### 2. `addEventListener()`
"Jab bhi X action ho, Y function chalao" — is pattern ko event listener kehte hain.

```js
document.addEventListener('mousemove', function(e) {
  // yeh code chalega jab bhi mouse move hoga
});
```

- `document` → poora page (jahan event track karna hai)
- `'mousemove'` → event ka naam
- `function(e) {}` → jo function automatically trigger hoga

---

### 3. Event Object (`e`)
- Browser **khud** banata hai jab event hota hai — hum manually value set nahi karte.
- Isme event se related saari info hoti hai.
- Mouse events ke liye important properties:
  - `e.clientX` → mouse ki horizontal position (px mein)
  - `e.clientY` → mouse ki vertical position (px mein)

💡 **Yaad rakhne wali baat:** `e` ka naam tu khud choose karta hai (convention `e` ya `event`), lekin uski **value hamesha browser deta hai**.

---

### 4. `.style.property` se position set karna
JS se kisi element ki CSS property directly change kar sakte hain:

```js
cursor.style.left = "100px";
cursor.style.top = "50px";
```

⚠️ Number ke saath `"px"` add karna zaroori hai — warna CSS samajh nahi payega.

---

## 🔗 Final Code — cursor.js

```js
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', function(e) {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
```

**Logic Summary:**
1. HTML se cursor div pakड़a
2. Mouse move hone par event trigger hota hai
3. `e.clientX` / `e.clientY` se current mouse position milti hai
4. Wahi position cursor div ko de di — isliye div mouse ke saath chalta hua dikhta hai

---

## 🎨 Related CSS (animations.css mein)

```css
.custom-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: var(--accent-3);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
}
```

- `position: fixed` → taaki `left`/`top` se position control ho sake
- `pointer-events: none` → cursor div khud clicks ko block na kare
- `z-index: 9999` → hamesha sabse upar dikhe

---

## ❓ Checkpoint Q&A

**Q: `e` (event object) kaun deta hai — hum ya browser?**
**A:** Browser automatically deta hai jab event fire hota hai. Hum sirf function ke parameter ka naam likhte hain (`e`), value browser assign karta hai.

---

## 📌 Key Takeaway
JavaScript event-driven hota hai — hum "wait karo aur react karo" wala logic likhte hain (event listener), pura page baar-baar check nahi karte manually.