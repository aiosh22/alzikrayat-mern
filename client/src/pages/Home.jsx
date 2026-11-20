import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { user } = useAuth();
  return (
    <section className="hero">
      <h1>📷 مرحباً بك في الذكريات</h1>
      <p>منصة لمشاركة أجمل لحظاتك. ارفع صورك، تصفّح ذكريات الآخرين، وعلّق عليها.</p>
      <div className="hero-actions">
        <Link to="/photos" className="btn btn-light">تصفّح الصور</Link>
        {user
          ? <Link to="/photos/new" className="btn btn-outline">رفع صورة</Link>
          : <Link to="/login" className="btn btn-outline">ابدأ الآن</Link>}
      </div>
    </section>
  );
}
