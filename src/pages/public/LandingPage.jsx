import { Link } from 'react-router-dom';
import { 
  Award, Users, CalendarDays, BookOpen, Star, 
  ArrowRight, Sparkles, MapPin, Clock, ChevronRight,
  Eye, Palette, Heart, CheckCircle2, Phone, User
} from 'lucide-react';
import { mockCourses, mockTestimonials, formatCurrency } from '../../data/mockData';

export default function LandingPage() {
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-rose-gold/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-burgundy/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-gold/5 rounded-full blur-3xl" />
          {/* Subtle pattern */}
          <div className="absolute inset-0 opacity-5" 
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(183,110,121,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} 
          />
        </div>

        <div className="section-container relative z-10 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Academy badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/70 text-sm font-accent mb-8 animate-fade-in backdrop-blur-sm">
              <Sparkles size={14} className="text-gold" />
              Academia Certificada en Belleza
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 animate-fade-in-up">
              Transforma tu{' '}
              <span className="text-rose-gold italic">Pasión</span>
              <br />
              en una Profesión{' '}
              <span className="text-gold">Certificada</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/60 font-body max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2">
              Cursos presenciales de <strong className="text-white/90">extensiones de pestañas</strong> y{' '}
              <strong className="text-white/90">micropigmentación de cejas y labios</strong> en Popayán y Cali. 
              Certifícate y empieza a generar ingresos.
            </p>

            {/* CTA Buttons - BIG and prominent */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 animate-fade-in-up stagger-3">
              <Link
                to="/cursos"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-primary text-white font-accent font-bold text-lg rounded-2xl shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(183,110,121,0.5)] active:scale-95"
              >
                <BookOpen size={22} />
                Inscribirme a un Curso
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/profesionales"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 bg-white/10 text-white font-accent font-bold text-lg rounded-2xl border-2 border-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:scale-105 active:scale-95"
              >
                <CalendarDays size={22} />
                Agendar una Cita
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 animate-fade-in-up stagger-4">
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white">150+</p>
                <p className="text-sm text-white/40 font-accent">Alumnas Formadas</p>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-gold">40+</p>
                <p className="text-sm text-white/40 font-accent">Profesionales Certificadas</p>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-rose-gold">5</p>
                <p className="text-sm text-white/40 font-accent">Cursos Disponibles</p>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <p className="text-3xl font-heading font-bold text-white">2</p>
                <p className="text-sm text-white/40 font-accent">Ciudades</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white/40 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ==================== INSTRUCTOR PROFILE ==================== */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-rose-gold/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />

        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image/Avatar */}
            <div className="relative mx-auto lg:mx-0 w-full max-w-md">
              <div className="aspect-[4/5] rounded-3xl bg-gradient-primary p-1 overflow-hidden shadow-strong">
                <div className="w-full h-full bg-cream rounded-[22px] flex items-center justify-center overflow-hidden relative group">
                  {/* Placeholder image for Vanessa */}
                  <div className="absolute inset-0 bg-rose-gold/20 flex flex-col items-center justify-center">
                    <User size={64} className="text-burgundy/50 mb-4" />
                    <span className="font-accent text-burgundy/60 font-semibold tracking-wider">FOTO DE PERFIL</span>
                  </div>
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy/80 via-transparent to-transparent opacity-60" />
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-strong flex items-center gap-3 animate-float">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-accent font-bold text-noir/50 uppercase">Certificada</p>
                  <p className="font-heading font-bold text-noir">Profesional</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-rose-gold/10 text-burgundy rounded-full text-xs font-accent font-bold tracking-wider mb-5 border border-rose-gold/20">
                Profesional Educadora
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-noir mb-2">
                Vanessa Fernández
              </h2>
              <p className="text-xl md:text-2xl text-rose-gold font-accent italic mb-6">
                Fundadora y Directora
              </p>
              
              <p className="text-noir/70 leading-relaxed mb-8 text-lg">
                Soy fundadora de la <strong className="text-burgundy">academia líder en extensiones de pestañas y micropigmentación de cejas y labios</strong>. Con años de experiencia en el sector de la belleza, mi misión es formar a la nueva generación de profesionales con técnicas de vanguardia, para que logren su independencia económica.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <div className="flex items-center gap-4 bg-cream px-6 py-4 rounded-2xl border border-lavender/30 shadow-sm w-full sm:w-auto">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Phone size={20} className="text-burgundy" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-noir/50 font-accent uppercase tracking-wider mb-0.5">Contacto / WhatsApp</p>
                    <p className="font-heading font-bold text-noir text-xl">301 699 1953</p>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <p className="text-sm font-semibold text-noir font-accent uppercase tracking-wider">Síguenos en redes:</p>
                <div className="flex items-center gap-3">
                  {/* Facebook SVG */}
                  <a href="#" className="w-12 h-12 rounded-full bg-white border border-lavender flex items-center justify-center hover:border-rose-gold hover:text-rose-gold transition-colors shadow-sm group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  {/* Instagram SVG */}
                  <a href="#" className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 p-[2px] group shadow-sm hover:shadow-md transition-all">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center group-hover:bg-transparent transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-noir group-hover:text-white transition-colors group-hover:scale-110"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICES SECTION ==================== */}
      <section className="section-padding bg-cream">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-accent font-semibold text-rose-gold uppercase tracking-wider mb-3">
              Nuestras Especialidades
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-noir mb-4">
              Arte y Técnica para tu <span className="text-gradient italic">Mirada</span>
            </h2>
            <p className="text-noir/60 max-w-xl mx-auto">
              Formamos profesionales en las técnicas más demandadas del mercado de la belleza.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 - Pestañas */}
            <div className="card-hover p-8 text-center group">
              <div className="w-16 h-16 rounded-2xl bg-blush flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <Eye size={28} className="text-burgundy" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-noir mb-3">
                Extensiones de Pestañas
              </h3>
              <p className="text-noir/60 text-sm leading-relaxed mb-4">
                Técnicas clásica, volumen ruso y efecto híbrido. Aprende a crear miradas impactantes con las técnicas más solicitadas del mercado.
              </p>
              <Link to="/cursos?category=pestanas" className="inline-flex items-center gap-1 text-sm font-accent font-semibold text-rose-gold hover:text-burgundy transition-colors">
                Ver cursos <ChevronRight size={14} />
              </Link>
            </div>

            {/* Card 2 - Cejas */}
            <div className="card-hover p-8 text-center group">
              <div className="w-16 h-16 rounded-2xl bg-blush flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <Palette size={28} className="text-burgundy" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-noir mb-3">
                Micropigmentación de Cejas
              </h3>
              <p className="text-noir/60 text-sm leading-relaxed mb-4">
                Microblading, microshading y técnica combinada. Diseña cejas perfectas adaptadas al rostro de cada clienta.
              </p>
              <Link to="/cursos?category=micropigmentacion" className="inline-flex items-center gap-1 text-sm font-accent font-semibold text-rose-gold hover:text-burgundy transition-colors">
                Ver cursos <ChevronRight size={14} />
              </Link>
            </div>

            {/* Card 3 - Labios */}
            <div className="card-hover p-8 text-center group">
              <div className="w-16 h-16 rounded-2xl bg-blush flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                <Heart size={28} className="text-burgundy" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-noir mb-3">
                Micropigmentación de Labios
              </h3>
              <p className="text-noir/60 text-sm leading-relaxed mb-4">
                Lip blushing y full lip. Aprende la técnica de neutralización y pigmentación labial para resultados naturales y duraderos.
              </p>
              <Link to="/cursos?category=micropigmentacion" className="inline-flex items-center gap-1 text-sm font-accent font-semibold text-rose-gold hover:text-burgundy transition-colors">
                Ver cursos <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED COURSES ==================== */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-accent font-semibold text-rose-gold uppercase tracking-wider mb-3">
              Próximos Cursos
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-noir mb-4">
              Cursos <span className="text-gradient italic">Disponibles</span>
            </h2>
            <p className="text-noir/60 max-w-xl mx-auto">
              Encuentra el curso perfecto para iniciar tu carrera profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredCourses.map((course, index) => (
              <div key={course.id} className={`card-hover overflow-hidden group animate-fade-in-up stagger-${index + 1}`}>
                {/* Image placeholder */}
                <div className="relative h-48 bg-gradient-primary overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {course.category === 'pestanas' 
                      ? <Eye size={48} className="text-white/30" />
                      : <Palette size={48} className="text-white/30" />
                    }
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-3 left-3">
                    <span className="badge bg-white/90 text-burgundy shadow-sm">
                      <Sparkles size={10} /> Próximo
                    </span>
                  </div>
                  {/* Available slots */}
                  <div className="absolute top-3 right-3">
                    <span className={`badge ${course.availableSlots <= 3 ? 'bg-red-100 text-red-700' : 'bg-white/90 text-noir/70'}`}>
                      {course.availableSlots} cupos
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-noir/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link to={`/cursos/${course.slug}`} className="btn-primary btn-sm">
                      Ver Detalles
                    </Link>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-noir/50 mb-2 font-accent">
                    <MapPin size={12} className="text-rose-gold" />
                    {course.city} — {course.venue}
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-noir mb-2 group-hover:text-burgundy transition-colors">
                    {course.name}
                  </h3>
                  <p className="text-sm text-noir/60 mb-4 line-clamp-2">
                    {course.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-noir/50 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {course.schedule}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-lavender/30">
                    <div>
                      <p className="text-xs text-noir/50">Inversión</p>
                      <p className="text-lg font-heading font-bold text-burgundy">
                        {formatCurrency(course.totalPrice)}
                      </p>
                    </div>
                    <Link
                      to={`/cursos/${course.slug}`}
                      className="flex items-center gap-1 text-sm font-accent font-semibold text-rose-gold hover:text-burgundy transition-colors"
                    >
                      Inscribirme <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/cursos" className="btn-secondary">
              Ver Todos los Cursos
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== PROCESS / HOW IT WORKS ==================== */}
      <section className="section-padding bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-gold/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-accent font-semibold text-gold uppercase tracking-wider mb-3">
              Tu Camino al Éxito
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              De Alumna a <span className="text-rose-gold italic">Profesional</span> Certificada
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Un proceso diseñado para que logres tu certificación y comiences a ejercer tu profesión.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {[
              { step: 1, icon: BookOpen, title: 'Inscríbete', desc: 'Elige tu curso, reserva tu cupo con el 50% y asegura tu lugar.', color: 'text-rose-gold' },
              { step: 2, icon: Users, title: 'Aprende', desc: 'Clases presenciales intensivas con práctica real y material completo.', color: 'text-white' },
              { step: 3, icon: Award, title: 'Certifícate', desc: 'Obtén tu certificación digital verificable respaldada por Miradas VIP.', color: 'text-gold' },
              { step: 4, icon: CalendarDays, title: 'Ejerce', desc: 'Crea tu perfil profesional, recibe citas y genera ingresos.', color: 'text-rose-gold' },
            ].map(({ step, icon: Icon, title, desc, color }) => (
              <div key={step} className="relative text-center group">
                {/* Step number */}
                <div className="text-6xl font-heading font-bold text-white/5 absolute -top-2 left-1/2 -translate-x-1/2">
                  {step}
                </div>
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${color}`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>

                {/* Connector line (not on last) */}
                {step < 4 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+35px)] w-[calc(100%-70px)] h-px bg-gradient-to-r from-white/20 to-white/5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="section-padding bg-cream">
        <div className="section-container">
          <div className="text-center mb-14">
            <span className="inline-block text-sm font-accent font-semibold text-rose-gold uppercase tracking-wider mb-3">
              Testimonios
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-noir mb-4">
              Lo que dicen nuestras <span className="text-gradient italic">Graduadas</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {mockTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} className={`card-glass p-6 animate-fade-in-up stagger-${index + 1}`}>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                {/* Comment */}
                <p className="text-noir/70 text-sm leading-relaxed mb-5 italic">
                  "{testimonial.comment}"
                </p>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-lavender/30">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-noir">{testimonial.name}</p>
                    <p className="text-xs text-noir/50">{testimonial.course} — {testimonial.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== BENEFITS ==================== */}
      <section className="section-padding bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="inline-block text-sm font-accent font-semibold text-rose-gold uppercase tracking-wider mb-3">
                ¿Por qué Miradas VIP?
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-noir mb-6">
                Más que un curso, un <span className="text-gradient italic">camino profesional</span>
              </h2>
              <div className="space-y-4">
                {[
                  'Certificación digital verificable con código QR único',
                  'Perfil profesional público en nuestra plataforma',
                  'Sistema de citas integrado para recibir clientas',
                  'Kit de inicio profesional incluido en cada curso',
                  'Material de estudio digital permanente',
                  'Comunidad de profesionales certificadas',
                  'Clases 100% presenciales con práctica real',
                  'Instructora certificada con experiencia comprobada'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-noir/70 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual element */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-gradient-primary rounded-3xl p-1">
                <div className="w-full h-full bg-cream rounded-3xl flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mb-6 animate-pulse-glow">
                    <Award size={36} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-noir mb-2">Certificación</h3>
                  <h3 className="text-2xl font-heading font-bold text-gradient mb-4">Miradas VIP</h3>
                  <p className="text-noir/50 text-sm mb-6">
                    Certificación digital con código QR verificable que respalda tu formación profesional.
                  </p>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="bg-blush-light rounded-xl p-3">
                      <p className="text-2xl font-heading font-bold text-burgundy">4</p>
                      <p className="text-xs text-noir/50">Semanas</p>
                    </div>
                    <div className="bg-blush-light rounded-xl p-3">
                      <p className="text-2xl font-heading font-bold text-burgundy">100%</p>
                      <p className="text-xs text-noir/50">Presencial</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gold/10 rounded-2xl rotate-12 animate-float" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-rose-gold/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="section-padding bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="section-container relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            ¿Lista para comenzar
            <br />
            tu <span className="text-rose-gold italic">carrera profesional</span>?
          </h2>
          <p className="text-white/50 max-w-lg mx-auto mb-10 text-lg">
            Da el primer paso hacia tu independencia profesional. Inscríbete hoy y transforma tu futuro.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/cursos"
              className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-primary text-white font-accent font-bold text-lg rounded-2xl shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_rgba(183,110,121,0.5)]"
            >
              <BookOpen size={22} />
              Ver Cursos Disponibles
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/profesionales"
              className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-white/10 text-white font-accent font-bold text-lg rounded-2xl border-2 border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105"
            >
              <CalendarDays size={22} />
              Agendar una Cita
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
