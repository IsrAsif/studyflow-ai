import { useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import { useAuth } from '../context/AuthContext';
import { subscribeToNotes, createNote, updateNote, deleteNote } from '../services/firebase';

export default function Notes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToNotes(user.uid, setNotes);
    return unsubscribe;
  }, [user]);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      await updateNote(editingId, { title, content });
    } else {
      await createNote(user.uid, { title, content });
    }
    resetForm();
  };

  const handleEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title?.toLowerCase().includes(search.toLowerCase()) ||
      n.content?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold">Notes</h1>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes…"
          className="w-56 rounded-full border border-ink/15 bg-transparent px-4 py-2 text-sm outline-none focus:border-emerald dark:border-paper/20"
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Editor */}
        <form onSubmit={handleSave} className="space-y-3 rounded-2xl border border-ink/10 p-5 dark:border-paper/10 h-fit">
          <p className="text-sm font-semibold">{editingId ? 'Edit note' : 'New note'}</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald dark:border-paper/20"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note…"
            rows={6}
            className="w-full rounded-lg border border-ink/15 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald dark:border-paper/20"
          />
          <div className="flex gap-2">
            <button type="submit" className="rounded-full bg-emerald px-4 py-2 text-sm font-semibold text-paper hover:bg-emerald-deep">
              {editingId ? 'Save changes' : 'Add note'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded-full border border-ink/15 px-4 py-2 text-sm dark:border-paper/20">
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredNotes.length === 0 && (
            <p className="text-sm text-ink-soft dark:text-paper/50">No notes yet — add your first one.</p>
          )}
          {filteredNotes.map((note) => (
            <div key={note.id} className="rounded-2xl border border-ink/10 p-4 dark:border-paper/10">
              <p className="font-display font-semibold">{note.title}</p>
              <p className="mt-1 line-clamp-4 text-sm text-ink-soft dark:text-paper/60">{note.content}</p>
              <div className="mt-3 flex gap-3 text-xs font-mono">
                <button onClick={() => handleEdit(note)} className="text-emerald">
                  Edit
                </button>
                <button onClick={() => deleteNote(note.id)} className="text-coral">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
