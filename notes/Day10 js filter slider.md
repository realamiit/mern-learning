# Day 10 — JavaScript: Project Filter & Testimonials Slider

> Learning journal — Portfolio Website Project
> Mentor: Claude | Student: Amit Gupta

---

## 🎯 Goal of the Day
1. Project filter tabs ko functional banana (All / Web / Java)
2. Testimonials slider banana (Next/Prev navigation)

---

## 🧠 Part 1: Filter.js — Click Events + data attributes

### Concept
Har filter button ka `data-filter` value, aur har project card ka `data-category` value — dono ko match karke cards show/hide karna.

```js
const filterBtn = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtn.forEach(function(btn) {
  btn.addEventListener('click', function() {
    const filterValue = btn.dataset.filter;

    projectCards.forEach(function(card) {
      if (filterValue === 'all' || card.dataset.category === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
```

### Key Points
- Har button pe **alag-alag** click listener lagta hai (loop se) — jab **specific** button click ho, sirf uska function chalta hai
- `btn.dataset.filter` → clicked button ka `data-filter` value
- `card.dataset.category` → us card ka `data-category` value
- `card.style.display = 'block'` / `'none'` → CSS property JS se set karna

### 🐛 Errors Mile
| Error | Reason | Fix |
|---|---|---|
| `card.computedStyleMap.display` | Galat API use kiya — yeh styles *read* karne ke liye hai, set karne ke liye nahi | `card.style.display` |
| `card.Style.display` (capital S) | JS case-sensitive hai — `Style` ≠ `style` | `card.style.display` (lowercase) |

💡 **Testing lesson:** "Web" aur "All" filter same result dete hain agar saare projects ek hi category ke hon — isliye lagta hai "kuch nahi ho raha". Asli test hamesha wo case try karo jisme **result alag** hona chahiye (jaise "Java" jab koi java project na ho — sab gayab ho jane chahiye).

---

## 🧠 Part 2: Slider.js — Testimonials Navigation

### HTML Structure
```html
<div class="testimonial-slider">
  <div class="testimonial-card active">...</div>
  <div class="testimonial-card">...</div>
  <div class="testimonial-card">...</div>
</div>
```

### CSS
```css
.testimonial-card { display: none; }
.testimonial-card.active { display: block; }
```
Sirf `active` class wala card dikhta hai.

### JS Logic
```js
const testimonials = document.querySelectorAll('.testimonial-card');
let currentIndex = 0;

function showTestimonial(index) {
  testimonials.forEach(function(card) {
    card.classList.remove('active');
  });
  testimonials[index].classList.add('active');
}

document.getElementById('nextBtn').addEventListener('click', function() {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
});

document.getElementById('prevBtn').addEventListener('click', function() {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
});
```

### Key Points
- `showTestimonial(index)` → pehle **sabhi** cards se `active` hatata hai, phir sirf ek mein **add** karta hai (isse hamesha sirf ek hi visible rehta hai)
- **Next (`% length`)** → last card ke baad wapas 0 pe loop (jaisa typewriter mein textIndex ke liye use kiya tha)
- **Prev (`- 1 + length) % length`)** → agar `currentIndex` 0 ho aur -1 karein toh negative number banta hai jo array mein invalid hai. `+ testimonials.length` add karke usse pehle positive banate hain, phir modulo se sahi range mein le aate hain

💡 **Pattern Reuse:** Modulo (`%`) trick ab **teesri baar** use hui hai (Day 9 typewriter mein textIndex ke liye, aur ab dono directions mein testimonials ke liye) — yeh ek common JS pattern hai **circular loop** (array ke end se wapas start pe jaane) ke liye.

---

## 📌 Key Takeaway
- `data-*` attributes (`dataset`) HTML aur JS ke beech data pass karne ka clean tarika hai — filter aur category dono isi se kaam karte hain
- `classList.add()` / `classList.remove()` se CSS classes ko dynamically control karna — animation aur UI state (jaise "active" card) dono ke liye same pattern
- Modulo (`%`) circular indexing ke liye standard trick hai — jahan bhi "end ke baad wapas start" wala loop chahiye