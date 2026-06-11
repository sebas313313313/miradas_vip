import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Shield, ArrowLeft, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLogin = location.state?.role === 'admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = login(email, password);
    if (result.success) {
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/alumna/progreso');
      }
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden px-4">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-rose-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-burgundy/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-accent mb-8 transition-colors">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-strong p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
              {isAdminLogin ? <Shield size={24} className="text-white" /> : <Sparkles size={24} className="text-white" />}
            </div>
            <h1 className="text-2xl font-heading font-bold text-noir mb-2">
              {isAdminLogin ? 'Acceso Administradora' : 'Bienvenida de vuelta'}
            </h1>
            <p className="text-sm text-noir/50">
              {isAdminLogin 
                ? 'Ingresa tus credenciales de administradora' 
                : 'Inicia sesión para acceder a tu cuenta'}
            </p>
          </div>

          {/* Demo credentials */}
          <div className="bg-blush-light rounded-xl p-4 mb-6 border border-rose-gold/10">
            <p className="text-xs font-accent font-semibold text-burgundy mb-2">🔑 Credenciales de prueba:</p>
            <div className="space-y-1 text-xs text-noir/60">
              <p><strong>Admin:</strong> admin@miradasvip.com / admin123</p>
              <p><strong>Alumna:</strong> alumna@test.com / 123456</p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6 animate-fade-in">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="input-label" htmlFor="login-email">Correo electrónico</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="input-label" htmlFor="login-password">Contraseña</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-noir/30 hover:text-noir/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-lavender text-rose-gold focus:ring-rose-gold/20" />
                <span className="text-sm text-noir/60">Recordarme</span>
              </label>
              <Link to="/recuperar-contrasena" className="text-sm text-rose-gold hover:text-burgundy font-medium transition-colors">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Ingresando...
                </div>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          {/* Register link */}
          {!isAdminLogin && (
            <p className="text-center text-sm text-noir/50 mt-6">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="text-rose-gold hover:text-burgundy font-semibold transition-colors">
                Regístrate aquí
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
