import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand">📷 الذكريات</Link>
        <div className="nav-links">
          <NavLink to="/" end>الرئيسية</NavLink>
          <NavLink to="/photos" end>الصور</NavLink>
          <NavLink to="/about">من نحن</NavLink>
          {user ? (
            <>
              <NavLink to="/photos/new">+ رفع صورة</NavLink>
              <span className="greeting">Hi {user.firstName}</span>
              <button className="link-btn danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="greeting">Please Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
