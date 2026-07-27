import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/firebase';

const navLinks = [
  { to: '/#features', label: 'Features' },
  { to: '/#testimonials', label: 'Testimonials' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 dark:border-paper/10 bg-paper/85 dark:bg-ink/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-emerald text-paper-dim rotate-[-4deg]">
            SF
          </span>
          StudyFlow <span className="text-emerald">AI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.to} href={l.to} className="text-sm font-medium text-ink-soft hover:text-emerald dark:text-paper/80 dark:hover:text-amber transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="rounded-full border border-ink/15 dark:border-paper/20 px-3 py-1.5 text-sm hover:border-emerald transition-colors"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-emerald">Dashboard</Link>
              <button onClick={handleLogout} className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-emerald-deep transition-colors dark:bg-paper dark:text-ink">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-emerald">Log in</Link>
              <Link to="/register" className="rounded-full bg-emerald px-4 py-2 text-sm font-semibold text-paper hover:bg-emerald-deep transition-colors">
                Get started
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-ink dark:bg-paper" />
            <span className="block h-0.5 w-6 bg-ink dark:bg-paper" />
            <span className="block h-0.5 w-6 bg-ink dark:bg-paper" />
          </div>
        </button>
      </nav>

      {menuOpen && (
        <div className="flex flex-col gap-4 border-t border-ink/10 px-6 py-4 md:hidden dark:border-paper/10">
          {navLinks.map((l) => (
            <a key={l.to} href={l.to} onClick={() => setMenuOpen(false)} className="text-sm font-medium">
              {l.label}
            </a>
          ))}
          <button onClick={toggleTheme} className="text-left text-sm font-medium">
            {isDark ? '☀️ Light mode' : '🌙 Dark mode'}
          </button>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium">Dashboard</Link>
              <button onClick={handleLogout} className="text-left text-sm font-medium text-coral">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium">Log in</Link>
              <Link to="/register" className="text-sm font-medium text-emerald">Get started</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
