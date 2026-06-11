import { useState } from 'react';
import { mockAppointments, formatDate } from '../../data/mockData';
import { CalendarDays, Search, Clock, User, Phone, AlignLeft, CheckCircle2, ChevronDown } from 'lucide-react';

const appointmentStatusLabels = {
  'scheduled': 'Agendada',
  'in_progress': 'En curso',
  'completed': 'Finalizada'
};

const appointmentStatusColors = {
  'scheduled': 'bg-amber-100 text-amber-800 border-amber-200',
  'in_progress': 'bg-blue-100 text-blue-800 border-blue-200',
  'completed': 'bg-emerald-100 text-emerald-800 border-emerald-200'
};

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const handleStatusChange = (id, newStatus) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const filteredAppointments = appointments.filter(a => {
    if (filter && a.status !== filter) return false;
    if (search && !`${a.clientName} ${a.identification}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-noir">Gestión de Citas</h1>
        <p className="text-sm text-noir/50 font-accent">Administra las citas de procedimientos y servicios</p>
      </div>

      {/* Toolbar */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
          <input 
            type="text" 
            placeholder="Buscar por cliente o identificación..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className="input-field pl-10 text-sm w-full" 
          />
        </div>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)} 
          className="input-field w-full sm:w-auto min-w-[200px] text-sm"
        >
          <option value="">Todos los estados</option>
          <option value="scheduled">Agendada</option>
          <option value="in_progress">En curso</option>
          <option value="completed">Finalizada</option>
        </select>
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAppointments.length === 0 ? (
          <div className="col-span-full p-8 text-center text-noir/40 bg-cream rounded-2xl border-2 border-dashed border-lavender">
            <CalendarDays size={48} className="mx-auto mb-3 text-noir/20" />
            No se encontraron citas con los filtros actuales.
          </div>
        ) : (
          filteredAppointments.map(appointment => (
            <div key={appointment.id} className="card p-0 overflow-hidden hover:shadow-medium transition-shadow flex flex-col h-full animate-fade-in-up">
              {/* Header: Date & Time */}
              <div className="bg-cream border-b border-lavender/30 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-burgundy">
                  <CalendarDays size={16} />
                  {formatDate(appointment.date)}
                </div>
                <div className="flex items-center gap-1 text-sm text-noir/60 font-accent bg-white px-2 py-1 rounded-md shadow-sm border border-lavender">
                  <Clock size={14} className="text-rose-gold" />
                  {appointment.time}
                </div>
              </div>

              {/* Body: Client & Procedure */}
              <div className="p-5 flex-1 space-y-4">
                {/* Client Info */}
                <div>
                  <h3 className="font-heading font-bold text-noir text-lg flex items-center gap-2">
                    <User size={18} className="text-rose-gold" />
                    {appointment.clientName}
                  </h3>
                  <div className="mt-2 space-y-1 pl-6 border-l-2 border-lavender/40 ml-2">
                    <p className="text-xs text-noir/60 flex items-center gap-2">
                      <span className="font-semibold text-noir/80 w-6">ID:</span> {appointment.identification}
                    </p>
                    <p className="text-xs text-noir/60 flex items-center gap-2">
                      <Phone size={12} className="text-noir/40" /> {appointment.phone}
                    </p>
                  </div>
                </div>

                {/* Procedure Info */}
                <div className="bg-blush-light rounded-xl p-3 border border-rose-gold/20">
                  <p className="text-xs text-noir/50 uppercase tracking-wider font-accent mb-1 flex items-center gap-1">
                    <AlignLeft size={12} /> Procedimiento
                  </p>
                  <p className="text-sm font-semibold text-noir">
                    {appointment.procedureType}
                  </p>
                </div>
              </div>

              {/* Footer: Actions */}
              <div className="p-4 pt-0">
                <div className="relative">
                  <select
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                    className={`w-full appearance-none rounded-xl py-3 pl-4 pr-10 text-sm font-accent font-semibold border focus:outline-none focus:ring-2 focus:ring-rose-gold/30 cursor-pointer transition-colors ${appointmentStatusColors[appointment.status]}`}
                  >
                    <option value="scheduled">Agendada</option>
                    <option value="in_progress">En curso</option>
                    <option value="completed">Finalizada</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
