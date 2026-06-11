import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar, Clock, Settings, LogOut, Menu, X, Bell, User, LayoutDashboard, ChevronRight
} from 'lucide-react';

const sidebarLinks = [
  { to: '/estilista/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/estilista/agenda', icon: Calendar, label: 'Mi Agenda' },
  { to: '/estilista/perfil', icon: Settings, label: 'Configurar Perfil' },
];

export default function StylistLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-cream-dark flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-noir text-white transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">M</span>
              </div>
              <span className="text-white font-heading font-bold">Miradas <span className="text-rose-gold">VIP</span></span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 px-3 overflow-y-auto">
            <p className="text-xs text-white/30 uppercase tracking-wider px-3 mb-3 font-accent">
              Portal Estilista
            </p>
            {sidebarLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-accent transition-all duration-200 mb-1
                  ${isActive(link.to) 
                    ? 'bg-gradient-primary text-white shadow-glow/30 font-semibold' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              >
                <link.icon size={18} />
                <span className="flex-1">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-white/10 space-y-2">
             <Link 
               to={`/profesional/${user?.slug}`}
               className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-white bg-white/5 hover:bg-white/10 transition-colors font-accent"
             >
               <span className="flex items-center gap-2"><User size={16}/> Ver mi perfil público</span>
               <ChevronRight size={14} className="text-white/50"/>
             </Link>
            
            <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-red-400 hover:bg-white/5 transition-colors font-accent">
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-cream/80 backdrop-blur-lg border-b border-lavender/30">
          <div className="flex items-center justify-between px-4 md:px-8 h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-noir/50 hover:text-noir rounded-lg hover:bg-white transition-colors">
                <Menu size={20} />
              </button>
              <div className="hidden sm:block">
                <h2 className="text-sm font-accent font-semibold text-noir">
                  ¡Hola Estilista, {user?.firstName}! ✨
                </h2>
                <p className="text-xs text-noir/50">Gestiona tu agenda y servicios</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-noir/40 hover:text-rose-gold rounded-xl hover:bg-white transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-gold rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-8 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
