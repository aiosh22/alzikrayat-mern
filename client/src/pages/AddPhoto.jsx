import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function AddPhoto() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // upload is for logged-in users only
  if (!user) return <Navigate to="/login" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!file) return setError('اختر صورة أولاً');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', file); // file last so text fields are parsed first
    setLoading(true);
    try {
      const photo = await api('/api/photos', { method: 'POST', body: formData, isForm: true, user });
      navigate(`/photos/${photo._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card panel narrow">
      <h2>☁️ رفع صورة</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>الصورة (حتى 5MB)
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} required />
        </label>
        <label>العنوان
          <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} required />
        </label>
        <label>الوصف (اختياري)
          <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        {error && <p className="state error">{error}</p>}
        <button className="btn btn-primary" disabled={loading}>{loading ? 'جاري الرفع...' : 'رفع'}</button>
      </form>
    </section>
  );
}
