import { NavLink } from 'react-router-dom';

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { to: '/notes', label: 'Notes', icon: '📝' },
  { to: '/tutor', label: 'AI Tutor', icon: '🤖' },
  { to: '/summarizer', label: 'Summarizer', icon: '📄' },
  { to: '/quiz', label: 'Quiz Generator', icon: '❓' },
  { to: '/planner', label: 'Study Planner', icon: '🗓️' },
  { to: '/profile', label: 'Profile', icon: '👤' },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col gap-1 border-r border-ink/10 dark:border-paper/10 px-4 py-6">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-emerald/10 text-emerald dark:bg-emerald/20'
                : 'text-ink-soft hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-paper/10'
            }`
          }
        >
          <span aria-hidden>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </aside>
  );
}
