export default function Card({ title, value, icon, accent = 'emerald', children, className = '' }) {
  const accents = {
    emerald: 'text-emerald bg-emerald/10',
    amber: 'text-amber bg-amber-soft',
    coral: 'text-coral bg-coral/10',
  };

  return (
    <div className={`rounded-2xl border border-ink/10 dark:border-paper/10 bg-white/60 dark:bg-paper/5 p-5 ${className}`}>
      {(title || icon) && (
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-ink-soft dark:text-paper/60">{title}</p>
          {icon && (
            <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${accents[accent]}`}>
              {icon}
            </span>
          )}
        </div>
      )}
      {value && <p className="font-display text-3xl font-semibold">{value}</p>}
      {children}
    </div>
  );
}
