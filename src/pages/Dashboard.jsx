import AppLayout from '../components/AppLayout';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

// Placeholder data — wire these up to Firestore once notes/tasks/exams exist.
const stats = {
  streak: 6,
  notesCount: 24,
  aiUsage: 38,
};

const upcomingExams = [
  { subject: 'Database Systems', date: 'Aug 2' },
  { subject: 'Operating Systems', date: 'Aug 9' },
];

const todaysTasks = [
  { task: 'Review normalization notes', done: true },
  { task: 'Generate quiz on process scheduling', done: false },
  { task: 'Flashcards: SQL joins', done: false },
];

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.displayName?.split(' ')[0] || 'there';

  return (
    <AppLayout>
      <h1 className="font-display text-3xl font-semibold">Welcome back, {firstName} 👋</h1>
      <p className="mt-1 text-ink-soft dark:text-paper/60">Here's where you stand today.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Study Streak" value={`${stats.streak} days`} icon="🔥" accent="amber" />
        <Card title="Notes" value={stats.notesCount} icon="📝" accent="emerald" />
        <Card title="AI Uses This Week" value={stats.aiUsage} icon="🤖" accent="emerald" />
        <Card title="Upcoming Exams" value={upcomingExams.length} icon="📅" accent="coral" />
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <Card title="Upcoming exams">
          <ul className="mt-3 space-y-3">
            {upcomingExams.map((e) => (
              <li key={e.subject} className="flex items-center justify-between text-sm">
                <span>{e.subject}</span>
                <span className="font-mono text-ink-soft dark:text-paper/50">{e.date}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Today's tasks">
          <ul className="mt-3 space-y-3">
            {todaysTasks.map((t) => (
              <li key={t.task} className="flex items-center gap-3 text-sm">
                <span
                  className={`h-4 w-4 rounded-full border ${
                    t.done ? 'border-emerald bg-emerald' : 'border-ink/30 dark:border-paper/30'
                  }`}
                />
                <span className={t.done ? 'line-through text-ink-soft dark:text-paper/40' : ''}>{t.task}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </AppLayout>
  );
}
