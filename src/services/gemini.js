// AI service for StudyFlow AI
// Talks to Groq's API (OpenAI-compatible), using Llama 3.3.
//
// Why Groq instead of Gemini: Groq's free tier needs no billing account,
// isn't tied to a Google Cloud project (so it's unaffected by any Gemini
// project-level issues), and works immediately after signup.
//
// Get a free key at https://console.groq.com/keys and set it as
// VITE_GROQ_API_KEY in your .env file (never commit this — .env is
// gitignored, and .env.example must stay blank after the `=`).
//
// NOTE: calling Groq directly from the browser exposes your API key to
// anyone who opens devtools. That's fine for local development and small
// class/portfolio projects, but for real production use, proxy these calls
// through a small backend (e.g. a Firebase Cloud Function) instead of
// calling api.groq.com directly from the client.

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = 'llama-3.3-70b-versatile';
const BASE_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function callAI(prompt, { json = false } = {}) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      response_format: json ? { type: 'json_object' } : undefined,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content ?? '';
  return json ? JSON.parse(text) : text;
}

// --- AI Tutor -----------------------------------------------------------
export async function askTutor(question, history = []) {
  const context = history
    .map((m) => `${m.role === 'user' ? 'Student' : 'Tutor'}: ${m.content}`)
    .join('\n');

  const prompt = `You are a friendly, encouraging AI tutor for a university student.
${context ? `Conversation so far:\n${context}\n` : ''}
Student's question: "${question}"

Respond with:
1. A clear explanation
2. A concrete example
3. Time/space complexity if relevant (for CS topics)
4. One short practice question at the end

Keep it concise and easy to skim, using short paragraphs or bullet points.`;

  return callAI(prompt);
}

// --- Note Summarizer ------------------------------------------------------
export async function summarizeNotes(notesText) {
  const prompt = `Summarize the following lecture notes for a university student.
Return strict JSON with this shape:
{
  "summary": "a concise paragraph summary",
  "keyPoints": ["point 1", "point 2", ...],
  "definitions": [{ "term": "...", "definition": "..." }],
  "examTips": ["tip 1", "tip 2", ...]
}

Notes:
"""${notesText}"""`;

  return callAI(prompt, { json: true });
}

// --- Quiz Generator ---------------------------------------------------
export async function generateQuiz(topicOrNotes, { mcq = 5, trueFalse = 3, shortAnswer = 2 } = {}) {
  const prompt = `Create a quiz based on the following material or topic.
Return strict JSON with this shape:
{
  "mcqs": [{ "question": "...", "options": ["A","B","C","D"], "answer": "A" }],
  "trueFalse": [{ "statement": "...", "answer": true }],
  "shortAnswer": [{ "question": "...", "answer": "..." }]
}
Generate ${mcq} MCQs, ${trueFalse} true/false questions, and ${shortAnswer} short-answer questions.

Material:
"""${topicOrNotes}"""`;

  return callAI(prompt, { json: true });
}

// --- Flashcard Generator ------------------------------------------------
export async function generateFlashcards(topicOrNotes, count = 10) {
  const prompt = `Create ${count} flashcards from the following material.
Return strict JSON: { "flashcards": [{ "front": "...", "back": "..." }] }

Material:
"""${topicOrNotes}"""`;

  const data = await callAI(prompt, { json: true });
  return data.flashcards ?? [];
}

// --- Study Planner --------------------------------------------------------
export async function generateStudyPlan({ examDate, topics, hoursPerDay = 2 }) {
  const prompt = `Create a day-by-day study plan for a student preparing for an exam.
Exam date: ${examDate}
Topics to cover: ${topics}
Available study time per day: ${hoursPerDay} hours

Return strict JSON: { "plan": [{ "date": "YYYY-MM-DD", "focus": "...", "tasks": ["..."] }] }`;

  return callAI(prompt, { json: true });
}
