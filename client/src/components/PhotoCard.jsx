import { Link } from 'react-router-dom';
import { photoUrl, formatDate } from '../api.js';

// Props: photo (object), view ("grid" | "list")
export default function PhotoCard({ photo, view = 'grid' }) {
  const owner = photo.userId ? `${photo.userId.firstName} ${photo.userId.lastName}` : '—';
  return (
    <article className={`card photo-card ${view}`}>
      <img src={photoUrl(photo.fileName)} alt={photo.title} loading="lazy" />
      <div className="card-body">
        <h3>{photo.title}</h3>
        {view === 'list' && photo.description && <p className="muted">{photo.description}</p>}
        <p className="muted small">👤 {owner} · {formatDate(photo.dateTime)}</p>
        <Link to={`/photos/${photo._id}`} className="btn btn-primary btn-block">عرض التفاصيل</Link>
      </div>
    </article>
  );
}
