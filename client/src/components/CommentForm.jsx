import { useState } from 'react';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

// Props: photoId, onAdded(comment) -> parent updates its list immediately
export default function CommentForm({ photoId, onAdded }) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSending(true);
    try {
      const created = await api(`/api/photos/${photoId}/comments`, { method: 'POST', body: { comment: text }, user });
      onAdded(created);
      setText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="اكتب تعليقك..."
        rows={3}
        maxLength={500}
        required
      />
      {error && <p className="state error">{error}</p>}
      <button className="btn btn-primary" disabled={sending || !text.trim()}>
        {sending ? 'جاري الإرسال...' : 'إضافة تعليق'}
      </button>
    </form>
  );
}
