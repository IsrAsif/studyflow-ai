import { useState, useRef, useEffect } from 'react';
import { askTutor } from '../services/gemini';

export default function AIChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI tutor. Ask me to explain a concept, walk through a problem, or quiz you on something — try \"Explain Binary Search\".",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const question = input.trim();
    if (!question || loading) return;

    const nextMessages = [...messages, { role: 'user', content: question }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const reply = await askTutor(question, nextMessages);
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Sorry, something went wrong: ${err.message}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[70vh] flex-col rounded-2xl border border-ink/10 dark:border-paper/10 bg-white/60 dark:bg-paper/5">
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-ink text-paper dark:bg-emerald'
                  : 'bg-paper-dim dark:bg-paper/10'
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-paper-dim px-4 py-3 text-sm dark:bg-paper/10">
              Thinking…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2 border-t border-ink/10 p-4 dark:border-paper/10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your AI tutor anything…"
          className="flex-1 rounded-full border border-ink/15 bg-transparent px-4 py-2.5 text-sm outline-none focus:border-emerald dark:border-paper/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-emerald px-5 py-2.5 text-sm font-semibold text-paper hover:bg-emerald-deep disabled:opacity-50 transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
}
