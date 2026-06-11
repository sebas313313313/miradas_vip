import { useState } from 'react';
import { mockAppointments, appointmentStatusColors, appointmentStatusLabels } from '../../data/mockData';
import { ChevronLeft, ChevronRight, Clock, User, BookOpen } from 'lucide-react';

export default function StylistAgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date('2026-06-15')); // Mock date for demo

  // Get days of the week for the calendar view
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const dates = Array.from({length: 7}, (_, i) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - d.getDay() + i);
    return d;
  });

  // Filter appointments for the selected date
  const todaysAppointments = mockAppointments.filter(app => {
    const appDate = new Date(app.date);
    return appDate.getDate() === currentDate.getDate() && appDate.getMonth() === currentDate.getMonth();
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-noir">Mi Agenda</h1>
          <p className="text-sm text-noir/50 font-accent">Visualiza tus citas programadas por día</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-lavender/30">
          <button className="p-1 hover:bg-lavender/50 rounded transition-colors"><ChevronLeft size={20}/></button>
          <span className="font-heading font-bold text-noir min-w-24 text-center">
            {currentDate.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}
          </span>
          <button className="p-1 hover:bg-lavender/50 rounded transition-colors"><ChevronRight size={20}/></button>
        </div>
      </div>

      {/* Weekly Calendar Strip */}
      <div className="card p-4 flex justify-between gap-2 overflow-x-auto">
        {dates.map((date, i) => {
          const isSelected = date.getDate() === currentDate.getDate();
          return (
            <button
              key={i}
              onClick={() => setCurrentDate(date)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl min-w-16 transition-all ${
                isSelected 
                  ? 'bg-gradient-primary text-white shadow-md transform scale-105' 
                  : 'hover:bg-lavender/30 text-noir/60'
              }`}
            >
              <span className="text-xs font-accent mb-1">{weekDays[i]}</span>
              <span className={`text-xl font-heading font-bold ${isSelected ? 'text-white' : 'text-noir'}`}>
                {date.getDate()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Day's Appointments */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-lg text-noir border-b border-lavender/50 pb-2">
          Citas para el {currentDate.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
        </h3>

        {todaysAppointments.length === 0 ? (
          <div className="card p-12 text-center text-noir/50 border-dashed border-2 border-lavender/50">
            <p>No tienes citas programadas para este día.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {todaysAppointments.map(app => (
              <div key={app.id} className="card p-4 border-l-4 border-l-rose-gold flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-24 text-center font-bold text-burgundy bg-rose-gold/10 p-2 rounded-lg">
                    {app.time}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-noir text-lg">{app.clientName}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-noir/60 mt-1">
                      <span className="flex items-center gap-1"><BookOpen size={14} className="text-rose-gold"/> {app.procedureType}</span>
                      <span className="flex items-center gap-1"><User size={14} className="text-rose-gold"/> {app.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <span className={`badge text-[10px] ${appointmentStatusColors[app.status]}`}>
                    {appointmentStatusLabels[app.status]}
                  </span>
                  {app.duration && <span className="text-xs text-noir/40 font-accent">{app.duration} min</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
