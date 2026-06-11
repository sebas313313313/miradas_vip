import { useAuth } from '../../context/AuthContext';
import { Award, Download, CheckCircle, Lock } from 'lucide-react';

export default function StudentCertificatesPage() {
  const { user } = useAuth();
  
  // En un entorno real, verificaríamos si tiene certificados emitidos
  const hasCertificate = user?.isCertified;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-noir">Mis Certificados</h1>
        <p className="text-sm text-noir/50 font-accent">Visualiza y descarga tus diplomas oficiales</p>
      </div>

      {!hasCertificate ? (
        <div className="card border-2 border-dashed border-lavender p-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-cream flex items-center justify-center mb-4 relative">
            <Award size={32} className="text-noir/30" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white border border-lavender flex items-center justify-center">
              <Lock size={14} className="text-noir/40" />
            </div>
          </div>
          <h3 className="text-lg font-heading font-bold text-noir mb-2">Aún no tienes certificados</h3>
          <p className="text-sm text-noir/50 max-w-md">
            Continúa con tu formación y completa todas las horas prácticas para desbloquear tu certificación oficial.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Certificate Item */}
          <div className="card p-0 overflow-hidden flex flex-col hover:shadow-medium transition-shadow">
            <div className="p-6 bg-gradient-primary text-white flex justify-between items-start">
              <div>
                <span className="badge bg-white/20 text-white border-white/30 backdrop-blur-sm mb-3">
                  <CheckCircle size={12} className="mr-1" /> Verificado
                </span>
                <h3 className="text-xl font-heading font-bold mb-1">Extensiones Clásicas</h3>
                <p className="text-sm text-white/80 font-accent">Emitido el 15 de Abril, 2026</p>
              </div>
              <Award size={48} className="text-white/20" />
            </div>
            
            <div className="p-6 bg-cream border-b border-lavender/30 flex justify-center">
              {/* Mini mockup of certificate */}
              <div className="w-full aspect-[1.414/1] bg-white border-4 border-double border-gold/30 p-4 shadow-sm relative flex flex-col items-center text-center justify-center scale-90">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center mb-2">
                  <span className="text-white font-heading font-bold text-xs">M</span>
                </div>
                <p className="text-[8px] uppercase tracking-widest text-noir/50 mb-1 font-accent">Miradas VIP certifica que</p>
                <h2 className="text-lg font-heading font-bold text-burgundy mb-2 border-b border-rose-gold/30 pb-1 px-4">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-[9px] text-noir/70 leading-tight">
                  Ha completado satisfactoriamente el curso de <br/>
                  <strong className="text-noir">Extensiones Clásicas</strong>
                </p>
                <Award size={16} className="text-gold opacity-80 mt-2" />
              </div>
            </div>

            <div className="p-4 flex gap-3">
              <button className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm">
                <Download size={16} /> Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
