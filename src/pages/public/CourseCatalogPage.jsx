import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockCourses, formatCurrency } from '../../data/mockData';
import { 
  MapPin, Clock, Users, ArrowRight, Eye, Palette, Heart,
  Search, Filter, Sparkles
} from 'lucide-react';

export default function CourseCatalogPage() {
  const [searchParams] = useSearchParams();
  const [cityFilter, setCityFilter] = useState(searchParams.get('city') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');
  const [search, setSearch] = useState('');

  const filteredCourses = useMemo(() => {
    return mockCourses.filter(course => {
      if (cityFilter && course.city !== cityFilter) return false;
      if (categoryFilter && course.category !== categoryFilter) return false;
      if (search && !course.name.toLowerCase().includes(search.toLowerCase())) return false;
      return course.isPublished;
    });
  }, [cityFilter, categoryFilter, search]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'pestanas': return <Eye size={36} className="text-white/30" />;
      case 'micropigmentacion': return <Palette size={36} className="text-white/30" />;
      default: return <Heart size={36} className="text-white/30" />;
    }
  };

  const getCategoryGradient = (category) => {
    switch (category) {
      case 'pestanas': return 'from-burgundy to-rose-gold';
      case 'micropigmentacion': return 'from-midnight to-burgundy';
      default: return 'from-rose-gold to-gold';
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-accent font-semibold text-rose-gold uppercase tracking-wider mb-3">
            Catálogo de Cursos
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-noir mb-4">
            Encuentra tu <span className="text-gradient italic">Curso Ideal</span>
          </h1>
          <p className="text-noir/60 max-w-xl mx-auto">
            Explora nuestros cursos de extensiones de pestañas y micropigmentación en Popayán y Cali.
          </p>
        </div>

        {/* Filters */}
        <div className="card p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
              <input
                type="text"
                placeholder="Buscar curso..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="input-field w-auto min-w-[150px]"
              >
                <option value="">Todas las ciudades</option>
                <option value="Popayán">Popayán</option>
                <option value="Cali">Cali</option>
              </select>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="input-field w-auto min-w-[180px]"
              >
                <option value="">Todas las categorías</option>
                <option value="pestanas">Extensiones de Pestañas</option>
                <option value="micropigmentacion">Micropigmentación</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-noir/50 mb-6 font-accent">
          {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} encontrado{filteredCourses.length !== 1 ? 's' : ''}
        </p>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredCourses.map((course, index) => (
              <div key={course.id} className={`card-hover overflow-hidden group animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`relative h-52 bg-gradient-to-br ${getCategoryGradient(course.category)} overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {getCategoryIcon(course.category)}
                  </div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="badge bg-white/90 text-burgundy shadow-sm">
                      <Sparkles size={10} /> Próximo
                    </span>
                    <span className="badge bg-white/90 text-noir/60">
                      {course.level === 'beginner' ? 'Principiante' : 'Intermedio'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`badge ${course.availableSlots <= 3 ? 'bg-red-500 text-white' : 'bg-white/90 text-noir/70'}`}>
                      <Users size={10} /> {course.availableSlots} cupos
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-noir/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link to={`/cursos/${course.slug}`} className="btn-primary btn-sm">
                      Ver Detalles
                    </Link>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 text-xs text-noir/50 mb-2 font-accent">
                    <MapPin size={12} className="text-rose-gold" />
                    {course.city} — {course.venue}
                  </div>

                  <h3 className="text-lg font-heading font-semibold text-noir mb-2 group-hover:text-burgundy transition-colors line-clamp-1">
                    {course.name}
                  </h3>

                  <p className="text-sm text-noir/60 mb-4 line-clamp-2">
                    {course.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-noir/50 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {course.schedule}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-lavender/30">
                    <div>
                      <p className="text-xs text-noir/50">Inversión</p>
                      <p className="text-lg font-heading font-bold text-burgundy">
                        {formatCurrency(course.totalPrice)}
                      </p>
                      <p className="text-xs text-noir/40">
                        Reserva: {formatCurrency(course.reservationPrice)}
                      </p>
                    </div>
                    <Link
                      to={`/cursos/${course.slug}`}
                      className="flex items-center gap-1 text-sm font-accent font-semibold text-rose-gold hover:text-burgundy transition-colors"
                    >
                      Ver más <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <Filter size={48} className="mx-auto text-noir/20 mb-4" />
            <h3 className="text-lg font-heading font-semibold text-noir mb-2">No se encontraron cursos</h3>
            <p className="text-sm text-noir/50 mb-4">Intenta cambiando los filtros de búsqueda.</p>
            <button onClick={() => { setCityFilter(''); setCategoryFilter(''); setSearch(''); }} className="btn-outline btn-sm">
              Limpiar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
