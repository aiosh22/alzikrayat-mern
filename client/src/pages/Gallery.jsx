import { useEffect, useState } from 'react';
import { api } from '../api.js';
import PhotoCard from '../components/PhotoCard.jsx';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState('grid'); // grid | list

  useEffect(() => {
    api('/api/photos')
      .then(setPhotos)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="state">جاري تحميل الصور...</p>;
  if (error) return <p className="state error">{error}</p>;

  return (
    <section>
      <div className="toolbar">
        <h2>🖼️ الصور ({photos.length})</h2>
        <div className="toggle">
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>شبكة</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>قائمة</button>
        </div>
      </div>
      {photos.length === 0 ? (
        <p className="state">لا توجد صور حتى الآن. كن أول من يشارك ذكرى!</p>
      ) : (
        <div className={view === 'grid' ? 'grid' : 'list'}>
          {photos.map((p) => <PhotoCard key={p._id} photo={p} view={view} />)}
        </div>
      )}
    </section>
  );
}
