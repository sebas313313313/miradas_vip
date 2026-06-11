import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockEducationalContent } from '../../data/mockData';
import { PlayCircle, Clock, BookOpen, ChevronRight, CheckCircle2, PlaySquare, XCircle } from 'lucide-react';

export default function StudentCoursesPage() {
  const { user } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState(null);

  // En un entorno real, estos serían los cursos en los que la alumna está inscrita
  const myCourses = [
    {
      id: '1',
      name: 'Extensiones de Pestañas Clásicas',
      status: user?.isCertified ? 'completed' : 'in_training',
      progress: user?.isCertified ? 100 : 45,
      instructor: 'Vanessa Fernández',
      nextClass: user?.isCertified ? 'Curso Finalizado' : 'Próximo Sábado 8:00am',
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-noir">Mis Cursos</h1>
        <p className="text-sm text-noir/50 font-accent">Accede al material educativo de tus cursos activos</p>
      </div>

      {myCourses.map(course => (
        <div key={course.id} className="space-y-6">
          {/* Course Header Card */}
          <div className="card p-6 border-l-4 border-l-rose-gold">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge bg-emerald-100 text-emerald-800 border-emerald-200">En Curso</span>
                  <span className="text-xs text-noir/50 font-accent">Instructora: {course.instructor}</span>
                </div>
                <h2 className="text-xl font-heading font-bold text-noir mb-1">{course.name}</h2>
                <p className="text-sm text-noir/60 flex items-center gap-2">
                  <Clock size={14} className="text-rose-gold" /> {course.nextClass}
                </p>
              </div>
              
              <div className="md:w-1/3 w-full bg-cream p-4 rounded-xl">
                <div className="flex justify-between text-xs font-accent mb-2">
                  <span className="text-noir/60 font-semibold">Progreso general</span>
                  <span className="text-burgundy font-bold">{course.progress}%</span>
                </div>
                <div className="w-full h-2 bg-lavender/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary rounded-full transition-all duration-1000"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Educational Content Section */}
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-lavender/30 pb-4">
              <PlaySquare size={20} className="text-burgundy" />
              <h3 className="text-lg font-heading font-bold text-noir">Material Audiovisual</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockEducationalContent.map((video, idx) => (
                <div 
                  key={video.id} 
                  className="flex gap-4 p-4 rounded-xl border border-lavender/50 hover:border-rose-gold hover:bg-rose-gold/5 transition-all cursor-pointer group"
                  onClick={() => setSelectedVideo(video)}
                >
                  <div className="w-24 h-16 rounded-lg bg-noir relative overflow-hidden shrink-0 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-primary opacity-40"></div>
                    <PlayCircle size={24} className="text-white relative z-10 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-bold text-sm text-noir truncate group-hover:text-burgundy transition-colors">
                      {video.title}
                    </h4>
                    <p className="text-xs text-noir/50 line-clamp-2 mt-1">
                      {video.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      {idx === 0 ? (
                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          <CheckCircle2 size={10} /> Visto
                        </span>
                      ) : (
                        <span className="text-[10px] bg-lavender text-noir/60 px-2 py-0.5 rounded-full font-bold">
                          Pendiente
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-strong max-w-3xl w-full animate-fade-in-up overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-lavender/30 flex justify-between items-center bg-noir text-white">
              <h3 className="font-heading font-bold truncate pr-4">{selectedVideo.title}</h3>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors shrink-0"
              >
                <XCircle size={20} />
              </button>
            </div>
            
            <div className="aspect-video bg-black relative flex items-center justify-center">
              {/* Simulated Video Player */}
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                <PlayCircle size={64} className="text-white/50" />
                <p className="text-white/50 text-sm font-accent">Simulador de Reproductor de Video</p>
                <p className="text-xs text-white/30 truncate max-w-xs">{selectedVideo.url}</p>
              </div>
            </div>

            <div className="p-6 overflow-y-auto">
              <h4 className="font-heading font-bold text-lg text-noir mb-2">Acerca de esta lección</h4>
              <p className="text-sm text-noir/70 leading-relaxed">
                {selectedVideo.description}
              </p>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="btn-primary"
                >
                  Marcar como completado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
