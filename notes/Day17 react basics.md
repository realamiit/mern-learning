# Day 17 - React (Vite) Basics: Components, JSX, useState

## 1. Full Form + Definitions

| Term | Full Form / Meaning | One-line Definition |
|---|---|---|
| React | — | JavaScript library for building interactive UIs using components |
| Vite | — | Fast build tool jo React project setup aur run karta hai |
| JSX | JavaScript XML | JS file mein HTML jaisa syntax likhne ki extension — `{}` se JS expressions embed kar sakte hain |
| Component | — | Ek JavaScript function jo UI (JSX) return karta hai — reusable building block |
| useState | — | React Hook jo component mein state (changeable data) manage karta hai |
| State | — | Component ka wo data jo change hone pe automatically UI re-render karata hai |
| HMR | Hot Module Replacement | Vite ka feature — file save karne pe browser automatically update hota hai bina full refresh ke |
| Re-render | — | State change hone pe React automatically component ko dobara run karke UI update karta hai |

---

## 2. Concept Notes

### React kya hai aur kyun chahiye?
- Backend (Express) se data milta hai, lekin user directly Postman use nahi karta
- React se **browser-based interactive UI** banta hai — buttons, forms, lists
- Port: React = **5173** (Express = 3000) — dono alag ports pe chalte hain

### Component Structure
```jsx
function App() {          // Component = JS function
  return (
    <div>                 // JSX = HTML jaisa syntax
      <h1>DSA Tracker</h1>
    </div>
  )
}

export default App;       // Export zaroori hai taki dusri files use kar sakein
```

### useState Hook
```jsx
const [count, setCount] = useState(0)
//     ↑           ↑              ↑
//  current    change karne     initial
//   value     ka function       value
```

**WHY do alag cheezein?**
- `count` = **read only** current value
- `setCount` = **write** ka authorized tarika
- Direct assignment (`count = 5`) se React ko pata nahi chalta ki state badli — UI update nahi hoti
- `setCount(5)` se React ko signal milta hai "re-render karo"

### JSX vs Normal HTML
| HTML (static) | JSX (dynamic) |
|---|---|
| Values hardcoded | `{count}` se dynamic values |
| DOM manually update karna padta | State change pe auto-update |
| `.html` file | `.jsx` file mein JS + HTML mixed |

### HMR (Hot Module Replacement)
- Vite ka feature — `Ctrl+S` se file save karo, browser **automatically** update ho jata hai
- Page reload nahi hota, sirf changed part update hota hai

---

## 3. Confusion Box

| Question | Answer |
|---|---|
| React aur Vite mein kya fark hai? | React = UI library (components, state). Vite = build/run tool jo React project fast chalata hai. Dono saath use hote hain |
| Port 5173 kyun, 3000 nahi? | Express pehle se 3000 pe tha. React/Vite ka default port 5173 hai — dono alag ports pe saath chal sakte hain |

---

## 4. Mistake Box

| Mistake | Correction |
|---|---|
| useState ka "kyun do cheezein" explain karte time sirf "kya kaam karte hain" bataya, "kyun alag hain" nahi | React mein direct assignment (`count = 5`) se UI update nahi hoti — setCount zaroori hai React ko re-render signal dene ke liye |
| JSX explain karte time "extension hai" bataya lekin `{}` curly braces ka specific role miss kiya | JSX mein `{}` ke andar JavaScript expressions directly embed hote hain — yahi JSX ko dynamic banata hai |

---

## 5. Mock Interview Record

**Q1: useState hook mein [count, setCount] — do alag cheezein kyun return karta hai?**

- Amit's answer: "count clicks count karta hai, setCount value increase karta hai"
- Polished answer: "Read aur write ko separate rakhna zaroori hai. count sirf current value padhne ke liye hai (directly change nahi kar sakte). setCount value change karne ka authorized tarika hai — jab call hota hai, React ko pata chalta hai UI re-render karna hai. Direct assignment se React ko pata nahi chalta ki state badli."

**Q2: JSX kya hai — normal HTML se kya alag hai?**

- Amit's answer: "jsx html aur js ka mix hai, html static reheta hai lekin react mein dynamic cheezein banana aasan hota hai"
- Polished answer: "JSX (JavaScript XML) ek syntax extension hai jo JS file mein HTML jaisa code likhne deta hai. Normal HTML static hota hai. JSX mein {} curly braces se JavaScript expressions directly embed kar sakte hain (jaise {count}), isliye UI dynamically state ke saath automatically update hoti hai."

---

## 6. Syntax Reference Card

```jsx
// Component banana
function MyComponent() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}
export default MyComponent;

// useState
const [value, setValue] = useState(initialValue);

// JSX mein JS expression
<p>Count: {count}</p>

// Button with onClick
<button onClick={() => setValue(value + 1)}>Click me</button>
<button onClick={() => setValue(0)}>Reset</button>
```

**Files:**
- `src/App.jsx` — main component
- `src/main.jsx` — entry point (App ko render karta hai)
- Port: `http://localhost:5173`

---

## 7. Connection to DSA Tracker
- Ab React se DSA Tracker ka **frontend** banana shuru karenge
- Questions list dikhana, due questions highlight karna, naya question add karna — sab React components se hoga
- React backend (Express, port 3000) se `fetch()` ke through data lega