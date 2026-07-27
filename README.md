# StudyFlow AI

**Study Smarter. Learn Faster. Achieve More.**

An all-in-one study platform for university students — notes, an AI tutor, note summarization, quiz/flashcard generation, and a study planner, in one place instead of five different apps.

🔗 **Live app:** [https://studyflow-ai-a9763.web.app/](https://studyflow-ai-a9763.web.app/)

---

## a. What it does & the problem it solves

As a Computer Science student, I found myself juggling a different app for every part of studying: a notes app, ChatGPT in a separate tab for explanations, Quizlet for flashcards, and a notebook for planning exam revision. Switching between all of them mid-study-session was its own source of friction — and the information never talked to each other (my notes weren't the input to my quiz, my quiz results weren't feeding my revision plan).

**StudyFlow AI** is built for **university students** (myself included) who want to go from *"I have these lecture notes"* to *"I understand this, I've tested myself on it, and I know what to study next"* — without leaving one tab.

It combines:
- A place to actually keep your notes
- An AI tutor that explains concepts the way you'd ask a classmate
- A summarizer that turns a wall of pasted lecture notes into key points, definitions, and exam tips
- A quiz and flashcard generator built from your own material, not generic question banks
- A study planner that turns "exam on this date, these topics" into a day-by-day schedule

## b. Live deployed URL

👉 **[https://studyflow-ai-a9763.web.app/](https://studyflow-ai-a9763.web.app/)**

Anyone can open this, create a free account, and use the full app immediately — no setup required.

## c. Features

**Landing page**
- Hero, feature overview, testimonials, and a call-to-action that adapts depending on whether you're already logged in

**Authentication** (Firebase Authentication)
- Email/password signup, login, logout
- Logged-in users are automatically redirected away from the login/signup pages back to their dashboard

**Dashboard**
- Study streak, notes count, weekly AI usage, and upcoming exams at a glance
- Today's task list

**Notes**
- Create, edit, delete, and search notes
- Synced live to each user's own account via Firestore (one user can never see another user's notes)

**AI Tutor**
- Chat interface — ask a question, get an explanation, a worked example, complexity analysis (for CS topics), and a practice question back

**AI Note Summarizer**
- Paste raw lecture notes → get a summary, key points, key term definitions, and exam tips

**AI Quiz Generator**
- Paste a topic or your notes → get multiple-choice, true/false, and short-answer questions generated from that specific material, with answers revealed on tap

**AI Flashcard Generator**
- Auto-generates front/back flashcards from your notes, with a flip animation

**Study Planner**
- Give it an exam date, your topics, and hours available per day → get a day-by-day study schedule counting backward from the exam

**Dark mode** — persisted across sessions

**Profile** — name, email, course, university

## d. The AI feature

StudyFlow AI's AI layer sits in one file (`src/services/gemini.js`) and is used across five features. Each function sends a purpose-written prompt to the model and, for anything that needs to populate structured UI, asks for **strict JSON back** so it can be parsed directly into React state without any extra parsing logic.

**Model used:** Llama 3.3 70B, via the Groq API (OpenAI-compatible endpoint).

The five instruction sets, written by me, verbatim from the code:

**1. AI Tutor**
```
You are a friendly, encouraging AI tutor for a university student.
[conversation history if any]
Student's question: "<question>"

Respond with:
1. A clear explanation
2. A concrete example
3. Time/space complexity if relevant (for CS topics)
4. One short practice question at the end

Keep it concise and easy to skim, using short paragraphs or bullet points.
```

**2. Note Summarizer**
```
Summarize the following lecture notes for a university student.
Return strict JSON with this shape:
{
  "summary": "a concise paragraph summary",
  "keyPoints": ["point 1", "point 2", ...],
  "definitions": [{ "term": "...", "definition": "..." }],
  "examTips": ["tip 1", "tip 2", ...]
}
Notes: """<pasted notes>"""
```

**3. Quiz Generator**
```
Create a quiz based on the following material or topic.
Return strict JSON with this shape:
{
  "mcqs": [{ "question": "...", "options": ["A","B","C","D"], "answer": "A" }],
  "trueFalse": [{ "statement": "...", "answer": true }],
  "shortAnswer": [{ "question": "...", "answer": "..." }]
}
Generate 5 MCQs, 3 true/false questions, and 2 short-answer questions.
Material: """<topic or notes>"""
```

**4. Flashcard Generator**
```
Create 10 flashcards from the following material.
Return strict JSON: { "flashcards": [{ "front": "...", "back": "..." }] }
Material: """<topic or notes>"""
```

**5. Study Planner**
```
Create a day-by-day study plan for a student preparing for an exam.
Exam date: <date>
Topics to cover: <topics>
Available study time per day: <hours> hours
Return strict JSON: { "plan": [{ "date": "YYYY-MM-DD", "focus": "...", "tasks": ["..."] }] }
```

## e. Tools, services, and models used

| Purpose | Tool/Service |
|---|---|
| Frontend framework | React 19 + Vite |
| Styling | Tailwind CSS v4 |
| Routing | React Router |
| Auth & database | Firebase (Authentication + Firestore) |
| AI model | Llama 3.3 70B via Groq API |
| Hosting | Firebase Hosting |
| Version control | GitHub |

## f. Screenshots

> _Add at least 3 screenshots here before submitting — see instructions below._

| | |
|---|---|
| ![Landing page](screenshots\landing-page.jpg) | ![Dashboard](screenshots\dashboard.jpg) |
| ![AI Tutor](screenshots\ai-tutor.jpg) | ![Quiz Generator](screenshots\quiz-generator.jpg) |

**How to add these:** create a `screenshots/` folder in the repo root, take screenshots of your live app at `/`, `/dashboard`, `/tutor`, and `/quiz` (Win+Shift+S on Windows, save as `.png`), drop them into that folder with the filenames above, then `git add screenshots/ && git commit -m "add screenshots" && git push`. GitHub will render them automatically in this README.

## g. How to run the project locally

```bash
git clone https://github.com/IsrAsif/studyflow-ai.git
cd studyflow-ai
npm install
cp .env.example .env   # then fill in the values below
npm run dev
```

### Environment variables

Create a `.env` file (see `.env.example` — never commit real keys here):

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

VITE_GROQ_API_KEY=
```

- Firebase values: **Firebase Console → Project settings → General → Your apps**
- Enable **Email/Password** under Authentication → Sign-in method, and create a **Firestore** database
- Groq key: free, no billing account needed — [console.groq.com/keys](https://console.groq.com/keys)

### Build & deploy

```bash
npm run build
firebase deploy --only hosting
```

## Project structure

```
src/
  components/   Navbar, Footer, Sidebar, Card, AIChat, Flashcard, AppLayout, ProtectedRoute
  pages/        Home, Login, Register, Dashboard, Notes, Tutor, Summarizer, Quiz, Planner, Profile
  services/     gemini.js (AI calls via Groq), firebase.js (auth + Firestore)
  context/      AuthContext, ThemeContext (dark mode)
```
