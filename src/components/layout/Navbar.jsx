import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, X, User, LogOut, LayoutDashboard, 
  BookOpen, CalendarDays, Award, Settings, ChevronDown,
  Shield
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminArea = location.pathname.startsWith('/admin');
  const isStylistArea = location.pathname.startsWith('/estilista');

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
  };

  const publicLinks = [
    { to: '/cursos', label: 'Cursos' },
    { to: '/profesionales', label: 'Profesionales' },
    { to: '/verificar-certificado', label: 'Verificar Certificado' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-heading font-bold text-lg">M</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-heading font-bold text-xl tracking-wide">Miradas</span>
              <span className="text-rose-gold font-heading font-bold text-xl ml-1">VIP</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {publicLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-accent font-medium transition-all duration-300
                  ${location.pathname === link.to 
                    ? 'text-rose-gold bg-white/10' 
                    : 'text-white/80 hover:text-white hover:bg-white/5'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Admin access - small icon at top */}
            {!isAuthenticated && (
              <Link
                to="/login"
                state={{ role: 'admin' }}
                className="p-2 rounded-lg text-white/40 hover:text-rose-gold hover:bg-white/5 transition-all duration-300"
                title="Acceso Administradora"
              >
                <Shield size={16} />
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-all duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold">
                    {user?.firstName?.[0]}
                  </div>
                  <span className="text-sm font-accent font-medium">{user?.firstName}</span>
                  <ChevronDown size={14} className={`transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {showUserMenu && (
                  <>
                    <div className="fixed inset-0" onClick={() => setShowUserMenu(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-strong border border-lavender/30 py-2 animate-fade-in">
                      <div className="px-4 py-2 border-b border-lavender/30">
                        <p className="text-sm font-semibold text-noir">{user?.firstName} {user?.lastName}</p>
                        <p className="text-xs text-noir/50">{user?.email}</p>
                      </div>

                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-noir/70 hover:bg-blush-light hover:text-burgundy transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          Panel Admin
                        </Link>
                      )}

                      {user?.role === 'student' && (
                        <>
                          <Link
                            to="/alumna/cursos"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-noir/70 hover:bg-blush-light hover:text-burgundy transition-colors"
                          >
                            <BookOpen size={16} />
                            Mis Cursos
                          </Link>
                          <Link
                            to="/alumna/certificados"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-noir/70 hover:bg-blush-light hover:text-burgundy transition-colors"
                          >
                            <Award size={16} />
                            Mis Certificados
                          </Link>
                        </>
                      )}

                      {user?.isCertified && (
                        <Link
                          to="/estilista/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-noir/70 hover:bg-blush-light hover:text-burgundy transition-colors"
                        >
                          <CalendarDays size={16} />
                          Mi Perfil Profesional
                        </Link>
                      )}

                      <Link
                        to="/alumna/perfil"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-noir/70 hover:bg-blush-light hover:text-burgundy transition-colors"
                      >
                        <Settings size={16} />
                        Mi Perfil
                      </Link>

                      <div className="border-t border-lavender/30 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} />
                          Cerrar Sesión
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-ghost text-white/80 hover:text-white text-sm">
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className="btn-primary btn-sm">
                  Inscribirme
                </Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
            {publicLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg font-accent text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-white/10 mt-3 pt-3 flex flex-col gap-2 px-4">
              {isAuthenticated ? (
                <>
                  <div className="text-white/60 text-sm mb-2">
                    Hola, {user?.firstName}
                  </div>
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsOpen(false)} className="btn-primary btn-sm w-full text-center">
                      Panel Admin
                    </Link>
                  )}
                  <button onClick={handleLogout} className="btn-outline btn-sm text-sm border-white/30 text-white/80">
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="btn-secondary btn-sm w-full text-center text-white border-white/30">
                    Iniciar Sesión
                  </Link>
                  <Link to="/registro" onClick={() => setIsOpen(false)} className="btn-primary btn-sm w-full text-center">
                    Inscribirme
                  </Link>
                  <Link
                    to="/login"
                    state={{ role: 'admin' }}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-1 text-white/30 text-xs py-2 hover:text-white/50 transition-colors"
                  >
                    <Shield size={12} />
                    Acceso Administradora
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
