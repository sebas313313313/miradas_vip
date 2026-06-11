import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, MapPin, Link as LinkIcon, Globe, Info, Clock, Plus, Trash2, CheckCircle } from 'lucide-react';

export default function StylistProfileConfigPage() {
  const { user } = useAuth();
  
  const [schedule, setSchedule] = useState([
    { day: 'Lunes', isOpen: true, start: '09:00', end: '18:00' },
    { day: 'Martes', isOpen: true, start: '09:00', end: '18:00' },
    { day: 'Miércoles', isOpen: true, start: '09:00', end: '18:00' },
    { day: 'Jueves', isOpen: true, start: '09:00', end: '18:00' },
    { day: 'Viernes', isOpen: true, start: '09:00', end: '18:00' },
    { day: 'Sábado', isOpen: true, start: '09:00', end: '14:00' },
    { day: 'Domingo', isOpen: false, start: '', end: '' },
  ]);

  const toggleDay = (index) => {
    const newSchedule = [...schedule];
    newSchedule[index].isOpen = !newSchedule[index].isOpen;
    setSchedule(newSchedule);
  };

  const handleTimeChange = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-noir">Configurar Perfil</h1>
        <p className="text-sm text-noir/50 font-accent">Personaliza tu información pública y horarios de atención</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - General Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-heading font-bold text-noir mb-6 flex items-center gap-2">
              <User size={20} className="text-rose-gold" /> Información Básica
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-24 h-24 rounded-full bg-lavender flex items-center justify-center text-3xl font-bold text-noir/30 border-4 border-white shadow-sm overflow-hidden">
                  {user?.avatar ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" /> : user?.firstName?.[0]}
                </div>
                <div>
                  <button className="btn-outline btn-sm mb-2">Cambiar Foto</button>
                  <p className="text-xs text-noir/40">Sube una foto profesional para transmitir confianza a tus clientas.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-noir/70 mb-1">Nombre</label>
                  <input type="text" className="input-field" defaultValue={user?.firstName} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-noir/70 mb-1">Apellido</label>
                  <input type="text" className="input-field" defaultValue={user?.lastName} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-noir/70 mb-1 flex items-center gap-1">
                  <MapPin size={16} /> Ubicación o Dirección de Trabajo
                </label>
                <input type="text" className="input-field" placeholder="Ej. Calle 5 #4-23, Popayán" />
              </div>

              <div>
                <label className="block text-sm font-medium text-noir/70 mb-1 flex items-center gap-1">
                  <Info size={16} /> Sobre mí (Biografía)
                </label>
                <textarea 
                  className="input-field h-32 resize-none" 
                  placeholder="Cuéntale a tus futuras clientas sobre tu experiencia, tu pasión por la belleza y tu formación en Miradas VIP..."
                ></textarea>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-lg font-heading font-bold text-noir mb-6 flex items-center gap-2">
              <Clock size={20} className="text-rose-gold" /> Horarios de Atención
            </h2>
            <p className="text-sm text-noir/50 mb-6">Define los días y horas en los que estás disponible. El sistema bloqueará las horas fuera de este rango para que no recibas citas.</p>
            
            <div className="space-y-3">
              {schedule.map((day, idx) => (
                <div key={day.day} className="flex items-center gap-4 p-3 bg-cream rounded-xl border border-lavender/30">
                  <label className="flex items-center gap-3 w-32 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={day.isOpen} 
                      onChange={() => toggleDay(idx)}
                      className="w-4 h-4 rounded text-rose-gold focus:ring-rose-gold/20" 
                    />
                    <span className={`text-sm font-medium ${day.isOpen ? 'text-noir' : 'text-noir/40'}`}>{day.day}</span>
                  </label>
                  
                  {day.isOpen ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input 
                        type="time" 
                        value={day.start}
                        onChange={(e) => handleTimeChange(idx, 'start', e.target.value)}
                        className="input-field py-1.5 px-3 text-sm w-32" 
                      />
                      <span className="text-noir/40 text-sm">hasta</span>
                      <input 
                        type="time" 
                        value={day.end}
                        onChange={(e) => handleTimeChange(idx, 'end', e.target.value)}
                        className="input-field py-1.5 px-3 text-sm w-32" 
                      />
                    </div>
                  ) : (
                    <div className="flex-1 text-sm text-noir/40 italic">Cerrado</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Services & Social */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-heading font-bold text-noir mb-4">Redes Sociales</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-noir/70 mb-1 flex items-center gap-1">
                  <LinkIcon size={16} className="text-pink-600" /> Instagram
                </label>
                <input type="text" className="input-field text-sm" placeholder="@tu_usuario" />
              </div>
              <div>
                <label className="block text-sm font-medium text-noir/70 mb-1 flex items-center gap-1">
                  <Globe size={16} className="text-blue-600" /> Facebook
                </label>
                <input type="text" className="input-field text-sm" placeholder="Enlace a tu página" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-heading font-bold text-noir">Mis Servicios</h2>
              <button className="text-rose-gold hover:text-burgundy bg-rose-gold/10 p-1.5 rounded-lg transition-colors">
                <Plus size={16} />
              </button>
            </div>
            
            <p className="text-xs text-noir/50 mb-4 leading-relaxed">Agrega los servicios que ofreces. Recuerda que solo deberías ofrecer servicios en los que estés certificada.</p>

            <div className="space-y-3">
              {/* Mock Service 1 */}
              <div className="p-3 border border-lavender rounded-xl bg-white relative group">
                <button className="absolute top-2 right-2 text-noir/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={14} />
                </button>
                <h4 className="text-sm font-bold text-noir pr-6">Extensiones Clásicas</h4>
                <div className="flex items-center justify-between mt-2 text-xs text-noir/60">
                  <span>120 min</span>
                  <span className="font-semibold text-burgundy">$80.000</span>
                </div>
              </div>

              {/* Mock Service 2 */}
              <div className="p-3 border border-lavender rounded-xl bg-white relative group">
                <button className="absolute top-2 right-2 text-noir/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={14} />
                </button>
                <h4 className="text-sm font-bold text-noir pr-6">Retoque (2-3 sem)</h4>
                <div className="flex items-center justify-between mt-2 text-xs text-noir/60">
                  <span>60 min</span>
                  <span className="font-semibold text-burgundy">$45.000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-lavender/30">
        <button className="btn-primary flex items-center gap-2">
          <CheckCircle size={18} /> Guardar Cambios
        </button>
      </div>
    </div>
  );
}
