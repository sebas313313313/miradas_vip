import { useState } from 'react';
import { mockEnrollmentRequests, formatCurrency, formatDate, statusLabels, statusColors } from '../../data/mockData';
import { 
  CheckCircle, XCircle, Eye, Clock, DollarSign, 
  User, Mail, Phone, MapPin, BookOpen, Search
} from 'lucide-react';

export default function EnrollmentRequestsPage() {
  const [requests, setRequests] = useState(mockEnrollmentRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(null); // 'approve' | 'reject'

  const handleApprove = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    setShowConfirmModal(null);
    setShowReceiptModal(false);
    setSelectedRequest(null);
  };

  const handleReject = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
    setShowConfirmModal(null);
    setShowReceiptModal(false);
    setSelectedRequest(null);
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const processedRequests = requests.filter(r => r.status !== 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-noir">Solicitudes de Inscripción</h1>
        <p className="text-sm text-noir/50 font-accent">Verifica los pagos y aprueba las inscripciones</p>
      </div>

      {/* Pending */}
      <div>
        <h2 className="text-sm font-accent font-semibold text-noir/70 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Clock size={14} className="text-amber-500" />
          Pendientes de Verificación ({pendingRequests.length})
        </h2>

        {pendingRequests.length === 0 ? (
          <div className="card p-8 text-center">
            <CheckCircle size={48} className="mx-auto text-emerald-300 mb-3" />
            <p className="text-noir/50 font-accent">No hay solicitudes pendientes 🎉</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map(request => (
              <div key={request.id} className="card p-5 hover:shadow-medium transition-shadow animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Student info */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {request.student.firstName[0]}{request.student.lastName[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-noir">
                        {request.student.firstName} {request.student.lastName}
                      </p>
                      <p className="text-xs text-noir/50 flex items-center gap-1 truncate">
                        <Mail size={10} /> {request.student.email}
                      </p>
                      <p className="text-xs text-noir/50 flex items-center gap-1">
                        <Phone size={10} /> {request.student.phone}
                      </p>
                    </div>
                  </div>

                  {/* Course info */}
                  <div className="flex-1">
                    <p className="text-xs text-noir/40 font-accent mb-1">Curso</p>
                    <p className="text-sm font-semibold text-noir flex items-center gap-1">
                      <BookOpen size={12} className="text-burgundy" />
                      {request.course.name}
                    </p>
                    <p className="text-xs text-noir/50 flex items-center gap-1">
                      <MapPin size={10} /> {request.course.city}
                    </p>
                  </div>

                  {/* Payment info */}
                  <div className="flex-shrink-0">
                    <p className="text-xs text-noir/40 font-accent mb-1">Pago Reportado</p>
                    <p className="text-lg font-heading font-bold text-emerald-600 flex items-center gap-1">
                      <DollarSign size={14} /> {formatCurrency(request.amountPaid)}
                    </p>
                    <p className="text-xs text-noir/50">vía {request.paymentMethod}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => { setSelectedRequest(request); setShowReceiptModal(true); }}
                      className="btn-sm bg-rose-gold/10 text-burgundy rounded-xl hover:bg-rose-gold/20 transition-colors font-accent font-semibold flex items-center gap-1 px-4 py-2 border border-rose-gold/20"
                    >
                      <Eye size={16} /> Ver Comprobante
                    </button>
                  </div>
                </div>

                {/* Date */}
                <div className="mt-3 pt-3 border-t border-lavender/20 flex items-center justify-between">
                  <p className="text-xs text-noir/40">
                    Inscripción: {formatDate(request.enrollmentDate)}
                  </p>
                  <span className="badge bg-amber-100 text-amber-800">
                    <Clock size={10} /> Pendiente
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Processed */}
      {processedRequests.length > 0 && (
        <div>
          <h2 className="text-sm font-accent font-semibold text-noir/70 uppercase tracking-wider mb-4">
            Procesadas
          </h2>
          <div className="space-y-3">
            {processedRequests.map(request => (
              <div key={request.id} className="card p-4 opacity-70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-lavender/30 flex items-center justify-center text-noir/40 font-bold text-xs">
                      {request.student.firstName[0]}{request.student.lastName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-noir/70">
                        {request.student.firstName} {request.student.lastName}
                      </p>
                      <p className="text-xs text-noir/40">{request.course.name}</p>
                    </div>
                  </div>
                  <span className={`badge ${request.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {request.status === 'approved' ? '✅ Aprobada' : '❌ Rechazada'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Receipt & Confirm Modal */}
      {showReceiptModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-strong max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            
            <div className="p-6 border-b border-lavender/30 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-heading font-bold text-noir flex items-center gap-2">
                <DollarSign size={20} className="text-emerald-600" />
                Verificación de Pago
              </h3>
              <button 
                onClick={() => { setShowReceiptModal(false); setSelectedRequest(null); }}
                className="w-8 h-8 rounded-full bg-cream flex items-center justify-center text-noir/50 hover:bg-lavender transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-noir/50 font-accent uppercase tracking-wider mb-1">Alumna</p>
                    <p className="font-semibold text-noir">{selectedRequest.student.firstName} {selectedRequest.student.lastName}</p>
                    <p className="text-sm text-noir/60">{selectedRequest.student.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-noir/50 font-accent uppercase tracking-wider mb-1">Curso Reservado</p>
                    <p className="font-semibold text-burgundy">{selectedRequest.course.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-noir/50 font-accent uppercase tracking-wider mb-1">Monto a Verificar</p>
                    <p className="text-2xl font-heading font-bold text-emerald-600">{formatCurrency(selectedRequest.amountPaid)}</p>
                    <p className="text-xs text-noir/50">Reportado vía {selectedRequest.paymentMethod}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-noir/50 font-accent uppercase tracking-wider mb-2">Comprobante Adjunto</p>
                  <div className="w-full h-64 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden flex items-center justify-center relative group">
                    {/* Fake receipt image for demo purposes */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
                    <div className="text-center relative z-10">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                        <CheckCircle size={24} className="text-emerald-600" />
                      </div>
                      <p className="font-bold text-slate-800 text-sm">Transferencia Exitosa</p>
                      <p className="text-xs text-slate-500 font-mono mt-1">Ref: {Math.floor(Math.random() * 100000000)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-amber-800">
                  <strong>Atención:</strong> Asegúrate de revisar tu cuenta de Nequi o banco para confirmar que el dinero ha ingresado correctamente antes de aprobar esta solicitud. Al aprobar, se creará la cuenta de la alumna automáticamente.
                </p>
              </div>

              <div className="flex gap-4 pt-4 border-t border-lavender/30">
                <button
                  onClick={() => handleReject(selectedRequest.id)}
                  className="flex-1 bg-white border-2 border-red-100 text-red-600 font-accent font-semibold rounded-xl py-3 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-2"
                >
                  <XCircle size={18} /> Rechazar Pago
                </button>
                <button
                  onClick={() => handleApprove(selectedRequest.id)}
                  className="flex-[2] bg-emerald-500 text-white font-accent font-semibold rounded-xl py-3 hover:bg-emerald-600 transition-all shadow-medium hover:shadow-strong flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Pago Confirmado — Aprobar Inscripción
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
