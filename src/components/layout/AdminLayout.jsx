import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, BookOpen, Users, Award, CalendarDays,
  FileText, Building2, LogOut, Menu, X, ChevronRight,
  Bell, Settings, ClipboardList, PlaySquare
} from 'lucide-react';

const sidebarLinks = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { to: '/admin/solicitudes', icon: ClipboardList, label: 'Solicitudes', badge: 3 },
  { to: '/admin/cursos', icon: BookOpen, label: 'Cursos' },
  { to: '/admin/alumnas', icon: Users, label: 'Alumnas' },
  { to: '/admin/certificados', icon: Award, label: 'Certificados' },
  { to: '/admin/citas', icon: CalendarDays, label: 'Citas' },
  { to: '/admin/sedes', icon: Building2, label: 'Sedes' },
  { to: '/admin/contenido', icon: PlaySquare, label: 'Contenido Educativo' },
  { to: '/admin/configuracion', icon: Settings, label: 'Configuración' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path, exact) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-cream-dark flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-noir transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
              Administración
            </p>
            {sidebarLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-accent transition-all duration-200 mb-1
                  ${isActive(link.to, link.exact) 
                    ? 'bg-gradient-primary text-white shadow-glow/30' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'}`}
              >
                <link.icon size={18} />
                <span className="flex-1">{link.label}</span>
                {link.badge && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                {user?.firstName?.[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-white/40 truncate">Administradora</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors font-accent">
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-noir/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-20 bg-cream-dark/80 backdrop-blur-lg border-b border-lavender/20">
          <div className="flex items-center justify-between px-4 md:px-8 h-16">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-noir/50 hover:text-noir rounded-lg hover:bg-white transition-colors">
                <Menu size={20} />
              </button>
              <div className="hidden sm:block">
                <h2 className="text-sm font-accent font-semibold text-noir">
                  Bienvenida, {user?.firstName} 👋
                </h2>
                <p className="text-xs text-noir/40">Panel de Administración</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-noir/40 hover:text-noir rounded-xl hover:bg-white transition-colors">
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <Link to="/" className="btn-ghost text-xs">
                Ver Sitio <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
