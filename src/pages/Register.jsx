import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { registerWithEmail } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerWithEmail(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-6 dark:bg-ink dark:text-paper">
      <div className="w-full max-w-sm">
        <Link to="/" className="font-display text-xl font-semibold">
          StudyFlow <span className="text-emerald">AI</span>
        </Link>
        <h1 className="mt-8 font-display text-2xl font-semibold">Create your account</h1>
        <p className="mt-1 text-sm text-ink-soft dark:text-paper/60">Free to start — no credit card needed.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium">Full name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-emerald dark:border-paper/20"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-emerald dark:border-paper/20"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-ink/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-emerald dark:border-paper/20"
            />
          </div>

          {error && <p className="text-sm text-coral">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-emerald py-2.5 text-sm font-semibold text-paper hover:bg-emerald-deep disabled:opacity-50 transition-colors"
          >
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="mt-6 text-sm text-ink-soft dark:text-paper/60">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-emerald">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
