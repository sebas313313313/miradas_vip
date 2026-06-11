import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockStylistProfiles } from '../../data/mockData';
import { MapPin, Star, Award, Link as LinkIcon, Globe, Calendar, Clock, CheckCircle, ChevronLeft } from 'lucide-react';

export default function StylistPublicProfilePage() {
  const { slug } = useParams();
  const [stylist, setStylist] = useState(null);
  
  // Booking State
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientData, setClientData] = useState({ name: '', phone: '', notes: '' });
  const [bookingStep, setBookingStep] = useState(1); // 1: service, 2: datetime, 3: details, 4: success

  useEffect(() => {
    // In a real app, this would be an API fetch
    const found = mockStylistProfiles.find(s => s.slug === slug);
    setStylist(found);
  }, [slug]);

  if (!stylist) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-rose-gold border-t-transparent animate-spin mb-4"></div>
        <p className="text-noir/50 font-accent">Buscando perfil profesional...</p>
      </div>
    );
  }

  // Helper to generate some dummy time slots
  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'];

  const handleBook = (e) => {
    e.preventDefault();
    // Simulate booking API call
    setTimeout(() => {
      setBookingStep(4);
    }, 1000);
  };

  return (
    <div className="bg-cream min-h-screen pb-20">
      {/* Cover & Header */}
      <div className="h-64 md:h-80 bg-noir relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-noir to-transparent"></div>
        
        <div className="section-container h-full relative z-10 flex items-end pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full text-center md:text-left">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-lavender flex items-center justify-center text-4xl font-bold text-noir/30 shadow-strong overflow-hidden shrink-0">
               {stylist.avatar ? <img src={stylist.avatar} alt={stylist.firstName} className="w-full h-full object-cover" /> : stylist.firstName[0]}
            </div>
            
            <div className="flex-1 text-white mb-2 md:mb-4">
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{stylist.firstName} {stylist.lastName}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-accent text-white/80">
                <span className="flex items-center gap-1"><MapPin size={16} className="text-rose-gold" /> {stylist.city}</span>
                <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400 fill-yellow-400" /> {stylist.averageRating} ({stylist.totalReviews} reseñas)</span>
                <span className="badge bg-emerald-500/20 text-emerald-300 border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle size={12} /> Miradas VIP Certificada
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-container mt-8">
        <Link to="/profesionales" className="inline-flex items-center gap-2 text-noir/50 hover:text-noir text-sm font-accent mb-6 transition-colors">
          <ChevronLeft size={16} /> Volver al directorio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="card p-8">
              <h3 className="text-xl font-heading font-bold text-noir mb-4">Sobre Mí</h3>
              <p className="text-noir/70 leading-relaxed">{stylist.bio}</p>
              
              <div className="mt-6 flex items-center gap-4 border-t border-lavender/30 pt-6">
                {stylist.instagram && (
                  <a href={`https://instagram.com/${stylist.instagram.replace('@','')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-noir/60 hover:text-pink-600 transition-colors">
                    <LinkIcon size={20} /> <span className="text-sm">{stylist.instagram}</span>
                  </a>
                )}
                {stylist.facebook && (
                  <a href="#" className="flex items-center gap-2 text-noir/60 hover:text-blue-600 transition-colors">
                    <Globe size={20} /> <span className="text-sm">Facebook</span>
                  </a>
                )}
              </div>
            </div>

            {/* Certifications */}
            <div className="card p-8 bg-gradient-to-br from-white to-cream">
              <h3 className="text-xl font-heading font-bold text-noir mb-6 flex items-center gap-2">
                <Award size={24} className="text-gold" /> Certificaciones Oficiales
              </h3>
              <div className="flex flex-wrap gap-3">
                {stylist.certifications.map((cert, idx) => (
                  <div key={idx} className="bg-white border border-gold/30 px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center">
                      <Award size={12} className="text-gold" />
                    </div>
                    <span className="text-sm font-bold text-noir">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services List (Visible on mobile instead of widget) */}
            <div className="lg:hidden card p-6">
               <h3 className="text-xl font-heading font-bold text-noir mb-4">Servicios</h3>
               <div className="space-y-3">
                 {stylist.services.map(service => (
                   <div key={service.id} className="flex justify-between items-center p-3 border border-lavender/30 rounded-xl">
                     <div>
                       <h4 className="font-bold text-noir">{service.name}</h4>
                       <p className="text-xs text-noir/50">{service.duration} min</p>
                     </div>
                     <span className="font-heading font-bold text-burgundy">${service.price.toLocaleString('es-CO')}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Booking Widget (Sticky) */}
          <div className="lg:col-span-1">
            <div className="card p-0 sticky top-24 overflow-hidden border-2 border-rose-gold/20 shadow-medium">
              <div className="p-6 bg-gradient-primary text-white text-center">
                <h3 className="text-xl font-heading font-bold mb-1">Agenda tu cita</h3>
                <p className="text-sm text-white/80 font-accent">Reserva directa con {stylist.firstName}</p>
              </div>
              
              <div className="p-6">
                {bookingStep === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <p className="text-sm font-bold text-noir/70 mb-2">1. Selecciona el servicio</p>
                    <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                      {stylist.services.map(service => (
                        <button
                          key={service.id}
                          onClick={() => setSelectedService(service)}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${selectedService?.id === service.id ? 'border-rose-gold bg-rose-gold/5 shadow-sm' : 'border-lavender hover:border-rose-gold/50 hover:bg-cream'}`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-bold text-noir text-sm">{service.name}</h4>
                            <span className="font-heading font-bold text-burgundy">${service.price.toLocaleString('es-CO')}</span>
                          </div>
                          <p className="text-xs text-noir/50 mb-2 line-clamp-2">{service.description}</p>
                          <div className="flex items-center gap-1 text-xs text-noir/40 font-accent">
                            <Clock size={12} /> {service.duration} min
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => setBookingStep(2)}
                      disabled={!selectedService}
                      className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continuar
                    </button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setBookingStep(1)} className="text-noir/40 hover:text-noir"><ChevronLeft size={20}/></button>
                      <p className="text-sm font-bold text-noir/70">2. Fecha y Hora</p>
                    </div>

                    {/* Selected Service Snippet */}
                    <div className="bg-lavender/30 p-3 rounded-lg text-sm mb-4">
                      <span className="text-noir/60">Servicio:</span> <strong className="text-noir">{selectedService.name}</strong>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-noir/70 mb-2 flex items-center gap-1"><Calendar size={16}/> Fecha</label>
                      <input 
                        type="date" 
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none bg-white text-sm" 
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    {selectedDate && (
                      <div className="animate-fade-in pt-2">
                        <label className="block text-sm font-medium text-noir/70 mb-2 flex items-center gap-1"><Clock size={16}/> Horarios Disponibles</label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map(time => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 text-sm rounded-lg border text-center transition-all ${selectedTime === time ? 'border-rose-gold bg-rose-gold text-white font-bold' : 'border-lavender text-noir/70 hover:border-rose-gold/50'}`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <button 
                      onClick={() => setBookingStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continuar
                    </button>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-4 animate-fade-in">
                    <div className="flex items-center gap-2 mb-4">
                      <button onClick={() => setBookingStep(2)} className="text-noir/40 hover:text-noir"><ChevronLeft size={20}/></button>
                      <p className="text-sm font-bold text-noir/70">3. Tus Datos</p>
                    </div>

                    <form id="bookingForm" onSubmit={handleBook} className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-noir/70 mb-1">Nombre Completo</label>
                        <input required type="text" className="w-full px-3 py-2 border border-lavender rounded-lg focus:border-rose-gold focus:outline-none text-sm" 
                               value={clientData.name} onChange={e => setClientData({...clientData, name: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-noir/70 mb-1">WhatsApp</label>
                        <input required type="tel" className="w-full px-3 py-2 border border-lavender rounded-lg focus:border-rose-gold focus:outline-none text-sm" 
                               value={clientData.phone} onChange={e => setClientData({...clientData, phone: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-noir/70 mb-1">Notas (Opcional)</label>
                        <textarea className="w-full px-3 py-2 border border-lavender rounded-lg focus:border-rose-gold focus:outline-none text-sm resize-none h-16" 
                                  value={clientData.notes} onChange={e => setClientData({...clientData, notes: e.target.value})}></textarea>
                      </div>
                    </form>

                    <button 
                      type="submit" form="bookingForm"
                      className="btn-primary w-full mt-2 flex justify-center items-center gap-2"
                    >
                      <CheckCircle size={16} /> Confirmar Solicitud
                    </button>
                  </div>
                )}

                {bookingStep === 4 && (
                  <div className="text-center py-6 animate-fade-in-up">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-noir mb-2">¡Solicitud Enviada!</h3>
                    <p className="text-sm text-noir/60 mb-6">
                      {stylist.firstName} revisará tu solicitud para el {selectedDate} a las {selectedTime} y te confirmará por WhatsApp muy pronto.
                    </p>
                    <button onClick={() => setBookingStep(1)} className="btn-outline w-full text-sm py-2">
                      Volver
                    </button>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
