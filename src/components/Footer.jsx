export default function Footer() {
  return (
    <footer className="border-t border-ink/10 dark:border-paper/10 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-display text-lg">
          StudyFlow <span className="text-emerald">AI</span>
        </p>
        <p className="text-sm text-ink-soft dark:text-paper/60">
          Built for students who'd rather understand the material than juggle five apps.
        </p>
        <p className="text-xs text-ink-soft dark:text-paper/40 font-mono">
          © {new Date().getFullYear()} StudyFlow AI
        </p>
      </div>
    </footer>
  );
}
