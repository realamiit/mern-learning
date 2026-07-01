# Day 15 - Spaced Repetition Logic + MongoDB Date Queries

## 1. Full Form + Definitions

| Term | One-line Definition |
|---|---|
| Spaced Repetition | Learning technique jisme questions ko fixed intervals (Day 3/7/15/30) pe revisit kiya jata hai |
| `$lte` | MongoDB query operator - "less than or equal to" - filter karta hai wo documents jinka field value specified value se kam ya equal ho |
| Date Comparison Query | MongoDB mein dates ko `$lte`, `$gte`, `$lt`, `$gt` operators se compare karna |
| Due Questions | Wo questions jinka revision date aaj ya pehle aa chuka ho |

## 2. Concept Notes

### Spaced Repetition Logic
- Har question ka `dateAdded` store hai
- Day 3 revision = dateAdded + 3 days
- Agar `dateAdded + 3 days <= aaj` to question DUE hai
- Equivalent logic: agar `dateAdded <= aaj - 3 days` to question DUE hai

### MongoDB Date Comparison - $lte operator
```javascript
Question.find({ dateAdded: { $lte: someDate } })
// sirf wahi documents return karta hai jinka dateAdded <= someDate ho
```

### /questions/due route
```javascript
router.get("/due", (req, res) => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  Question.find({ dateAdded: { $lte: threeDaysAgo } })
    .then((questions) => {
      res.send(questions);
    })
    .catch((error) => {
      console.log("Due questions error:", error);
      res.send("Error fetching due questions");
    });
});
```

### Why $lte and not exact date match?
- Exact match (`dateAdded: threeDaysAgo`) bahut strict hoga - sirf exact millisecond match karega
- `$lte` use karna better hai - "aaj se 3 din pehle ya usse pehle" add hue saare questions due hain
- Agar koi student 5 din se koi question nahi dekha, wo bhi due dikhega (jo sahi hai)

### Testing Note
- Kal (June 30) add hue questions aaj (July 1) `-3` filter se nahi aaye (sirf 1 din hua)
- `-0` se test kiya to sahi questions dike - proof ki route logic correct hai
- Production mein `-3` wapas karna hai

---

## 3. Confusion Box

| Question | Answer |
|---|---|
| `[]` kyun aaya pehle? | Saare questions kal (June 30) add hue, aaj July 1 hai - sirf 1 din hua, 3 din nahi - filter correctly koi result nahi diya |
| `-0` se kyun test kiya? | Verify karne ke liye ki route KAAM kar raha hai - agar data correctly aya to route sahi hai, bas data itna purana nahi tha |

---

## 4. Mock Interview Record (Day 15)

**Q: Spaced repetition mein "due" question kaise identify karte hain MongoDB mein?**

- Polished answer: "Har question ka dateAdded field check karte hain. Agar `dateAdded + N days <= aaj` hai to question due hai. MongoDB mein iska equivalent query hai: `Question.find({ dateAdded: { $lte: calculatedDate } })` jahan calculatedDate = aaj - N days."

---

## 5. Syntax Reference Card

```javascript
// MongoDB date comparison operators
{ field: { $lte: value } }  // less than or equal to
{ field: { $gte: value } }  // greater than or equal to
{ field: { $lt: value } }   // less than
{ field: { $gt: value } }   // greater than

// Date calculation - N din pehle ki date
const nDaysAgo = new Date();
nDaysAgo.setDate(nDaysAgo.getDate() - N);

// Due questions query
Question.find({ dateAdded: { $lte: nDaysAgo } })
```

---

## 6. Connection to DSA Tracker
- `/questions/due` route DSA Tracker ka CORE feature hai
- Aage: Day 7/15/30 ke liye bhi similar routes banana (ya ek combined route)
- Future: Email alerts send karna jab questions due ho (Nodemailer ke saath)
- Future: React dashboard mein "Today's Due Questions" section banana