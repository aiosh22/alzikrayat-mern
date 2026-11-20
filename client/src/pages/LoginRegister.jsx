import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import LoginForm from '../components/LoginForm.jsx';
import RegisterForm from '../components/RegisterForm.jsx';

export default function LoginRegister() {
  const [tab, setTab] = useState('login');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = (profile) => {
    login(profile);
    navigate('/photos');
  };

  return (
    <section className="card panel narrow">
      <div className="toggle full">
        <button className={tab === 'login' ? 'active' : ''} onClick={() => setTab('login')}>دخول</button>
        <button className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>تسجيل جديد</button>
      </div>
      {tab === 'login' ? <LoginForm onSuccess={handleSuccess} /> : <RegisterForm onSuccess={handleSuccess} />}
    </section>
  );
}
