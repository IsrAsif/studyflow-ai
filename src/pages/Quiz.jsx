import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import Flashcard from '../components/Flashcard';
import { generateQuiz, generateFlashcards } from '../services/gemini';

export default function Quiz() {
  const [material, setMaterial] = useState('');
  const [quiz, setQuiz] = useState(null);
  const [flashcards, setFlashcards] = useState(null);
  const [mode, setMode] = useState('quiz'); // 'quiz' | 'flashcards'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [revealed, setRevealed] = useState({});

  const handleGenerate = async () => {
    if (!material.trim()) return;
    setLoading(true);
    setError('');
    try {
      if (mode === 'quiz') {
        const data = await generateQuiz(material);
        setQuiz(data);
      } else {
        const cards = await generateFlashcards(material);
        setFlashcards(cards);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleReveal = (key) => setRevealed((r) => ({ ...r, [key]: !r[key] }));

  return (
    <AppLayout>
      <h1 className="font-display text-3xl font-semibold">Quiz &amp; Flashcard Generator</h1>
      <p className="mt-1 text-ink-soft dark:text-paper/60">
        Paste a topic or your notes — generate MCQs, true/false, short answer questions, or flashcards.
      </p>

      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setMode('quiz')}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            mode === 'quiz' ? 'bg-emerald text-paper' : 'border border-ink/15 dark:border-paper/20'
          }`}
        >
          Quiz
        </button>
        <button
          onClick={() => setMode('flashcards')}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            mode === 'flashcards' ? 'bg-emerald text-paper' : 'border border-ink/15 dark:border-paper/20'
          }`}
        >
          Flashcards
        </button>
      </div>

      <textarea
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        placeholder="Paste a topic or notes…"
        rows={5}
        className="mt-4 w-full rounded-2xl border border-ink/15 bg-transparent p-4 text-sm outline-none focus:border-emerald dark:border-paper/20"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-paper hover:bg-emerald-deep disabled:opacity-50"
      >
        {loading ? 'Generating…' : `Generate ${mode === 'quiz' ? 'quiz' : 'flashcards'}`}
      </button>
      {error && <p className="mt-2 text-sm text-coral">{error}</p>}

      {mode === 'quiz' && quiz && (
        <div className="mt-8 space-y-8">
          <section>
            <h2 className="font-display text-xl font-semibold">Multiple choice</h2>
            <div className="mt-3 space-y-4">
              {quiz.mcqs?.map((q, i) => (
                <div key={i} className="rounded-xl border border-ink/10 p-4 dark:border-paper/10">
                  <p className="text-sm font-medium">{i + 1}. {q.question}</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    {q.options?.map((opt) => (
                      <li key={opt} className="text-ink-soft dark:text-paper/60">{opt}</li>
                    ))}
                  </ul>
                  <button onClick={() => toggleReveal(`mcq-${i}`)} className="mt-2 text-xs font-mono text-emerald">
                    {revealed[`mcq-${i}`] ? `Answer: ${q.answer}` : 'Reveal answer'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">True / False</h2>
            <div className="mt-3 space-y-4">
              {quiz.trueFalse?.map((q, i) => (
                <div key={i} className="rounded-xl border border-ink/10 p-4 dark:border-paper/10">
                  <p className="text-sm font-medium">{q.statement}</p>
                  <button onClick={() => toggleReveal(`tf-${i}`)} className="mt-2 text-xs font-mono text-emerald">
                    {revealed[`tf-${i}`] ? `Answer: ${q.answer ? 'True' : 'False'}` : 'Reveal answer'}
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold">Short answer</h2>
            <div className="mt-3 space-y-4">
              {quiz.shortAnswer?.map((q, i) => (
                <div key={i} className="rounded-xl border border-ink/10 p-4 dark:border-paper/10">
                  <p className="text-sm font-medium">{q.question}</p>
                  <button onClick={() => toggleReveal(`sa-${i}`)} className="mt-2 text-xs font-mono text-emerald">
                    {revealed[`sa-${i}`] ? `Answer: ${q.answer}` : 'Reveal answer'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {mode === 'flashcards' && flashcards && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flashcards.map((c, i) => (
            <Flashcard key={i} front={c.front} back={c.back} />
          ))}
        </div>
      )}
    </AppLayout>
  );
}
