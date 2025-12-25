# Quizzical 🧠✨

Quizzical is a simple, fun trivia quiz app built with **React** and **Vite**. It fetches multiple‑choice questions from the **Open Trivia Database API**, lets users select answers, and then shows their score with clear visual feedback.

## 🚀 Features

- Fetches trivia questions from Open Trivia DB
- Decodes HTML entities for clean, readable questions
- Randomized answer order for each question
- Score calculation with pass/fail styling
- Disabled submission until all questions are answered
- "Play Again" functionality with fresh questions
- Responsive, component‑based React architecture

## 🛠️ Tech Stack

- **React**
- **Vite** (fast dev environment)
- **JavaScript (ES6+)**
- **CSS** for styling
- **clsx** for conditional class names
- **Open Trivia Database API**

## 🌐 Environment Variables

Create a `.env` file in the project root and add:

```
VITE_TRIVIA_API_URL="Your OTDB URL"
```

## ▶️ Getting Started

1. Clone the repository and move in to the project folder

```bash
git clone https://github.com/helyaKi/scrimba-solo-projects.git
cd "quizzical\qzcl"
```

2. Install dependencies & Run the App

```bash
npm install
# extra dependencies if needed
npm install clsx html-entities
npm run dev
```

## 📦 Dependencies

```json
"dependencies": {
   "html-entities": "^2.6.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
    "clsx": "^2.1.1"
}
```

## 🧠 How It Works

1. User clicks _Start Quiz_
2. App fetches trivia questions from the API
3. Answers are decoded and shuffled
4. User selects answers (one per question)
5. "Show Answers" becomes enabled once all are answered
6. Final score is displayed with visual feedback
7. User can play again with new questions

## 📊 Scoring Logic

- Score is calculated by comparing user selections to correct answer indices
- Pass/fail styling is applied based on scoring at least 50%

## 📜 License

This project is for learning and personal use. Trivia questions are provided by the **Open Trivia Database**.
