import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import PhotoDetail from './pages/PhotoDetail.jsx';
import AddPhoto from './pages/AddPhoto.jsx';
import LoginRegister from './pages/LoginRegister.jsx';
import About from './pages/About.jsx';

// Routes configuration (React Router)
export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photos" element={<Gallery />} />
          <Route path="/photos/new" element={<AddPhoto />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<p className="state error">الصفحة غير موجودة</p>} />
        </Routes>
      </main>
      <footer className="footer">© 2026 الذكريات - Alzikrayat · MERN Edition</footer>
    </>
  );
}
