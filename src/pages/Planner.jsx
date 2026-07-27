import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import { generateStudyPlan } from '../services/gemini';

export default function Planner() {
  const [examDate, setExamDate] = useState('');
  const [topics, setTopics] = useState('');
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!examDate || !topics.trim()) return;
    setLoading(true);
    setError('');
    try {
      const data = await generateStudyPlan({ examDate, topics, hoursPerDay });
      setPlan(data.plan);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <h1 className="font-display text-3xl font-semibold">Study Planner</h1>
      <p className="mt-1 text-ink-soft dark:text-paper/60">
        Give it your exam date and topics — get a day-by-day plan that counts backward.
      </p>

      <form onSubmit={handleGenerate} className="mt-6 grid gap-4 rounded-2xl border border-ink/10 p-5 sm:grid-cols-2 dark:border-paper/10">
        <div>
          <label className="text-sm font-medium">Exam date</label>
          <input
            type="date"
            required
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald dark:border-paper/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Hours per day available</label>
          <input
            type="number"
            min={1}
            max={12}
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald dark:border-paper/20"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm font-medium">Topics to cover</label>
          <textarea
            required
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="e.g. normalization, indexing, transactions, joins"
            rows={3}
            className="mt-1 w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald dark:border-paper/20"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="sm:col-span-2 w-fit rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-paper hover:bg-emerald-deep disabled:opacity-50"
        >
          {loading ? 'Building plan…' : 'Generate study plan'}
        </button>
        {error && <p className="text-sm text-coral sm:col-span-2">{error}</p>}
      </form>

      {plan && (
        <div className="mt-8 space-y-3">
          {plan.map((day, i) => (
            <div key={i} className="rounded-2xl border border-ink/10 p-4 dark:border-paper/10">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-ink-soft dark:text-paper/50">{day.date}</p>
                <p className="font-display font-semibold">{day.focus}</p>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                {day.tasks?.map((t, j) => <li key={j}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
