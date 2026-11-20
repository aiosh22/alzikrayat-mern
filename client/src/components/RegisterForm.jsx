import { useState } from 'react';
import { api } from '../api.js';

// Props: onSuccess(userProfile)
export default function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', location: '', occupation: '', description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      onSuccess(await api('/api/auth/register', { method: 'POST', body: form }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="row2">
        <label>الاسم الأول
          <input name="firstName" value={form.firstName} onChange={handleChange} required />
        </label>
        <label>اسم العائلة
          <input name="lastName" value={form.lastName} onChange={handleChange} required />
        </label>
      </div>
      <label>البريد الإلكتروني
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>كلمة المرور (6 أحرف على الأقل)
        <input type="password" name="password" minLength={6} value={form.password} onChange={handleChange} required />
      </label>
      <div className="row2">
        <label>المدينة (اختياري)
          <input name="location" value={form.location} onChange={handleChange} />
        </label>
        <label>المهنة (اختياري)
          <input name="occupation" value={form.occupation} onChange={handleChange} />
        </label>
      </div>
      <label>نبذة عنك (اختياري)
        <textarea name="description" rows={3} value={form.description} onChange={handleChange} />
      </label>
      {error && <p className="state error">{error}</p>}
      <button className="btn btn-primary" disabled={loading}>{loading ? 'جاري التسجيل...' : 'إنشاء حساب'}</button>
    </form>
  );
}
