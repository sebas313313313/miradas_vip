import { useState } from 'react';
import { mockCourses, formatCurrency, formatDate } from '../../data/mockData';
import { 
  Plus, Search, Edit2, Trash2, MapPin, 
  Users, BookOpen, Clock, CalendarDays, CheckCircle
} from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-noir">Gestión de Cursos</h1>
          <p className="text-sm text-noir/50 font-accent">Administra los cursos presenciales y cupos</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Nuevo Curso
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/40" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o ciudad..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-lavender rounded-xl font-body text-sm focus:outline-none focus:border-rose-gold transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-3 bg-white border border-lavender rounded-xl font-body text-sm text-noir/70 focus:outline-none focus:border-rose-gold">
            <option value="">Todas las ciudades</option>
            <option value="popayan">Popayán</option>
            <option value="cali">Cali</option>
          </select>
          <select className="px-4 py-3 bg-white border border-lavender rounded-xl font-body text-sm text-noir/70 focus:outline-none focus:border-rose-gold">
            <option value="">Estado</option>
            <option value="active">Activos</option>
            <option value="draft">Borradores</option>
          </select>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="card overflow-hidden group animate-fade-in-up">
            {/* Status Badge */}
            <div className="bg-gradient-primary h-2 w-full" />
            <div className="p-5 relative">
              <div className="absolute top-5 right-5">
                <span className="badge bg-emerald-100 text-emerald-700 border border-emerald-200">
                  Activo
                </span>
              </div>

              <div className="mb-4 pr-16">
                <div className="flex items-center gap-2 text-xs text-noir/50 mb-2 font-accent">
                  <MapPin size={12} className="text-rose-gold" />
                  {course.city}
                </div>
                <h3 className="font-heading font-bold text-noir text-lg line-clamp-2">
                  {course.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-cream rounded-lg p-3">
                  <p className="text-xs text-noir/50 flex items-center gap-1 mb-1"><CalendarDays size={12} /> Fechas</p>
                  <p className="text-sm font-semibold text-noir truncate">{formatDate(course.startDate)}</p>
                </div>
                <div className="bg-cream rounded-lg p-3">
                  <p className="text-xs text-noir/50 flex items-center gap-1 mb-1"><Users size={12} /> Cupos</p>
                  <p className="text-sm font-semibold text-noir">
                    <span className={course.availableSlots <= 3 ? 'text-red-500' : 'text-emerald-600'}>
                      {course.availableSlots}
                    </span> / {course.totalSlots}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-lavender/30">
                <div>
                  <p className="text-xs text-noir/50">Precio</p>
                  <p className="font-bold text-burgundy">{formatCurrency(course.totalPrice)}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-noir/40 hover:bg-cream hover:text-rose-gold transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-noir/40 hover:bg-red-50 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Card (Empty State style) */}
        <button 
          onClick={() => setShowModal(true)}
          className="card border-2 border-dashed border-lavender bg-transparent hover:border-rose-gold hover:bg-rose-gold/5 flex flex-col items-center justify-center p-8 min-h-[250px] transition-all group"
        >
          <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-rose-gold group-hover:scale-110 group-hover:bg-rose-gold group-hover:text-white transition-all mb-4">
            <Plus size={24} />
          </div>
          <p className="font-heading font-bold text-noir">Crear Nuevo Curso</p>
          <p className="text-sm text-noir/50 mt-1">Abre una nueva fecha o sede</p>
        </button>
      </div>

      {/* Create Course Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="p-6 border-b border-lavender/30 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-heading font-bold text-noir flex items-center gap-2">
                <BookOpen size={20} className="text-rose-gold" />
                Crear Nuevo Curso
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-noir/50 hover:bg-lavender transition-colors"
              >
                <Plus size={20} className="rotate-45" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-noir/70 mb-1">Nombre del Curso</label>
                    <input type="text" className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none" placeholder="Ej. Master en Extensiones de Pestañas" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-noir/70 mb-1">Categoría</label>
                    <select className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none bg-white">
                      <option>Pestañas</option>
                      <option>Cejas</option>
                      <option>Labios</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-noir/70 mb-1">Ciudad</label>
                    <select className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none bg-white">
                      <option>Popayán</option>
                      <option>Cali</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-noir/70 mb-1">Fecha de Inicio</label>
                    <input type="date" className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-noir/70 mb-1">Fecha de Fin</label>
                    <input type="date" className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-noir/70 mb-1">Cupos Totales</label>
                    <input type="number" className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none" placeholder="10" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-noir/70 mb-1">Precio Total (COP)</label>
                    <input type="number" className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none" placeholder="800000" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-noir/70 mb-1">Descripción Breve</label>
                    <textarea className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none" rows="3" placeholder="Descripción del curso..."></textarea>
                  </div>
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
                  <CheckCircle size={18} /> Guardar Curso
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
