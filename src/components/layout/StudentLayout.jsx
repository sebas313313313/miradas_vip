import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen, Award, TrendingUp, User, LogOut, Menu, X, ChevronRight, Bell
} from 'lucide-react';

const sidebarLinks = [
  { to: '/alumna/progreso', icon: TrendingUp, label: 'Mi Progreso' },
  { to: '/alumna/cursos', icon: BookOpen, label: 'Mis Cursos' },
  { to: '/alumna/certificados', icon: Award, label: 'Mis Certificados' },
  { to: '/alumna/perfil', icon: User, label: 'Mi Perfil' },
];

export default function StudentLayout() {
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
    <div className="min-h-screen bg-cream flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-lavender/30 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-lavender/30">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">M</span>
              </div>
              <span className="text-noir font-heading font-bold">Miradas <span className="text-rose-gold">VIP</span></span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-noir/50 hover:text-noir">
              <X size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 py-4 px-3 overflow-y-auto">
            <p className="text-xs text-noir/30 uppercase tracking-wider px-3 mb-3 font-accent">
              Portal Alumna
            </p>
            {sidebarLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-accent transition-all duration-200 mb-1
                  ${isActive(link.to) 
                    ? 'bg-rose-gold/10 text-burgundy font-semibold border border-rose-gold/20' 
                    : 'text-noir/60 hover:text-noir hover:bg-cream border border-transparent'}`}
              >
                <link.icon size={18} className={isActive(link.to) ? 'text-burgundy' : 'text-noir/40'} />
                <span className="flex-1">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Section at bottom */}
          <div className="border-t border-lavender/30 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-sm shadow-glow/30">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-noir font-medium truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-noir/50 truncate">Alumna</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-noir/50 hover:text-red-500 hover:bg-red-50 transition-colors font-accent">
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-noir/50 z-30 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg border-b border-lavender/30 shrink-0">
          <div className="flex items-center justify-between px-4 md:px-8 h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-noir/50 hover:text-noir rounded-lg hover:bg-cream transition-colors">
                <Menu size={20} />
              </button>
              <div className="hidden sm:block">
                <h2 className="text-sm font-accent font-semibold text-noir">
                  ¡Hola, {user?.firstName}! ✨
                </h2>
                <p className="text-xs text-noir/50">Tu espacio de aprendizaje</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-noir/40 hover:text-rose-gold rounded-xl hover:bg-cream transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-rose-gold rounded-full" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
