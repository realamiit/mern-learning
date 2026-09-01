# Day 8 (Part 2) — JavaScript: Canvas Particles Animation

> Learning journal — Portfolio Website Project
> Mentor: Claude | Student: Amit Gupta

---

## 🎯 Goal of the Day
Canvas API se ek floating particles background banana — static dots se leke smooth animation tak.

---

## 🧠 New Concepts Seekhe

### 1. Canvas Setup
`<canvas>` ek khaali drawing board hai jisme JS shapes draw kar sakta hai.

```js
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
```

- `getContext('2d')` → drawing ka "brush" milta hai (`ctx` variable)
- `window.innerWidth` / `innerHeight` → current browser window ki size (canvas ko full-screen banane ke liye)

⚠️ **Bug jo mila:** Canvas ko CSS mein `position: fixed` na dene se woh normal page flow mein ek bahut bada block bana ke baith gaya tha — content ke bahut niche chala gaya. Fix:
```css
#particles-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
```
`z-index: -1` zaroori hai warna canvas baaki content ke **upar** aakar sab chhupa deta.

---

### 2. Circle Draw Karna (`ctx.arc`)

```js
ctx.beginPath();
ctx.arc(100, 100, 5, 0, Math.PI * 2);
ctx.fillStyle = "#c47840";
ctx.fill();
```

- `beginPath()` → naya shape shuru karne ka signal
- `arc(x, y, radius, startAngle, endAngle)` → `0` se `Math.PI * 2` matlab poora 360° circle
- `fillStyle` → color set karta hai
- `fill()` → actually rang bharta hai (draw hota hai)

---

### 3. Array + Object — Multiple Particles Ka Data

Ek particle ki properties: position (x, y), size, speed.

```js
let particles = [];

for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: 3,
    speedX: (Math.random() - 0.5) * 2,
    speedY: (Math.random() - 0.5) * 2
  });
}
```

- `Math.random()` → 0 se 1 ke beech random decimal number deta hai
- `Math.random() * canvas.width` → poori screen width mein kahin bhi random position
- `(Math.random() - 0.5) * 2` → -1 se +1 ke beech random speed (kuch particles left move, kuch right)
- `.push({...})` → array mein naya object add karta hai

💡 **Object vs Array:** Object ek cheez ki properties store karta hai (`{x, y, size}`), Array bahut saari cheezein list mein rakhta hai (`[particle1, particle2, ...]`).

---

### 4. Loop Se Sab Particles Draw Karna

```js
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#c47840";
    ctx.fill();
  }
}

drawParticles();
```

- `particles.length` → array mein kitne items hain (yahan 50)
- `particles[i]` → array ka ek specific item (index se access)
- `ctx.clearRect()` → canvas ko saaf karta hai purane frame se (animation ke liye zaroori)
- Function likhne ke baad use **call bhi karna padta hai** (`drawParticles()`), warna wo sirf "defined" rehta hai, chalta nahi.

---

### 5. Animation Loop (`requestAnimationFrame`)

```js
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    p.x += p.speedX;
    p.y += p.speedY;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#c47840";
    ctx.fill();
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();
```

- `p.x += p.speedX` → position mein har frame speed add hoti hai, isse movement dikhta hai
- `requestAnimationFrame(animateParticles)` → function khud ko baar-baar call karta hai (~60 times/second), isse infinite smooth loop banta hai

💡 **Yeh pattern bahut important hai** — games, animations, aur kisi bhi "continuously update hone wali cheez" mein yehi `requestAnimationFrame` loop use hota hai.

---

## 🐛 Errors Mile Aur Fix Kiye

| Error | Reason | Fix |
|---|---|---|
| `<canvas = id="...">` | Extra `=` — HTML attribute syntax galat | `<canvas id="...">` |
| `getElementById('#id')` | `#` sirf `querySelector` ke liye hota hai | `getElementById('id')` (bina `#`) |
| Particles invisible the | Canvas ko `position: fixed` nahi diya tha | CSS mein fixed + top/left + z-index add kiya |
| `particles` array "not defined" jaisa behave kar raha tha | Poora array-banane wala code galti se `//` se comment ho gaya tha | Comments hataye (uncomment kiya) |

💡 **Sabse badi lesson:** `//` comment silent bug create karta hai — code error nahi deta dikhne mein, bas chalta hi nahi. Jab kuch expected se kaam na kare, sabse pehle apna **poora code top se padhna** chahiye.

---

## 📌 Key Takeaway
Canvas animation 3 building blocks se banta hai:
1. **Data** (array of objects — particles ki properties)
2. **Draw logic** (loop se har object ko canvas pe render karna)
3. **Loop** (`requestAnimationFrame` se continuously repeat karna, position update karte hue)

Yehi pattern (data → draw → loop) games aur complex animations mein bhi use hota hai — bas complexity badhती hai.