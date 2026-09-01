# Day 9 — JavaScript: Scroll Reveal, Typewriter & Skill Bar Animation

> Learning journal — Portfolio Website Project
> Mentor: Claude | Student: Amit Gupta

---

## 🎯 Goal of the Day
1. Scroll karte waqt sections ko fade-in karna
2. Hero mein typewriter effect banana
3. Skill bars ko scroll pe animate karna

---

## 🧠 Part 1: Scroll Reveal — `IntersectionObserver`

### Concept
`IntersectionObserver` ek browser API hai jo batata hai **"yeh element abhi screen pe visible hai ya nahi"** — bina humein manually scroll position calculate kiye.

```js
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
});

revealElements.forEach(function(el) {
  observer.observe(el);
});
```

### Key Points
- `querySelectorAll()` → sabhi matching elements ki list deta hai (`querySelector` sirf ek deta hai)
- `new IntersectionObserver(callback)` → ek "watcher" banata hai
- `entries` → observe ho rahe elements ki current status ki list
- `entry.isIntersecting` → `true` agar element abhi screen pe dikh raha hai
- `entry.target` → wo actual HTML element
- `.observe(el)` → element ko watch list mein daalta hai

### CSS Connection (Day 7 se)
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}
.reveal.active {
  opacity: 1;
  transform: translateY(0);
}
```
JS sirf `active` class **add** karta hai — animation CSS transition khud handle karta hai.

---

## 🧠 Part 2: Typewriter Effect — `setTimeout` Recursive Loop

### Concept
`setTimeout(function, delay)` — kisi function ko **kuch der baad** chalata hai. Isko **khud ko dobara call karने** ke liye use karke, hum letter-by-letter typing simulate kar sakte hain.

```js
const texts = ["Web Developer", "BCA Student", "Problem Solver"];
let textIndex = 0;
let charIndex = 0;
const typewriterEl = document.getElementById('typewriter');

function type() {
  if (charIndex < texts[textIndex].length) {
    typewriterEl.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}

function erase() {
  if (charIndex > 0) {
    typewriterEl.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(type, 500);
  }
}

type();
```

### Key Points
- `texts[textIndex]` → array se current word nikalta hai
- `.charAt(charIndex)` → string ke ek specific position ka letter deta hai
- `.substring(0, charIndex - 1)` → string ka shuru se lekar ek letter kam tak ka hissa deta hai (erase ke liye)
- `textIndex = (textIndex + 1) % texts.length` → **modulo trick**: last word ke baad wapas pehle word pe loop ho jata hai (0 → 1 → 2 → 0 → 1...)
- ⚠️ **Bug jo mila:** Function define karne ke baad use **call** karna bhoolna — `type()` line missing thi end mein. Function sirf "define" hone se nahi chalta, explicitly call karna padta hai.

---

## 🧠 Part 3: Skill Bar Animation — Reusing `IntersectionObserver`

### Concept
Same `IntersectionObserver` pattern, lekin ab class add karne ki jagah **width set** kar rahe hain, aur value `data-percent` attribute se aa rahi hai.

```js
const skillBars = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      const percent = entry.target.dataset.percent;
      entry.target.style.width = percent + "%";
    }
  });
});

skillBars.forEach(function(bar) {
  skillObserver.observe(bar);
});
```

### Key Points
- `entry.target.dataset.percent` → `data-percent="90"` se seedha `"90"` string milta hai
- `.style.width = percent + "%"` → width ko `"90%"` set karta hai
- CSS mein `transition: width 1.5s ease` hona chahiye taaki yeh **smoothly grow** ho, achanak jump na kare

```css
.skill-fill {
  width: 0%;
  transition: width 1.5s ease;
}
```

💡 **Important Learning:** Ek hi concept (`IntersectionObserver`) do alag jagah, do alag kaam ke liye reuse kiya — yeh dikhata hai ki concept sirf yaad nahi, **samajh mein aaya** hai.

---

## 🐛 Errors Mile Aur Fix Kiye

| Error | Reason | Fix |
|---|---|---|
| Duplicate `<section id="about">` ban gaya | "Class add karo" ko "naya section banao" samajh liya | Existing tag mein hi class add ki, naya section delete kiya |
| `class="reveal>` (quote missing) | Closing `"` likhna bhool gaye | `class="reveal">` |
| Typewriter kuch nahi ho raha tha | `type()` function define kiya but call nahi kiya | File ke end mein `type();` add kiya |

---

## 📌 Key Takeaway
`IntersectionObserver` ek **reusable pattern** hai — "scroll pe kuch trigger karna" wale kisi bhi kaam ke liye (reveal animation, counters, lazy-loading images, etc.) yeh same approach kaam aata hai: observe karo, `isIntersecting` check karo, action lo.