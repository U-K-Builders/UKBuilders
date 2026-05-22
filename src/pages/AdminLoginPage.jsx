import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginPage() {
  const { login, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [fields, setFields] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [showPw, setShowPw] = useState(false);

  if (isAdmin) {
    return (
      <div className="animate-fade-in min-h-[70vh] flex items-center justify-center px-5">
        <div className="bg-navy border border-gold/40 p-10 max-w-md w-full text-center">
          <span className="block text-gold text-[0.625rem] uppercase tracking-[4px] mb-4">Admin Panel</span>
          <h2 className="font-serif text-white text-3xl font-normal tracking-[2px] mb-2">You're signed in</h2>
          <div className="w-10 h-[2px] bg-gold mx-auto my-6" />
          <p className="text-text-muted text-sm mb-8">
            Admin mode is active. All hidden projects and tabs are visible across the site.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/')}
              className="bg-gold text-white px-8 py-3 text-[0.6875rem] uppercase tracking-[2px] border border-gold hover:bg-transparent hover:text-gold transition-all duration-300"
            >
              Go to Home
            </button>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="bg-transparent text-gold/60 px-8 py-3 text-[0.6875rem] uppercase tracking-[2px] border border-white/10 hover:border-gold/40 hover:text-gold transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const ok = login(fields.username.trim(), fields.password);
    if (ok) {
      navigate('/');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="animate-fade-in min-h-[70vh] flex items-center justify-center px-5">
      <div className="bg-navy border border-gold/40 p-10 max-w-md w-full">
        <span className="block text-gold text-[0.625rem] uppercase tracking-[4px] mb-4 text-center">Restricted Access</span>
        <h2 className="font-serif text-white text-3xl font-normal tracking-[2px] mb-2 text-center">Admin Login</h2>
        <div className="w-10 h-[2px] bg-gold mx-auto mt-3 mb-8" />

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div>
            <label className="block text-[0.6875rem] uppercase tracking-[2px] text-gold mb-2">Username</label>
            <input
              type="text"
              autoComplete="username"
              value={fields.username}
              onChange={(e) => setFields((p) => ({ ...p, username: e.target.value }))}
              className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-[0.6875rem] uppercase tracking-[2px] text-gold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                value={fields.password}
                onChange={(e) => setFields((p) => ({ ...p, password: e.target.value }))}
                className="w-full bg-white/5 border border-white/20 px-4 py-3 pr-12 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-gold transition-colors duration-300 bg-transparent border-none cursor-pointer text-xs uppercase tracking-[1px]"
              >
                {showPw ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs uppercase tracking-[1px] text-center">{error}</p>
          )}

          <button
            type="submit"
            className="bg-gold text-white px-8 py-3 text-[0.6875rem] uppercase tracking-[2px] border border-gold hover:bg-transparent hover:text-gold transition-all duration-300 mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
