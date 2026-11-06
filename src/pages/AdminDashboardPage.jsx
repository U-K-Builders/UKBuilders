import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminDashboardPage() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) navigate('/owner-portal', { replace: true });
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <div className="animate-fade-in">
      <div className="bg-navy py-16 px-5 text-center border-b border-gold/30">
        <span className="text-gold text-xs uppercase tracking-[4px] mb-4 block">Internal</span>
        <h1 className="font-serif text-white text-4xl md:text-5xl font-normal uppercase tracking-[4px] mb-4">
          Admin Dashboard
        </h1>
        <span className="block w-[60px] h-[2px] bg-gold mx-auto" />
      </div>
      <div className="py-16 px-5">
        <div className="max-w-[1200px] mx-auto">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
}
