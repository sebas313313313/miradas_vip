import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, ArrowLeft, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const result = register(formData);
    if (result.success) {
      navigate('/mis-cursos');
    } else {
      setError('Error al registrar. Intenta de nuevo.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden px-4 py-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-rose-gold/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-burgundy/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="w-full max-w-lg relative z-10 animate-fade-in-up">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-accent mb-8 transition-colors">
          <ArrowLeft size={16} /> Volver al inicio
        </Link>

        <div className="bg-white rounded-3xl shadow-strong p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
              <UserPlus size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-noir mb-2">
              Crea tu Cuenta
            </h1>
            <p className="text-sm text-noir/50">
              Regístrate para inscribirte a nuestros cursos
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-6 animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label" htmlFor="reg-firstName">Nombre</label>
                <input id="reg-firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="Tu nombre" className="input-field" required />
              </div>
              <div>
                <label className="input-label" htmlFor="reg-lastName">Apellido</label>
                <input id="reg-lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Tu apellido" className="input-field" required />
              </div>
            </div>

            <div>
              <label className="input-label" htmlFor="reg-email">Correo electrónico</label>
              <input id="reg-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="tu@email.com" className="input-field" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="input-label" htmlFor="reg-phone">Teléfono / WhatsApp</label>
                <input id="reg-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+57 300 123 4567" className="input-field" required />
              </div>
              <div>
                <label className="input-label" htmlFor="reg-city">Ciudad</label>
                <select id="reg-city" name="city" value={formData.city} onChange={handleChange} className="input-field" required>
                  <option value="">Seleccionar</option>
                  <option value="Popayán">Popayán</option>
                  <option value="Cali">Cali</option>
                </select>
              </div>
            </div>

            <div>
              <label className="input-label" htmlFor="reg-password">Contraseña</label>
              <div className="relative">
                <input id="reg-password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Mínimo 6 caracteres" className="input-field pr-12" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-noir/30 hover:text-noir/60 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="input-label" htmlFor="reg-confirmPassword">Confirmar contraseña</label>
              <input id="reg-confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Repite tu contraseña" className="input-field" required />
            </div>

            <div>
              <label className="input-label" htmlFor="reg-referralCode">
                Código de referido <span className="text-noir/30">(opcional)</span>
              </label>
              <input id="reg-referralCode" name="referralCode" type="text" value={formData.referralCode} onChange={handleChange} placeholder="Ej: MV-REF-ABC123" className="input-field" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base mt-2">
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registrando...
                </div>
              ) : 'Crear Cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-noir/50 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-rose-gold hover:text-burgundy font-semibold transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
