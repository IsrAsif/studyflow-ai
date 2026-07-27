import { useState } from 'react';

export default function Flashcard({ front, back }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="group h-48 w-full [perspective:1000px] text-left focus:outline-none"
      aria-label="Flip flashcard"
    >
      <div
        className="relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-ink/10 bg-white p-5 [backface-visibility:hidden] dark:border-paper/10 dark:bg-ink">
          <span className="text-xs font-mono uppercase tracking-wide text-ink-soft dark:text-paper/50">Front</span>
          <p className="font-display text-lg font-medium">{front}</p>
          <span className="text-xs text-ink-soft dark:text-paper/40">Tap to flip →</span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-emerald/30 bg-emerald/10 p-5 [backface-visibility:hidden] dark:bg-emerald/15"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <span className="text-xs font-mono uppercase tracking-wide text-emerald">Back</span>
          <p className="text-base leading-relaxed">{back}</p>
          <span className="text-xs text-ink-soft dark:text-paper/40">← Tap to flip back</span>
        </div>
      </div>
    </button>
  );
}
