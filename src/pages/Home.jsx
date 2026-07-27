import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Flashcard from '../components/Flashcard';
import { useAuth } from '../context/AuthContext';

const features = [
  {
    tab: 'Notes',
    title: 'Keep every lecture in one binder',
    body: 'Create, edit, and search your notes without digging through five different apps.',
  },
  {
    tab: 'Tutor',
    title: 'Ask, and actually understand',
    body: 'Get an explanation, a worked example, complexity analysis, and a practice question — every time.',
  },
  {
    tab: 'Summarizer',
    title: 'Paste a lecture, get the exam version',
    body: 'Key points, definitions, and exam tips pulled out of your raw notes in seconds.',
  },
  {
    tab: 'Quiz',
    title: 'Test yourself before the exam does',
    body: 'MCQs, true/false, and short answer questions generated from your own material.',
  },
  {
    tab: 'Flashcards',
    title: 'Spaced repetition, without the setup',
    body: 'Flip through auto-generated flashcards built straight from your notes.',
  },
  {
    tab: 'Planner',
    title: 'A schedule that counts backward from exam day',
    body: 'Give it a date and your topics — get a day-by-day plan that actually fits.',
  },
];

const testimonials = [
  {
    quote: 'I stopped bouncing between Notion, Quizlet, and ChatGPT tabs. Everything lives in one place now.',
    name: 'Hina R.',
    role: 'CS Sophomore',
  },
  {
    quote: 'The AI tutor explains things the way I wish my TA did — example first, jargon later.',
    name: 'Bilal K.',
    role: 'Data Science Junior',
  },
  {
    quote: 'Pasted three weeks of database notes in and got a study plan for finals week in under a minute.',
    name: 'Areeba S.',
    role: 'Software Engineering Senior',
  },
];

const sampleCards = [
  { front: 'What is Normalization?', back: 'The process of organizing a database to reduce redundancy and improve data integrity.' },
  { front: 'Big-O of Binary Search', back: 'O(log n) — the search space is halved with every comparison.' },
];

export default function Home() {
  const { user } = useAuth();
  const heroTo = user ? '/dashboard' : '/register';
  const heroLabel = user ? 'Go to your dashboard' : 'Start studying free';

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-ink dark:text-paper">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-16 md:grid-cols-2 md:items-center md:pt-24">
        <div>
          <span className="inline-block rounded-full bg-amber-soft px-3 py-1 text-xs font-mono font-medium text-ink">
            for students drowning in tabs
          </span>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Study smarter.
            <br />
            Learn <span className="text-emerald">faster.</span>
            <br />
            Achieve <span className="italic text-amber">more.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-ink-soft dark:text-paper/70">
            Notes, an AI tutor, quizzes, flashcards, and a study planner — one
            platform instead of five, so you spend your time studying, not
            switching apps.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to={heroTo}
              className="rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-paper hover:bg-emerald-deep transition-colors"
            >
              {heroLabel}
            </Link>
            <a href="#features" className="text-sm font-semibold text-ink-soft hover:text-emerald dark:text-paper/70">
              See how it works ↓
            </a>
          </div>
        </div>

        {/* Signature element: live flashcard flip stack */}
        <div className="relative">
          <p className="mb-3 font-mono text-xs uppercase tracking-wide text-ink-soft dark:text-paper/50">
            try it — tap a card
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {sampleCards.map((c) => (
              <Flashcard key={c.front} front={c.front} back={c.back} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold md:text-4xl">
          Everything on your desk, in one binder
        </h2>
        <p className="mt-3 max-w-xl text-ink-soft dark:text-paper/70">
          Each tab below is a course you're taking with StudyFlow — pick one and see what it does.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.tab}
              className="rounded-2xl border border-ink/10 bg-white/60 p-6 transition-colors hover:border-emerald/40 dark:border-paper/10 dark:bg-paper/5"
            >
              <span className="inline-block rounded-md bg-emerald/10 px-2.5 py-1 font-mono text-xs font-medium text-emerald">
                {f.tab}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft dark:text-paper/60">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-ink py-20 text-paper dark:bg-paper/5">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Students who stopped juggling apps
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="rounded-2xl border border-paper/15 p-6">
                <p className="text-sm leading-relaxed text-paper/85">"{t.quote}"</p>
                <footer className="mt-4 font-mono text-xs text-amber">
                  {t.name} · {t.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        {user ? (
          <>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Pick up where you left off
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft dark:text-paper/70">
              Your notes, tutor chats, and study plan are waiting on your dashboard.
            </p>
            <Link
              to="/dashboard"
              className="mt-8 inline-block rounded-full bg-emerald px-8 py-3.5 text-sm font-semibold text-paper hover:bg-emerald-deep transition-colors"
            >
              Go to your dashboard
            </Link>
          </>
        ) : (
          <>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Your next study session starts here
            </h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft dark:text-paper/70">
              Free to start. No credit card. Just paste your notes and go.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-block rounded-full bg-emerald px-8 py-3.5 text-sm font-semibold text-paper hover:bg-emerald-deep transition-colors"
            >
              Create your account
            </Link>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
