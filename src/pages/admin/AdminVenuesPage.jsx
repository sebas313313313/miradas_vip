import { useState } from 'react';
import { mockVenues, mockCourses } from '../../data/mockData';
import { MapPin, Plus, Store, Calendar, Phone, CheckCircle, XCircle } from 'lucide-react';

export default function AdminVenuesPage() {
  const [venues, setVenues] = useState(mockVenues.map(v => ({
    ...v,
    openingDate: '2023-01-15', // mock opening date
    phone: '+57 300 000 0000'
  })));
  
  const [showModal, setShowModal] = useState(false);

  // Calculate assigned courses for each venue
  const getCoursesCount = (venueName) => {
    return mockCourses.filter(c => c.venue === venueName).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-noir">Gestión de Sedes</h1>
          <p className="text-sm text-noir/50 font-accent">Administra las ubicaciones físicas de la academia</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Agregar una nueva sede
        </button>
      </div>

      {/* Venues Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map(venue => (
          <div key={venue.id} className="card p-0 overflow-hidden hover:shadow-medium transition-shadow flex flex-col h-full animate-fade-in-up">
            <div className="h-32 bg-gradient-primary relative flex items-center justify-center overflow-hidden">
              <Store size={48} className="text-white/20 absolute -right-4 -bottom-4" />
              <div className="text-center">
                <span className="badge bg-white/20 text-white border-white/30 backdrop-blur-sm mb-2">{venue.city}</span>
                <h3 className="text-xl font-heading font-bold text-white">{venue.name}</h3>
              </div>
            </div>
            
            <div className="p-5 flex-1 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-rose-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-noir/50 uppercase tracking-wider font-accent mb-0.5">Ubicación</p>
                    <p className="text-sm font-semibold text-noir">{venue.address}</p>
                    <p className="text-xs text-noir/60">{venue.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-rose-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-noir/50 uppercase tracking-wider font-accent mb-0.5">Contacto</p>
                    <p className="text-sm font-semibold text-noir">{venue.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Store size={16} className="text-rose-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-noir/50 uppercase tracking-wider font-accent mb-0.5">Cursos Asignados</p>
                    <p className="text-sm font-semibold text-noir">{getCoursesCount(venue.name)} cursos programados</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-lavender/30 bg-cream">
               <button className="w-full btn-ghost text-burgundy hover:bg-rose-gold/10 font-semibold text-sm">
                 Editar Detalles
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Venue Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-strong max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="p-6 border-b border-lavender/30 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-heading font-bold text-noir flex items-center gap-2">
                <Store size={20} className="text-rose-gold" />
                Agregar Nueva Sede
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-noir/50 hover:bg-lavender transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-noir/70 mb-1">Nombre de la sede</label>
                  <input type="text" className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none bg-white" placeholder="Ej. Sede Sur" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-noir/70 mb-1">Ubicación / Ciudad</label>
                  <select className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none bg-white appearance-none cursor-pointer">
                    <option>Popayán</option>
                    <option>Cali</option>
                    <option>Bogotá</option>
                    <option>Medellín</option>
                    <option>Pasto</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-noir/70 mb-1">Dirección completa</label>
                  <input type="text" className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none bg-white" placeholder="Ej. Calle 123 #45-67" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-noir/70 mb-1">Teléfono de contacto</label>
                  <input type="tel" className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none bg-white" placeholder="Ej. +57 300 000 0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-noir/70 mb-1">Fecha de apertura (Estimada)</label>
                  <input type="date" className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none bg-white text-noir/70" />
                </div>
              </div>

              <div className="flex gap-4 pt-6 mt-6 border-t border-lavender/30">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-cream text-noir font-accent font-semibold rounded-xl py-3 hover:bg-lavender transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gradient-primary text-white font-accent font-semibold rounded-xl py-3 hover:shadow-glow transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Guardar Sede
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
