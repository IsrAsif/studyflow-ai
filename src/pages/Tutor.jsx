import AppLayout from '../components/AppLayout';
import AIChat from '../components/AIChat';

export default function Tutor() {
  return (
    <AppLayout>
      <h1 className="font-display text-3xl font-semibold">AI Tutor</h1>
      <p className="mt-1 text-ink-soft dark:text-paper/60">
        Ask a question the way you'd ask a classmate — get an explanation, an example, and a practice question back.
      </p>
      <div className="mt-6">
        <AIChat />
      </div>
    </AppLayout>
  );
}
