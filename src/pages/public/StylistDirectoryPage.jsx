import { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockStylistProfiles, formatCurrency } from '../../data/mockData';
import { 
  MapPin, Star, Award, ArrowRight, Search,
  Calendar, MessageCircle, Eye, Palette
} from 'lucide-react';

export default function StylistDirectoryPage() {
  const [cityFilter, setCityFilter] = useState('');
  const [search, setSearch] = useState('');

  const filteredStylists = mockStylistProfiles.filter(s => {
    if (cityFilter && s.city !== cityFilter) return false;
    if (search && !`${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase())) return false;
    return s.isActive;
  });

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="section-container">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-accent font-semibold text-rose-gold uppercase tracking-wider mb-3">
            Profesionales Certificadas
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-noir mb-4">
            Encuentra tu <span className="text-gradient italic">Estilista Ideal</span>
          </h1>
          <p className="text-noir/60 max-w-xl mx-auto">
            Profesionales certificadas por Miradas VIP listas para atenderte. Agenda tu cita directamente.
          </p>
        </div>

        {/* Filters */}
        <div className="card p-4 md:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
              <input type="text" placeholder="Buscar por nombre..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10" />
            </div>
            <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="input-field w-auto min-w-[180px]">
              <option value="">Todas las ciudades</option>
              <option value="Popayán">Popayán</option>
              <option value="Cali">Cali</option>
            </select>
          </div>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredStylists.map((stylist) => (
            <div key={stylist.id} className="card-hover overflow-hidden group">
              {/* Cover */}
              <div className="h-32 bg-gradient-primary relative">
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 rounded-2xl bg-white shadow-medium flex items-center justify-center text-2xl font-heading font-bold text-gradient border-4 border-white">
                    {stylist.firstName[0]}{stylist.lastName[0]}
                  </div>
                </div>
                {/* Certified badge */}
                <div className="absolute top-3 right-3">
                  <span className="badge bg-gradient-gold text-white shadow-sm">
                    <Award size={10} /> Certificada
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-14">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-noir group-hover:text-burgundy transition-colors">
                      {stylist.firstName} {stylist.lastName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-noir/50">
                      <MapPin size={12} className="text-rose-gold" />
                      {stylist.city}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-blush-light px-3 py-1.5 rounded-xl">
                    <Star size={14} className="text-gold fill-gold" />
                    <span className="text-sm font-bold text-noir">{stylist.averageRating}</span>
                    <span className="text-xs text-noir/40">({stylist.totalReviews})</span>
                  </div>
                </div>

                <p className="text-sm text-noir/60 mb-4 line-clamp-2">
                  {stylist.bio}
                </p>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {stylist.certifications.map((cert, i) => (
                    <span key={i} className="badge bg-blush text-burgundy">
                      {cert.includes('Cejas') || cert.includes('Labios') 
                        ? <Palette size={10} /> 
                        : <Eye size={10} />
                      }
                      {cert}
                    </span>
                  ))}
                </div>

                {/* Services preview */}
                <div className="space-y-2 mb-5">
                  {stylist.services.slice(0, 2).map(service => (
                    <div key={service.id} className="flex items-center justify-between text-sm py-1.5 px-3 bg-cream rounded-lg">
                      <span className="text-noir/70">{service.name}</span>
                      <span className="font-semibold text-burgundy">{formatCurrency(service.price)}</span>
                    </div>
                  ))}
                  {stylist.services.length > 2 && (
                    <p className="text-xs text-noir/40 text-center">
                      + {stylist.services.length - 2} servicios más
                    </p>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-noir/40 mb-5 pt-4 border-t border-lavender/30">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {stylist.totalAppointments} citas
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={12} /> {stylist.totalReviews} reseñas
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link
                    to={`/profesional/${stylist.slug}`}
                    className="btn-primary btn-sm flex-1 justify-center"
                  >
                    Ver Perfil <ArrowRight size={14} />
                  </Link>
                  <a
                    href={`https://wa.me/${stylist.whatsapp?.replace('+', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline btn-sm"
                  >
                    <MessageCircle size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStylists.length === 0 && (
          <div className="card p-12 text-center">
            <Search size={48} className="mx-auto text-noir/20 mb-4" />
            <h3 className="text-lg font-heading font-semibold text-noir mb-2">No se encontraron profesionales</h3>
            <p className="text-sm text-noir/50">Intenta cambiando los filtros de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
}
