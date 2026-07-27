import { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';
import { auth } from '../services/firebase';

export default function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [course, setCourse] = useState('');
  const [university, setUniversity] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
    }
    // course/university can be persisted to a Firestore "users" doc if needed
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppLayout>
      <h1 className="font-display text-3xl font-semibold">Profile</h1>
      <p className="mt-1 text-ink-soft dark:text-paper/60">Keep your details up to date.</p>

      <form onSubmit={handleSave} className="mt-6 max-w-md space-y-4 rounded-2xl border border-ink/10 p-5 dark:border-paper/10">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald dark:border-paper/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            value={user?.email || ''}
            disabled
            className="mt-1 w-full rounded-lg border border-ink/10 bg-ink/5 px-3 py-2 text-sm text-ink-soft dark:border-paper/10 dark:bg-paper/5 dark:text-paper/50"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Course</label>
          <input
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="e.g. BS Computer Science"
            className="mt-1 w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald dark:border-paper/20"
          />
        </div>
        <div>
          <label className="text-sm font-medium">University</label>
          <input
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald dark:border-paper/20"
          />
        </div>

        <button type="submit" className="rounded-full bg-emerald px-6 py-2.5 text-sm font-semibold text-paper hover:bg-emerald-deep">
          Save changes
        </button>
        {saved && <p className="text-sm text-emerald">Saved ✓</p>}
      </form>
    </AppLayout>
  );
}
