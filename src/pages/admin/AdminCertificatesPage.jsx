import { useState } from 'react';
import { mockStudents } from '../../data/mockData';
import { Award, Search, CheckCircle, XCircle, FileText, ChevronRight } from 'lucide-react';

export default function AdminCertificatesPage() {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filtrar alumnas que están en la fase final para poder certificarlas
  const eligibleStudents = mockStudents.filter(s => s.status === 'final_phase');
  const filteredEligible = eligibleStudents.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-noir">Gestión de Certificados</h1>
        <p className="text-sm text-noir/50 font-accent">Emite y administra los certificados de tus alumnas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Action - Generate Certificate */}
        <div className="lg:col-span-1">
          <button 
            onClick={() => setShowGenerateModal(true)}
            className="w-full card bg-gradient-primary hover:shadow-glow transition-all p-8 flex flex-col items-center justify-center text-center group min-h-[250px]"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">Generar Certificado</h3>
            <p className="text-sm text-white/80 font-accent">
              Emitir un nuevo certificado para una alumna en fase final
            </p>
          </button>
        </div>

        {/* Recent Certificates (Mock list) */}
        <div className="lg:col-span-2">
          <div className="card p-6 h-full">
            <h3 className="text-lg font-heading font-bold text-noir mb-4 flex items-center gap-2">
              <FileText size={20} className="text-rose-gold" /> Certificados Recientes
            </h3>
            
            <div className="space-y-3">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-cream rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Award size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-noir">Alumna Certificada #{i+1}</p>
                      <p className="text-xs text-noir/50">Curso de Extensiones Clásicas</p>
                    </div>
                  </div>
                  <span className="text-xs text-noir/40 font-mono">ID: CERT-2026-0{i+1}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-lavender/30 text-center">
              <button className="text-sm text-burgundy font-accent font-semibold hover:text-rose-gold transition-colors">
                Ver todos los certificados
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Certificate Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-strong max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up flex flex-col md:flex-row">
            
            {/* Left side: Selection */}
            <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-lavender/30 flex flex-col max-h-[50vh] md:max-h-[90vh]">
              <div className="p-4 border-b border-lavender/30 bg-cream sticky top-0 flex justify-between items-center z-10">
                <h3 className="font-heading font-bold text-noir">Seleccionar Alumna</h3>
                <button onClick={() => { setShowGenerateModal(false); setSelectedStudent(null); }} className="md:hidden text-noir/50">
                  <XCircle size={20} />
                </button>
              </div>
              <div className="p-4 border-b border-lavender/30 sticky top-[60px] bg-white z-10">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/40" />
                  <input 
                    type="text" 
                    placeholder="Buscar alumna..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-cream border border-lavender rounded-lg text-sm outline-none focus:border-rose-gold"
                  />
                </div>
              </div>
              
              <div className="p-2 overflow-y-auto flex-1">
                {filteredEligible.length === 0 ? (
                  <p className="text-sm text-noir/40 text-center p-4">No hay alumnas en fase final que coincidan con la búsqueda.</p>
                ) : (
                  filteredEligible.map(student => (
                    <button 
                      key={student.id}
                      onClick={() => setSelectedStudent(student)}
                      className={`w-full text-left p-3 rounded-xl mb-1 flex items-center justify-between transition-colors ${selectedStudent?.id === student.id ? 'bg-rose-gold/10 border border-rose-gold/30' : 'hover:bg-cream border border-transparent'}`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-noir">{student.firstName} {student.lastName}</p>
                        <p className="text-xs text-noir/50">{student.course}</p>
                      </div>
                      <ChevronRight size={16} className={selectedStudent?.id === student.id ? 'text-burgundy' : 'text-noir/30'} />
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Right side: Preview */}
            <div className="w-full md:w-2/3 flex flex-col relative">
              <div className="absolute top-4 right-4 hidden md:block">
                <button onClick={() => { setShowGenerateModal(false); setSelectedStudent(null); }} className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-noir/50 hover:bg-lavender transition-colors">
                  <XCircle size={20} />
                </button>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="text-lg font-heading font-bold text-noir mb-6">Vista Previa del Certificado</h3>
                
                {selectedStudent ? (
                  <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Certificate Mockup Canvas */}
                    <div className="w-full max-w-[600px] aspect-[1.414/1] bg-white border-[8px] border-double border-gold/30 p-8 shadow-medium relative flex flex-col items-center text-center justify-center scale-90 md:scale-100 origin-top">
                      {/* Decorative elements */}
                      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-gold/40"></div>
                      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-gold/40"></div>
                      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-gold/40"></div>
                      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-gold/40"></div>

                      <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-6 shadow-glow/30">
                        <span className="text-white font-heading font-bold text-2xl">M</span>
                      </div>
                      
                      <p className="text-xs uppercase tracking-widest text-noir/50 mb-2 font-accent">Miradas VIP certifica que</p>
                      
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-burgundy mb-4 border-b border-rose-gold/30 pb-2 px-8">
                        {selectedStudent.firstName} {selectedStudent.lastName}
                      </h2>
                      
                      <p className="text-sm text-noir/70 max-w-md mx-auto mb-8 leading-relaxed">
                        Ha completado satisfactoriamente el curso teórico-práctico de <br/>
                        <strong className="text-noir font-semibold text-base">{selectedStudent.course}</strong> <br/>
                        cumpliendo con todos los requisitos y horas de práctica estipulados.
                      </p>

                      <div className="flex justify-between w-full px-12 mt-auto pt-8">
                        <div className="text-center border-t border-noir/20 pt-2 w-32">
                          <p className="text-xs font-bold text-noir">Vanessa Fernández</p>
                          <p className="text-[10px] text-noir/50 uppercase tracking-wider">Directora</p>
                        </div>
                        <div className="text-center">
                          <Award size={32} className="text-gold opacity-80" />
                        </div>
                        <div className="text-center border-t border-noir/20 pt-2 w-32">
                          <p className="text-xs font-bold text-noir">{new Date().toLocaleDateString()}</p>
                          <p className="text-[10px] text-noir/50 uppercase tracking-wider">Fecha de Emisión</p>
                        </div>
                      </div>
                    </div>
                    
                    <button className="btn-primary mt-8 flex items-center gap-2">
                      <CheckCircle size={18} /> Aprobar y Generar Oficialmente
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-cream border-2 border-dashed border-lavender rounded-2xl">
                    <Award size={48} className="text-rose-gold/40 mb-4" />
                    <p className="font-heading font-bold text-noir">No hay alumna seleccionada</p>
                    <p className="text-sm text-noir/50 max-w-xs mt-2">Selecciona una alumna de la lista de la izquierda que esté en "Fase Final" para ver la vista previa de su certificado.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
