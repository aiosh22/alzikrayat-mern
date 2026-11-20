import { useState } from 'react';
import { api } from '../api.js';

// Props: onSuccess(userProfile)
export default function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      onSuccess(await api('/api/auth/login', { method: 'POST', body: form }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label>البريد الإلكتروني
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>كلمة المرور
        <input type="password" name="password" value={form.password} onChange={handleChange} required />
      </label>
      {error && <p className="state error">{error}</p>}
      <button className="btn btn-primary" disabled={loading}>{loading ? 'جاري الدخول...' : 'دخول'}</button>
    </form>
  );
}
