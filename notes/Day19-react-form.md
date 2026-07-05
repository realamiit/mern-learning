# Day 19 - React Form, Controlled Inputs, POST from React

## Definitions

| Term | Matlab |
|---|---|
| Controlled Component | Input jiska value React state se connected ho — state hi source of truth |
| onChange | Input mein har keystroke pe fire hone wala event |
| e (event object) | Browser automatically bhejta hai — us event ki saari info contain karta hai |
| e.target | Wo input element jisme user ne type kiya |
| e.target.value | Input ka current value (jo user ne type kiya) |
| JSON.stringify() | JavaScript object ko JSON string mein convert karta hai — fetch body ke liye zaroori |
| Content-Type header | Backend ko batata hai ki request mein JSON aa raha hai |

## Concept Notes

### Controlled Input Pattern
```jsx
<input 
  value={questionName}
  onChange={(e) => setQuestionName(e.target.value)}
/>
```

### POST request from React
```jsx
fetch('http://localhost:3000/questions/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ questionName, topic, difficulty })
})
```

### Auto-refresh list after POST
```jsx
.then(() => {
  setQuestionName('')  // form clear
  return fetch('http://localhost:3000/questions')  // dobara GET
})
.then((res) => res.json())
.then((data) => setQuestions(data))  // list update
```

### Bug fix: res.json() vs res.text()
- Backend `res.send("string")` return karta tha — JSON nahi
- Isliye POST ke baad `.then((res) => res.json())` remove kiya
- Directly form clear karke GET fetch kiya

## Mock Interview

**Q1: onChange mein `e` aur `e.target.value` kya hai?**
- Amit's answer: "e variable hai, e.target.value se value set ho rahi hai"
- Polished answer: "`e` event object hai jo browser bhejta hai — us event ki info contain karta hai. `e.target` wo input element hai. `e.target.value` us input ka current text value hai jo user ne type kiya."

**Q2: JSON.stringify() kyun use kiya?**
- Amit's answer: "json format se string format mein convert karna tha"
- Polished answer: "fetch() body mein sirf string bhej sakta hai. JSON.stringify() JS object ko JSON string mein convert karta hai. Backend mein express.json() middleware use string ko wapas JS object mein convert karta hai."

## Syntax Reference

```jsx
// Controlled input
<input 
  value={state}
  onChange={(e) => setState(e.target.value)}
/>

// POST from React
fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

## Question: JSON.stringify() kyun use kiya body mein?
## Pura cycle: JS Object → JSON.stringify() → String → Network → express.json() → JS Object

>"Browser ka fetch() function body mein sirf string bhej sakta hai, JavaScript object nahi. Isliye JSON.stringify({questionName, topic, difficulty}) se JavaScript object ko JSON string mein convert kiya. Backend mein express.json() middleware us string ko wapas JavaScript object mein convert karta hai — tabhi req.body.questionName kaam karta hai."