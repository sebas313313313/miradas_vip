import { useState } from 'react';
import { mockAppointments, appointmentStatusColors, appointmentStatusLabels } from '../../data/mockData';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, XCircle, RefreshCw, BookOpen, DollarSign, CalendarCheck } from 'lucide-react';

export default function StylistDashboardPage() {
  const [appointments, setAppointments] = useState(mockAppointments);

  const handleStatusChange = (id, newStatus) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-heading font-bold text-noir">Panel de Citas</h1>
        <p className="text-sm text-noir/50 font-accent">Gestiona tus próximas citas y horarios solicitados</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-gradient-primary text-white p-6 relative overflow-hidden shadow-glow">
           <div className="absolute right-0 top-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3"></div>
           <div className="flex justify-between items-start mb-4 relative z-10">
             <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm border border-white/30">
               <Clock size={20} className="text-white" />
             </div>
           </div>
           <p className="text-white/80 text-sm font-accent mb-1 relative z-10 font-medium">Citas Pendientes</p>
           <p className="text-4xl font-heading font-bold relative z-10">
             {appointments.filter(a => a.status === 'pending').length}
           </p>
        </div>
        
        <div className="card p-6 border border-lavender/50 hover:shadow-medium transition-shadow bg-white">
           <div className="flex justify-between items-start mb-4">
             <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center border border-emerald-200">
               <CalendarCheck size={20} className="text-emerald-600" />
             </div>
           </div>
           <p className="text-noir/50 text-sm font-accent mb-1 font-medium">Confirmadas (Hoy)</p>
           <p className="text-4xl font-heading font-bold text-noir">
             {appointments.filter(a => a.status === 'confirmed').length}
           </p>
        </div>
        
        <div className="card p-6 border border-lavender/50 hover:shadow-medium transition-shadow bg-white">
           <div className="flex justify-between items-start mb-4">
             <div className="w-10 h-10 rounded-xl bg-rose-gold/20 flex items-center justify-center border border-rose-gold/30">
               <DollarSign size={20} className="text-burgundy" />
             </div>
           </div>
           <p className="text-noir/50 text-sm font-accent mb-1 font-medium">Ingresos Estimados (Mes)</p>
           <p className="text-4xl font-heading font-bold text-burgundy">
             $450.000
           </p>
        </div>
      </div>

      {/* Appointments List */}
      <div className="card p-0 overflow-hidden">
        <div className="p-6 border-b border-lavender/30">
          <h2 className="text-lg font-heading font-bold text-noir">Solicitudes de Citas</h2>
        </div>
        
        <div className="divide-y divide-lavender/30">
          {appointments.map(appointment => (
            <div key={appointment.id} className="p-6 hover:bg-cream/50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lavender/50 flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs text-noir/50 font-bold uppercase">{new Date(appointment.date).toLocaleDateString('es-CO', { month: 'short' })}</span>
                    <span className="text-lg font-heading font-bold text-noir leading-none">{new Date(appointment.date).getDate()}</span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-heading font-bold text-noir">{appointment.clientName}</h3>
                      <span className={`badge text-[10px] ${appointmentStatusColors[appointment.status]}`}>
                        {appointmentStatusLabels[appointment.status]}
                      </span>
                    </div>
                    <div className="text-sm text-noir/60 space-y-1">
                      <p className="flex items-center gap-1"><BookOpen size={14} className="text-rose-gold" /> {appointment.procedureType}</p>
                      <p className="flex items-center gap-1"><Clock size={14} className="text-rose-gold" /> {appointment.time}</p>
                      <p className="flex items-center gap-1"><User size={14} className="text-rose-gold" /> {appointment.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:justify-end">
                  {appointment.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                        className="btn-primary text-xs py-2 px-3 flex items-center gap-1"
                      >
                        <CheckCircle size={14} /> Aprobar
                      </button>
                      <button 
                        onClick={() => handleStatusChange(appointment.id, 'rescheduled')}
                        className="btn-outline text-xs py-2 px-3 flex items-center gap-1 border-lavender text-noir/70"
                      >
                        <RefreshCw size={14} /> Proponer otro horario
                      </button>
                    </>
                  )}
                  {appointment.status === 'confirmed' && (
                    <button 
                      onClick={() => handleStatusChange(appointment.id, 'completed')}
                      className="btn-ghost text-xs py-2 px-3 flex items-center gap-1 text-emerald-600 hover:bg-emerald-50"
                    >
                      <CheckCircle size={14} /> Marcar Completada
                    </button>
                  )}
                  {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                     <button 
                       onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                       className="btn-ghost text-xs py-2 px-3 flex items-center gap-1 text-red-500 hover:bg-red-50"
                     >
                       <XCircle size={14} /> Cancelar
                     </button>
                  )}
                </div>
              </div>
              
              {appointment.notes && (
                <div className="mt-4 p-3 bg-cream rounded-lg text-sm text-noir/60 italic border-l-2 border-rose-gold">
                  "{appointment.notes}"
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
