import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api, photoUrl, formatDate } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import CommentForm from '../components/CommentForm.jsx';

export default function PhotoDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([api(`/api/photos/${id}`), api(`/api/photos/${id}/comments`)])
      .then(([p, c]) => { setPhoto(p); setComments(c); })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;
    try {
      await api(`/api/photos/${id}`, { method: 'DELETE', user });
      navigate('/photos');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="state">جاري التحميل...</p>;
  if (!photo) return <p className="state error">{error || 'الصورة غير موجودة'}</p>;

  const isOwner = user && photo.userId && user._id === photo.userId._id;

  return (
    <section className="detail">
      <div className="card">
        <img className="detail-img" src={photoUrl(photo.fileName)} alt={photo.title} />
        <div className="card-body">
          <h2>{photo.title}</h2>
          {photo.description && <p>{photo.description}</p>}
          <p className="muted small">
            👤 {photo.userId.firstName} {photo.userId.lastName} · {formatDate(photo.dateTime)}
          </p>
          {error && <p className="state error">{error}</p>}
          <div className="actions">
            <Link to="/photos" className="btn btn-light-dark">رجوع</Link>
            {isOwner && <button className="btn btn-danger" onClick={handleDelete}>حذف الصورة</button>}
          </div>
        </div>
      </div>

      <div className="card panel">
        <h3>💬 التعليقات ({comments.length})</h3>
        {comments.length === 0 && <p className="muted">لا توجد تعليقات بعد.</p>}
        {comments.map((c) => (
          <div key={c._id} className="comment">
            <strong>{c.userId.firstName} {c.userId.lastName}</strong>
            <span className="muted small"> · {formatDate(c.dateTime)}</span>
            <p>{c.comment}</p>
          </div>
        ))}
        {user
          ? <CommentForm photoId={id} onAdded={(c) => setComments((prev) => [...prev, c])} />
          : <p className="muted"><Link to="/login">سجّل الدخول</Link> لإضافة تعليق.</p>}
      </div>
    </section>
  );
}
