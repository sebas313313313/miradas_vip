import { useAuth } from '../../context/AuthContext';
import { CheckCircle, Clock, BookOpen, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stages = [
  { id: 'enrolled', label: 'Inscrita', description: 'Pago verificado y cupo reservado' },
  { id: 'in_training', label: 'En Formación', description: 'Asistiendo a clases prácticas y teóricas' },
  { id: 'final_phase', label: 'Fase Final', description: 'Prácticas finales y evaluación' },
  { id: 'certified', label: 'Certificada', description: 'Curso completado exitosamente' },
];

export default function StudentProgressPage() {
  const { user } = useAuth();
  
  // En un entorno real, esto vendría del backend
  // Por ahora, simulamos que la alumna está en 'in_training' o 'certified'
  const currentStatus = user?.isCertified ? 'certified' : 'in_training';
  
  const getStageIndex = (status) => stages.findIndex(s => s.id === status);
  const currentIndex = getStageIndex(currentStatus);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-noir mb-2">Mi Progreso</h1>
        <p className="text-sm text-noir/60 font-accent">Haz seguimiento a tu proceso de formación en la academia.</p>
      </div>

      {/* Course Summary Card */}
      <div className="card bg-gradient-primary text-white p-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="badge bg-white/20 text-white border-white/30 backdrop-blur-sm mb-3">
              Curso Actual
            </span>
            <h2 className="text-2xl font-heading font-bold mb-2">Extensiones de Pestañas Clásicas</h2>
            <p className="text-white/80 font-accent text-sm flex items-center gap-2">
              <BookOpen size={16} /> Sede Popayán • Sábados 8:00am
            </p>
          </div>
          <Link to="/alumna/cursos" className="btn-ghost bg-white/10 hover:bg-white/20 text-white border border-white/30 whitespace-nowrap">
            Ir al curso <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Timeline */}
      <div className="card p-8">
        <h3 className="text-lg font-heading font-bold text-noir mb-8">Línea de Tiempo de tu Formación</h3>
        
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-lavender/50 md:left-1/2 md:-ml-[1px] md:top-6 md:bottom-6"></div>

          <div className="space-y-8">
            {stages.map((stage, index) => {
              const isCompleted = index < currentIndex;
              const isCurrent = index === currentIndex;
              const isPending = index > currentIndex;

              return (
                <div key={stage.id} className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-4 border-white z-10
                    ${isCompleted ? 'bg-emerald-500' : isCurrent ? 'bg-rose-gold shadow-[0_0_0_4px_rgba(201,160,141,0.2)]' : 'bg-lavender'}
                  `}>
                    {isCompleted ? <CheckCircle size={14} className="text-white" /> : 
                     isCurrent ? <Clock size={14} className="text-white animate-pulse" /> : 
                     <div className="w-2 h-2 rounded-full bg-white"></div>}
                  </div>

                  {/* Content Box */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <div className={`p-5 rounded-2xl transition-all duration-300 ${
                      isCurrent ? 'bg-rose-gold/10 border border-rose-gold/30 shadow-sm' : 
                      isCompleted ? 'bg-emerald-50 border border-emerald-100' : 
                      'bg-cream border border-lavender/30 opacity-70'
                    }`}>
                      <span className={`text-xs font-accent font-bold uppercase tracking-wider mb-1 block ${
                        isCurrent ? 'text-burgundy' : isCompleted ? 'text-emerald-700' : 'text-noir/40'
                      }`}>
                        Paso {index + 1}
                      </span>
                      <h4 className={`text-lg font-heading font-bold mb-1 ${
                        isCurrent ? 'text-noir' : isCompleted ? 'text-emerald-900' : 'text-noir/50'
                      }`}>
                        {stage.label}
                      </h4>
                      <p className={`text-sm ${
                        isCurrent ? 'text-noir/70' : isCompleted ? 'text-emerald-700/70' : 'text-noir/40'
                      }`}>
                        {stage.description}
                      </p>
                      
                      {isCurrent && stage.id === 'in_training' && (
                        <div className="mt-4 pt-4 border-t border-rose-gold/20 flex gap-3 flex-wrap">
                           <span className="badge bg-white text-burgundy border-rose-gold/30 text-xs">Asistencia: 80%</span>
                           <span className="badge bg-white text-burgundy border-rose-gold/30 text-xs">Prácticas: 3/5</span>
                        </div>
                      )}
                      
                      {isCompleted && stage.id === 'certified' && (
                        <div className="mt-4">
                          <Link to="/alumna/certificados" className="text-sm text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1 md:justify-end">
                            Ver Certificado <Award size={14} />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
