import { mockStudents, statusLabels, statusColors, formatDate } from '../../data/mockData';
import { Search, Filter, Users, Eye, XCircle, Mail, Phone, MapPin, BookOpen, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function StudentsManagementPage() {
  const [students, setStudents] = useState(mockStudents);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleStatusChange = (studentId, newStatus) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status: newStatus } : s));
    setSelectedStudent(prev => ({ ...prev, status: newStatus }));
  };

  const filteredStudents = students.filter(s => {
    if (filter && s.status !== filter) return false;
    if (search && !`${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-noir">Gestión de Alumnas</h1>
        <p className="text-sm text-noir/50 font-accent">Administra el estado y progreso de tus alumnas</p>
      </div>

      {/* Filters */}
      <div className="card p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/30" />
          <input type="text" placeholder="Buscar alumna..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-10 text-sm" />
        </div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field w-auto min-w-[200px] text-sm">
          <option value="">Todos los estados</option>
          <option value="pending">Pendiente</option>
          <option value="approved">Aprobada</option>
          <option value="in_training">En Formación</option>
          <option value="final_phase">Fase Final</option>
          <option value="certified">Certificada</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-cream">
                <th className="text-left px-5 py-3 text-xs font-accent font-semibold text-noir/50 uppercase tracking-wider">Alumna</th>
                <th className="text-left px-5 py-3 text-xs font-accent font-semibold text-noir/50 uppercase tracking-wider">Curso</th>
                <th className="text-left px-5 py-3 text-xs font-accent font-semibold text-noir/50 uppercase tracking-wider">Ciudad</th>
                <th className="text-left px-5 py-3 text-xs font-accent font-semibold text-noir/50 uppercase tracking-wider">Estado</th>
                <th className="text-left px-5 py-3 text-xs font-accent font-semibold text-noir/50 uppercase tracking-wider">Inscripción</th>
                <th className="text-left px-5 py-3 text-xs font-accent font-semibold text-noir/50 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-lavender/20">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-cream/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-noir">{student.firstName} {student.lastName}</p>
                        <p className="text-xs text-noir/40">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-noir/70">{student.course}</td>
                  <td className="px-5 py-4 text-sm text-noir/70">{student.city}</td>
                  <td className="px-5 py-4">
                    <span className={`badge ${statusColors[student.status]}`}>
                      {statusLabels[student.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-noir/50">{formatDate(student.enrollmentDate)}</td>
                  <td className="px-5 py-4">
                    <button 
                      onClick={() => { setSelectedStudent(student); setShowModal(true); }}
                      className="btn-ghost btn-sm text-xs flex items-center gap-1 hover:text-burgundy hover:bg-rose-gold/10"
                    >
                      <Eye size={12} /> Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
          <div className="p-8 text-center text-noir/40 text-sm">
            No se encontraron alumnas con esos filtros.
          </div>
        )}
      </div>

      {/* Student Details Modal */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-strong max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            
            <div className="p-6 border-b border-lavender/30 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-heading font-bold text-noir flex items-center gap-2">
                <User size={20} className="text-rose-gold" />
                Perfil de Alumna
              </h3>
              <button 
                onClick={() => { setShowModal(false); setSelectedStudent(null); }}
                className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-noir/50 hover:bg-lavender transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6">
              {/* Header Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-white font-bold text-xl shadow-glow/30">
                  {selectedStudent.firstName[0]}{selectedStudent.lastName[0]}
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-noir">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </h2>
                  <span className={`badge mt-1 ${statusColors[selectedStudent.status]}`}>
                    {statusLabels[selectedStudent.status]}
                  </span>
                </div>
              </div>

              {/* Contact Data */}
              <div className="bg-cream rounded-xl p-4 mb-6 space-y-3">
                <h4 className="text-xs font-accent font-semibold text-noir/50 uppercase tracking-wider mb-2">Datos de Contacto</h4>
                <div className="flex items-center gap-3 text-sm text-noir/70">
                  <Mail size={16} className="text-rose-gold" />
                  {selectedStudent.email}
                </div>
                <div className="flex items-center gap-3 text-sm text-noir/70">
                  <Phone size={16} className="text-rose-gold" />
                  {selectedStudent.phone || 'No registrado'}
                </div>
              </div>

              {/* Course Data */}
              <div className="bg-cream rounded-xl p-4 mb-6 space-y-3">
                <h4 className="text-xs font-accent font-semibold text-noir/50 uppercase tracking-wider mb-2">Información del Curso</h4>
                <div className="flex items-center gap-3 text-sm text-noir/70">
                  <BookOpen size={16} className="text-burgundy" />
                  <span className="font-semibold text-noir">{selectedStudent.course}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-noir/70">
                  <MapPin size={16} className="text-burgundy" />
                  {selectedStudent.city}
                </div>
                <div className="flex items-center gap-3 text-sm text-noir/70 pt-2 border-t border-lavender/30">
                  <span className="text-noir/50">Fecha de Inscripción:</span>
                  {formatDate(selectedStudent.enrollmentDate)}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button className="flex-1 bg-white border border-lavender text-noir font-accent font-semibold rounded-xl py-3 hover:bg-cream transition-colors text-sm">
                  Editar Datos
                </button>
                <div className="flex-1 relative">
                  <select 
                    value={selectedStudent.status}
                    onChange={(e) => handleStatusChange(selectedStudent.id, e.target.value)}
                    className="w-full appearance-none bg-gradient-primary text-white font-accent font-semibold rounded-xl py-3 pl-4 pr-10 outline-none hover:shadow-glow transition-all text-sm cursor-pointer"
                  >
                    <option value="pending" className="text-noir bg-white">Pendiente</option>
                    <option value="approved" className="text-noir bg-white">Aprobada</option>
                    <option value="in_training" className="text-noir bg-white">En Formación</option>
                    <option value="final_phase" className="text-noir bg-white">Fase Final</option>
                    <option value="certified" className="text-noir bg-white">Certificada</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
