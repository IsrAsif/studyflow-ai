import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import Card from '../components/Card';
import { summarizeNotes } from '../services/gemini';

export default function Summarizer() {
  const [notesText, setNotesText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!notesText.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await summarizeNotes(notesText);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <h1 className="font-display text-3xl font-semibold">AI Note Summarizer</h1>
      <p className="mt-1 text-ink-soft dark:text-paper/60">
        Paste your lecture notes and get the summary, key points, definitions, and exam tips.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <textarea
            value={notesText}
            onChange={(e) => setNotesText(e.target.value)}
            placeholder="Paste your notes here…"
            rows={16}
            className="w-full rounded-2xl border border-ink/15 bg-transparent p-4 text-sm outline-none focus:border-emerald dark:border-paper/20"
          />
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="mt-4 rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-paper hover:bg-emerald-deep disabled:opacity-50"
          >
            {loading ? 'Summarizing…' : 'Summarize notes'}
          </button>
          {error && <p className="mt-2 text-sm text-coral">{error}</p>}
        </div>

        <div className="space-y-4">
          {!result && !loading && (
            <p className="text-sm text-ink-soft dark:text-paper/50">Your summary will appear here.</p>
          )}

          {result && (
            <>
              <Card title="Summary">
                <p className="mt-2 text-sm leading-relaxed">{result.summary}</p>
              </Card>
              <Card title="Key points">
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {result.keyPoints?.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </Card>
              <Card title="Definitions">
                <dl className="mt-2 space-y-2 text-sm">
                  {result.definitions?.map((d, i) => (
                    <div key={i}>
                      <dt className="font-semibold">{d.term}</dt>
                      <dd className="text-ink-soft dark:text-paper/60">{d.definition}</dd>
                    </div>
                  ))}
                </dl>
              </Card>
              <Card title="Exam tips" accent="amber">
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {result.examTips?.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </Card>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
