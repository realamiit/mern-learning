# 📚 DSA Revision Tracker

> Solved it once doesn't mean you'll remember it. This automated spaced-repetition tracker emails you exactly when it's time to revisit a DSA problem — Day 3, 7, 15, 30, or on your own custom schedule — so nothing slips through the cracks before your next interview.

Built as part of my [#100DaysOfCode](https://github.com/realamiit/mern-learning) journey — a full-stack MERN project that combines spaced-repetition learning science with automated email reminders, so DSA prep becomes a system instead of a guessing game.

---

## ✨ Features

- **Add & Track Questions** — Log any DSA problem with its name, topic, difficulty, and original problem link (LeetCode/GFG).
- **Spaced Repetition Scheduling** — Automatic revision reminders at **Day 3, 7, 15, and 30** after adding a question.
- **Custom Scheduling** — Set your own revision interval for any question instead of the default schedule.
- **Live Dashboard** — See all due questions organized by interval, update or delete entries in real time.
- **One-Click Problem Access** — Clickable LeetCode icon on every question takes you straight to the original problem.
- **Automated Email Alerts** — A cron job checks for due questions daily and emails you a summary — with a button that links straight back to your dashboard.
- **Fully Responsive** — Works cleanly on desktop, tablet, and mobile.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Scheduling | node-cron |
| Email | Nodemailer (Gmail) |
| Styling | Custom CSS (Flexbox, responsive) |

---

## 📸 Screenshots

*(Add your dashboard screenshots here — desktop view, mobile view, and a sample reminder email.)*

```
notes/screenshots/dashboard-desktop.png
notes/screenshots/dashboard-mobile.png
notes/screenshots/reminder-email.png
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ and npm installed
- A MongoDB Atlas account (free tier works)
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) generated (for sending email alerts)

### 1. Clone the repository
```bash
git clone https://github.com/realamiit/mern-learning.git
cd mern-learning
```

### 2. Backend Setup
```bash
cd 02-nodejs/practice
npm install
```

Create a `.env` file in this folder with:
```env
MONGO_URI=your_mongodb_atlas_connection_string
GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
RECIPIENT_USER=email_to_receive_reminders
```

Start the backend server:
```bash
node express-server.js
```
Server runs at `http://localhost:3000`

### 3. Frontend Setup
```bash
cd ../../03-react
npm install
npm run dev
```
App runs at `http://localhost:5173`

---

## 🗂️ How It Works

1. **Add a question** you just solved — name, topic, difficulty, and link.
2. The app automatically schedules revision reminders for **Day 3, 7, 15, and 30** from the date added (or set a custom day interval).
3. A **cron job runs daily**, checks MongoDB for questions due today, and emails you a summary with clickable links.
4. Click the email's **"Go to Dashboard"** button, revisit the due questions, and mark them done.

---

## ⚠️ Known Limitations

- **Email deliverability:** Reminder emails are sent via plain Gmail SMTP (Nodemailer), which is fine for personal/individual use but may land in the recipient's **Spam folder** on first delivery — Gmail's automated-sending trust model requires the recipient to mark the sender as "Not Spam" once, or add the sender to their contacts. For a production/multi-user version, a dedicated transactional email service (SendGrid, Mailgun, or Amazon SES) with proper SPF/DKIM authentication would resolve this reliably.

## 🔮 Future Enhancements

- GitHub contribution graph / coding platform submission tracking integration
- User authentication (multi-user support)
- Progress analytics (questions solved over time, topic-wise strength/weakness)
- WhatsApp notification support

---

## 👤 Author

**Amit Gupta**
- GitHub: [@realamiit](https://github.com/realamiit)
- Building this project as part of a self-directed MERN stack + DSA learning journey, documented daily under #100DaysOfCode.

---

## 📝 License

This project is open source and available for learning purposes.

## 📫 Feedback & Contributions
We welcome any feedback or contributions to improve this project!

## Documentation & Notes
- [Day 30 Notes: Responsive Fixes](notes/day30-responsive-fix.md)(https://docs.google.com/document/d/1k5lZQuNZ6yTZSKH4jQaHg4lv0qjlrJ_gLtAOwGOdT3U/edit?tab=t.0)