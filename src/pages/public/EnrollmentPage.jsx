import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { mockCourses, formatCurrency } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { 
  ArrowLeft, Upload, CheckCircle2, DollarSign, 
  MapPin, CalendarDays, ShieldCheck, AlertCircle
} from 'lucide-react';

export default function EnrollmentPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const course = mockCourses.find(c => c.slug === slug);
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone;

  if (!course) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
        <p>Curso no encontrado.</p>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor sube el comprobante de pago");
      return;
    }
    
    setLoading(true);
    // Simulate API upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setStep(3); // Success step
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="section-container max-w-4xl">
        <Link to={`/cursos/${course.slug}`} className="inline-flex items-center gap-2 text-noir/50 hover:text-burgundy text-sm font-accent mb-6 transition-colors">
          <ArrowLeft size={16} /> Volver al curso
        </Link>

        {/* Progress bar */}
        <div className="flex items-center justify-between mb-8 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-lavender/50 rounded-full z-0" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-rose-gold rounded-full z-0 transition-all duration-500"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          />
          
          <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 1 ? 'bg-rose-gold text-white shadow-glow' : 'bg-white text-noir/30 border-2 border-lavender/50'}`}>
            1
          </div>
          <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 2 ? 'bg-rose-gold text-white shadow-glow' : 'bg-white text-noir/30 border-2 border-lavender/50'}`}>
            2
          </div>
          <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= 3 ? 'bg-rose-gold text-white shadow-glow' : 'bg-white text-noir/30 border-2 border-lavender/50'}`}>
            3
          </div>
        </div>
        <div className="flex justify-between text-xs font-accent text-noir/50 mb-8 px-1">
          <span>Resumen</span>
          <span>Pago</span>
          <span>Confirmación</span>
        </div>

        <div className="bg-white rounded-3xl shadow-strong overflow-hidden">
          {/* STEP 1: SUMMARY */}
          {step === 1 && (
            <div className="p-6 md:p-10 animate-fade-in-up">
              <h2 className="text-2xl font-heading font-bold text-noir mb-6">Resumen de Inscripción</h2>
              
              <div className="bg-cream p-5 rounded-2xl border border-lavender/30 mb-8">
                <h3 className="text-lg font-heading font-semibold text-noir mb-2">{course.name}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-noir/60 flex items-center gap-2"><MapPin size={14} className="text-rose-gold" /> {course.city} - {course.venue}</p>
                  <p className="text-sm text-noir/60 flex items-center gap-2"><CalendarDays size={14} className="text-rose-gold" /> {course.schedule}</p>
                </div>
                
                <div className="pt-4 border-t border-lavender/30 flex justify-between items-center">
                  <span className="text-noir font-medium">Valor a Pagar Hoy (Reserva 50%)</span>
                  <span className="text-2xl font-heading font-bold text-burgundy">{formatCurrency(course.reservationPrice)}</span>
                </div>
              </div>

              {/* Personal Data Form */}
              <div className="mb-8">
                <h3 className="font-heading font-semibold text-noir mb-4 text-lg">Tus Datos Personales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="input-label">Nombres</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName} 
                      onChange={handleInputChange} 
                      className="input-field" 
                      placeholder="Ej. María" 
                    />
                  </div>
                  <div>
                    <label className="input-label">Apellidos</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName} 
                      onChange={handleInputChange} 
                      className="input-field" 
                      placeholder="Ej. Gómez" 
                    />
                  </div>
                  <div>
                    <label className="input-label">Correo Electrónico</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className="input-field" 
                      placeholder="maria@ejemplo.com" 
                    />
                  </div>
                  <div>
                    <label className="input-label">WhatsApp / Teléfono</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      className="input-field" 
                      placeholder="300 123 4567" 
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => setStep(2)} 
                  disabled={!isFormValid}
                  className="btn-primary w-full sm:w-auto"
                >
                  Continuar al Pago
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 2 && (
            <div className="p-6 md:p-10 animate-fade-in-up">
              <h2 className="text-2xl font-heading font-bold text-noir mb-2">Pago de Reserva</h2>
              <p className="text-sm text-noir/50 mb-6">Transfiere el valor de la reserva para asegurar tu cupo.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Instructions */}
                <div>
                  <div className="bg-cream rounded-2xl border border-rose-gold/30 p-5 mb-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign size={20} className="text-emerald-600" />
                      <h3 className="font-heading font-semibold text-noir">Datos de Transferencia</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-noir/50 uppercase tracking-wider mb-1">Banco / Plataforma</p>
                        <p className="font-bold text-noir text-lg">NEQUI</p>
                      </div>
                      <div>
                        <p className="text-xs text-noir/50 uppercase tracking-wider mb-1">Número de Cuenta</p>
                        <div className="flex items-center gap-2">
                          <p className="font-heading font-bold text-burgundy text-2xl tracking-wider">301 699 1953</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-noir/50 uppercase tracking-wider mb-1">A nombre de</p>
                        <p className="font-medium text-noir">Vanessa Fernández</p>
                      </div>
                      <div className="pt-4 border-t border-lavender/30">
                        <p className="text-xs text-noir/50 uppercase tracking-wider mb-1">Valor a transferir</p>
                        <p className="font-bold text-emerald-600 text-xl">{formatCurrency(course.reservationPrice)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <ShieldCheck size={20} className="text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Tu inscripción quedará <strong>Pendiente de Verificación</strong>. Nuestra administradora validará tu pago en las próximas 2 a 4 horas hábiles.
                    </p>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <h3 className="font-heading font-semibold text-noir mb-3">Sube tu comprobante</h3>
                  <p className="text-xs text-noir/50 mb-4">Adjunta una captura de pantalla clara del comprobante de transferencia.</p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <input 
                        type="file" 
                        accept="image/*,.pdf" 
                        onChange={handleFileChange}
                        className="hidden" 
                        id="receipt-upload"
                      />
                      <label 
                        htmlFor="receipt-upload"
                        className={`block w-full border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${preview ? 'border-emerald-400 bg-emerald-50/30' : 'border-rose-gold/40 hover:bg-cream hover:border-rose-gold'}`}
                      >
                        {preview ? (
                          <div className="space-y-3">
                            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
                              <CheckCircle2 size={24} className="text-emerald-600" />
                            </div>
                            <p className="text-sm font-bold text-emerald-700">Comprobante Cargado</p>
                            <p className="text-xs text-emerald-600/70">{file?.name}</p>
                            <span className="inline-block px-3 py-1 bg-white rounded-lg text-xs text-noir/50 shadow-sm mt-2">
                              Haz clic para cambiar archivo
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="w-16 h-16 rounded-full bg-rose-gold/10 flex items-center justify-center mx-auto text-rose-gold group-hover:scale-110 transition-transform">
                              <Upload size={24} />
                            </div>
                            <p className="text-sm font-bold text-noir">Haz clic para subir archivo</p>
                            <p className="text-xs text-noir/40">Soporta JPG, PNG o PDF (Max 5MB)</p>
                          </div>
                        )}
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        type="button" 
                        onClick={() => setStep(1)} 
                        className="btn-ghost"
                        disabled={loading}
                      >
                        Atrás
                      </button>
                      <button 
                        type="submit" 
                        className="btn-primary flex-1 justify-center"
                        disabled={!file || loading}
                      >
                        {loading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Enviando...
                          </div>
                        ) : 'Enviar Comprobante'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 3 && (
            <div className="p-8 md:p-16 text-center animate-fade-in-up">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-emerald-600" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-noir mb-4">¡Comprobante Enviado!</h2>
              <p className="text-noir/60 mb-8 max-w-md mx-auto leading-relaxed">
                Hemos recibido tu solicitud de inscripción para el curso de <strong>{course.name}</strong> y tu comprobante de pago.
              </p>

              <div className="bg-cream rounded-2xl p-6 mb-8 max-w-md mx-auto border border-lavender/30">
                <p className="text-sm font-semibold text-noir mb-2">Siguientes Pasos:</p>
                <ol className="text-sm text-noir/70 text-left list-decimal list-inside space-y-2">
                  <li>La administradora validará tu pago en un plazo de 2 a 4 horas.</li>
                  <li>Una vez aprobado, <strong>recibirás un correo</strong> con el acceso a tu cuenta.</li>
                  <li>Podrás iniciar sesión en la plataforma para ver el material y descargar tu certificado al finalizar.</li>
                </ol>
              </div>

              <div className="flex justify-center">
                <Link to="/" className="btn-primary w-full sm:w-auto px-10">
                  Volver a la Academia
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
