import { useParams, Link } from 'react-router-dom';
import { mockCourses, formatCurrency, formatDate } from '../../data/mockData';
import { 
  MapPin, Clock, Users, CalendarDays, ArrowLeft, 
  CheckCircle2, Package, BookOpen, Award, Eye, Palette,
  Heart, DollarSign
} from 'lucide-react';

export default function CourseDetailPage() {
  const { slug } = useParams();
  const course = mockCourses.find(c => c.slug === slug);

  if (!course) {
    return (
      <div className="min-h-screen bg-cream pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold text-noir mb-4">Curso no encontrado</h2>
          <Link to="/cursos" className="btn-primary">Ver todos los cursos</Link>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (cat) => {
    if (cat === 'pestanas') return <Eye size={48} className="text-white/40" />;
    return <Palette size={48} className="text-white/40" />;
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="section-container">
        {/* Breadcrumb */}
        <Link to="/cursos" className="inline-flex items-center gap-2 text-noir/50 hover:text-burgundy text-sm font-accent mb-6 transition-colors">
          <ArrowLeft size={16} /> Volver a cursos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover */}
            <div className="card overflow-hidden">
              <div className="h-64 md:h-80 bg-gradient-primary flex items-center justify-center relative">
                {getCategoryIcon(course.category)}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="badge bg-white/90 text-burgundy">
                    {course.category === 'pestanas' ? '👁️ Pestañas' : '✨ Micropigmentación'}
                  </span>
                  <span className="badge bg-white/90 text-noir/60">
                    {course.level === 'beginner' ? 'Principiante' : 'Intermedio'}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 text-sm text-noir/50 mb-3 font-accent">
                  <MapPin size={14} className="text-rose-gold" />
                  {course.city} — {course.venue}
                </div>

                <h1 className="text-2xl md:text-3xl font-heading font-bold text-noir mb-4">
                  {course.name}
                </h1>

                <p className="text-noir/70 leading-relaxed mb-6">
                  {course.description}
                </p>

                {/* Quick info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blush-light rounded-xl p-4 text-center">
                    <CalendarDays size={18} className="mx-auto text-burgundy mb-1" />
                    <p className="text-xs text-noir/50">Inicio</p>
                    <p className="text-sm font-semibold text-noir">{formatDate(course.startDate)}</p>
                  </div>
                  <div className="bg-blush-light rounded-xl p-4 text-center">
                    <CalendarDays size={18} className="mx-auto text-burgundy mb-1" />
                    <p className="text-xs text-noir/50">Finalización</p>
                    <p className="text-sm font-semibold text-noir">{formatDate(course.endDate)}</p>
                  </div>
                  <div className="bg-blush-light rounded-xl p-4 text-center">
                    <Clock size={18} className="mx-auto text-burgundy mb-1" />
                    <p className="text-xs text-noir/50">Horario</p>
                    <p className="text-sm font-semibold text-noir">{course.schedule}</p>
                  </div>
                  <div className="bg-blush-light rounded-xl p-4 text-center">
                    <Users size={18} className="mx-auto text-burgundy mb-1" />
                    <p className="text-xs text-noir/50">Cupos</p>
                    <p className="text-sm font-semibold text-noir">
                      <span className={course.availableSlots <= 3 ? 'text-red-500' : ''}>
                        {course.availableSlots}
                      </span> disponibles
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="card p-6 md:p-8">
              <h2 className="text-xl font-heading font-semibold text-noir mb-4 flex items-center gap-2">
                <Award size={20} className="text-gold" /> Beneficios del Curso
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-noir/70">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Starter Kit */}
            <div className="card p-6 md:p-8">
              <h2 className="text-xl font-heading font-semibold text-noir mb-4 flex items-center gap-2">
                <Package size={20} className="text-rose-gold" /> Kit de Inicio Incluido
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course.starterKit.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-rose-gold mt-0.5 shrink-0" />
                    <span className="text-sm text-noir/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div className="card p-6 md:p-8">
              <h2 className="text-xl font-heading font-semibold text-noir mb-4 flex items-center gap-2">
                <BookOpen size={20} className="text-burgundy" /> Material Incluido
              </h2>
              <div className="space-y-3">
                {course.materialsIncluded.map((mat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-burgundy mt-0.5 shrink-0" />
                    <span className="text-sm text-noir/70">{mat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Pricing & Enrollment */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-sm text-noir/50 mb-1">Inversión Total</p>
                <p className="text-3xl font-heading font-bold text-burgundy">
                  {formatCurrency(course.totalPrice)}
                </p>
                <p className="text-sm text-noir/40 mt-1">COP</p>
              </div>

              <div className="bg-blush-light rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-noir/60">Reserva (50%)</span>
                  <span className="text-sm font-bold text-burgundy">{formatCurrency(course.reservationPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-noir/60">Restante</span>
                  <span className="text-sm font-bold text-noir/70">{formatCurrency(course.totalPrice - course.reservationPrice)}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-rose-gold/10">
                  <p className="text-xs text-noir/40 flex items-center gap-1">
                    <DollarSign size={10} />
                    Pago por Nequi o transferencia bancaria
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-noir/60">
                  <MapPin size={14} className="text-rose-gold shrink-0" />
                  <span>{course.venueAddress}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-noir/60">
                  <CalendarDays size={14} className="text-rose-gold shrink-0" />
                  <span>{formatDate(course.startDate)} — {formatDate(course.endDate)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-noir/60">
                  <Clock size={14} className="text-rose-gold shrink-0" />
                  <span>{course.schedule}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-noir/60">
                  <Users size={14} className="text-rose-gold shrink-0" />
                  <span className={course.availableSlots <= 3 ? 'text-red-500 font-semibold' : ''}>
                    {course.availableSlots} cupos disponibles de {course.totalSlots}
                  </span>
                </div>
              </div>

              {course.availableSlots > 0 ? (
                <Link
                  to={`/cursos/${course.slug}/inscripcion`}
                  className="btn-primary w-full py-4 text-base justify-center"
                >
                  Inscribirme Ahora
                </Link>
              ) : (
                <button disabled className="btn-primary w-full py-4 text-base opacity-50 cursor-not-allowed justify-center">
                  Sin Cupos Disponibles
                </button>
              )}

              <p className="text-center text-xs text-noir/40 mt-3">
                Al inscribirte aceptas nuestros términos y condiciones
              </p>

              {/* Instructor */}
              <div className="mt-6 pt-6 border-t border-lavender/30">
                <p className="text-xs text-noir/50 mb-3 font-accent uppercase tracking-wider">Instructora</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                    CM
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-noir">{course.instructor}</p>
                    <p className="text-xs text-noir/50">Fundadora Miradas VIP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
