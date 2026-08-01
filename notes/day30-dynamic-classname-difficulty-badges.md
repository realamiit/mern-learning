# Dynamic className + Difficulty Badges — Notes (Day 30)

## 1. Full Form + Definition

| Term | Full Form / Meaning | One-line Definition |
|---|---|---|
| JSX Expression | JavaScript XML Expression | Code inside `{}` in JSX that gets evaluated as JavaScript, not treated as plain text |
| Dynamic className | — | A className whose value is computed from data/variables at render time, instead of being a fixed string |
| `.toLowerCase()` | — | A JS string method that converts a string to all lowercase characters |
| Contrast | — | Visual difference between text color and background color, needed for readability |

---

## 2. Core Concept

### JSX: string literal vs expression
```jsx
className="card"        // fixed string — always "card", no matter what
className={q.difficulty} // expression — evaluated as JS, result depends on data
```
Curly braces `{}` tell JSX: "don't treat this as literal text — evaluate this as JavaScript and use the result."

Without `{}`, JSX treats everything as plain text — even a variable name would print literally instead of its value.

### Case sensitivity problem
CSS class names are case-sensitive. If `q.difficulty` stores `"Easy"` (capital) but CSS defines `.easy` (lowercase), the browser treats these as two different, non-matching identifiers — no styling applies.

**Two possible fixes:**
1. Store lowercase in the database (`"easy"`) — but then display text also becomes lowercase unless separately capitalized.
2. Keep readable data (`"Easy"`) in the database, and only lowercase it for the className using `.toLowerCase()`.

**Chosen approach: Option 2** — readable display stays intact, only one line of transformation needed for styling purposes.

### The dual-purpose line
```jsx
<span className={q.difficulty.toLowerCase()}>{q.difficulty}</span>
```
- `className={q.difficulty.toLowerCase()}` → sets the CSS class (e.g. `"easy"`) — invisible, used only for styling.
- `{q.difficulty}` (between the tags) → the actual visible text shown to the user (e.g. `"Easy"`, original capitalized format).

### Selector without a dot
```css
easy { }     /* WRONG — targets an HTML tag named <easy>, which doesn't exist */
.easy { }    /* CORRECT — targets elements with class="easy" */
```
Missing the `.` makes CSS look for a tag selector instead of a class selector. Since no such tag exists in HTML/JSX, the rule silently never matches — no error, but no styling either.

### Text contrast on colored backgrounds
When placing text on a colored background (like a badge), use a **dark shade from the same color family** if the background is light — never a light-on-light or same-brightness combination. This avoids low-contrast, hard-to-read text.

---

## 3. Final CSS — Difficulty Badge Classes

```css
.easy {
  background-color: var(--easy-color);
  color: #14532d;
  padding: 4px 10px;
  border-radius: 4px;
}

.medium {
  background-color: var(--medium-color);
  color: #451a03;
  padding: 4px 10px;
  border-radius: 4px;
}

.hard {
  background-color: var(--hard-color);
  color: #9c1801;
  padding: 4px 10px;
  border-radius: 4px;
}
```

## 4. Final JSX Change (App.jsx)

```jsx
{q.questionName} — {q.topic} — <span className={q.difficulty.toLowerCase()}>{q.difficulty}</span>
```

---

## 5. Confusion Box

**Q: `className={q.difficulty.toLowerCase()}` mein curly braces kyun hain, jab `className="card"` mein nahi hote?**
A: `"card"` ek fixed string hai — hardcoded, kabhi nahi badalta. `q.difficulty.toLowerCase()` ek JavaScript expression/function call hai jiska result data pe depend karta hai — isliye JSX ko batana padta hai `{}` se ki ye evaluate karna hai, literal text nahi treat karna.

**Q: `className={q.topic}` — ye fixed text "q.topic" dikhayega ya value nikalega?**
A: Value nikalega — curly braces ki wajah se JSX isko JavaScript expression samajhta hai aur `q` object ke `topic` property ki actual value use karta hai.

---

## 6. Mistake Box (Actual Mistakes Made This Session)

1. **Missing dot in selector:** Likha `easy { }` instead of `.easy { }` — CSS ne isse ek HTML tag selector samjha (jo exist hi nahi karta), rule silently kabhi apply nahi hota.
2. **Low contrast color choices:**
   - `.easy` mein pehle `color: #e4e4e7` (light text) diya light green background pe — low contrast.
   - `.medium` mein `color: #f6ff00` (bright yellow) diya amber background pe — same-brightness colors, text background mein merge ho jaata.
3. **Invalid border-width unit (earlier in session):** `border: 30% solid #ddd` likha — border-width kabhi percentage mein nahi diya jaata, sirf fixed units (`px`) mein. Property silently ignored ho jaati.
4. **Excessive padding:** Pehle `padding: 20px` diya badge ke liye — chip jaisa look banane ke liye ye zyada tha; `4px 10px` zyada appropriate hai.
5. **Incomplete submissions:** Multiple baar sirf `.easy` class bheji jab `.medium` aur `.hard` bhi expected the — poora pattern replicate karne mein consistency ki kami.

---

## 7. Mock Interview — This Topic

**Q1: `.toLowerCase()` ki zaroorat kyun padi?**
- *Amit's answer:* "Case sensitive hai, problem hogi" — directionally correct, incomplete reasoning.
- *Polished answer:* Database mein difficulty capital format mein store hai (`"Easy"`), aur CSS classes case-sensitive hoti hain. Agar hardcoded lowercase className use karte to sab badges same class use karte chahe difficulty kuch bhi ho. `.toLowerCase()` dynamically actual value ko lowercase mein convert karta hai taaki `.easy`/`.medium`/`.hard` CSS classes se sahi match ho.

**Q2: Dono `q.difficulty` occurrences ka purpose?**
- *Amit's answer:* Correct and complete — className styling ke liye, display text visible content ke liye.

**Q3: Contrast principle kyun follow kiya?**
- *Amit's answer:* Correct core idea — light background pe dark text for readability.

**Q4: Selector bina dot ke likhne se kya hota hai?**
- *Amit's answer:* "Exist hi nahi karta" — partially correct, missing full reasoning.
- *Polished answer:* Bina dot ke selector ek HTML tag selector ban jaata hai. `<easy>` koi valid tag nahi hai, isliye rule kabhi kisi element se match nahi karega — silently fail hota hai, koi console error nahi aata.

**Score: 7/10** — Significant improvement from previous mock (2/10). Q2 and Q3 strong; Q1 and Q4 had correct conclusions but shallow reasoning depth.

---

## 8. Syntax Reference Card

```jsx
// Dynamic className based on data
<span className={q.difficulty.toLowerCase()}>{q.difficulty}</span>

// JSX expression vs literal string
className="fixed-text"      // always same
className={variableName}    // evaluated, changes with data
```

```css
/* Difficulty badge pattern */
.easy {
  background-color: var(--easy-color);
  color: #14532d;   /* dark shade of same family for contrast */
  padding: 4px 10px;
  border-radius: 4px;
}
```

---

## 9. Next Step
Verify badges render correctly in browser (colors should now show on Easy/Medium/Hard text). Then continue with remaining dark theme elements — buttons, inputs, and due-section headers.


https://docs.google.com/document/d/10qoU-73ToXaEJ_qQx06gAtPzfELYdhyOy8bxA7Sk6gQ/edit?usp=drivesdk