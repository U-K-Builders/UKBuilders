import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminDashboardPage() {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAdmin) navigate('/owner-portal', { replace: true });
  }, [isAdmin, loading, navigate]);

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center text-text-muted text-sm uppercase tracking-[3px]">Verifying session…</div>;
  if (!isAdmin) return null;

  return (
    <div className="animate-fade-in">
      <div className="bg-navy py-16 px-5 text-center border-b border-gold/30">
        <span className="text-gold text-[0.6875rem] uppercase tracking-[4px] mb-4 block">Internal</span>
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
