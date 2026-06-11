import { useState } from 'react';
import { mockEducationalContent, formatDateShort } from '../../data/mockData';
import { PlaySquare, Plus, Link as LinkIcon, FileText, CheckCircle, XCircle } from 'lucide-react';

export default function AdminEducationalContentPage() {
  const [content, setContent] = useState(mockEducationalContent || []);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleAddContent = () => {
    if (!videoUrl || !title) return;
    
    const newContent = {
      id: Date.now().toString(),
      title,
      description,
      url: videoUrl,
      uploadDate: new Date().toISOString(),
      category: 'General'
    };

    setContent([newContent, ...content]);
    setShowModal(false);
    setVideoUrl('');
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-noir">Contenido Educativo</h1>
          <p className="text-sm text-noir/50 font-accent">Sube videos y recursos para las alumnas en formación</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Cargar nuevo contenido
        </button>
      </div>

      {/* Content List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.length === 0 ? (
          <div className="col-span-full p-8 text-center text-noir/40 bg-cream rounded-2xl border-2 border-dashed border-lavender">
            <PlaySquare size={48} className="mx-auto mb-3 text-noir/20" />
            No hay contenido educativo cargado.
          </div>
        ) : (
          content.map(item => (
            <div key={item.id} className="card p-0 overflow-hidden hover:shadow-medium transition-shadow flex flex-col h-full animate-fade-in-up">
              <div className="h-40 bg-noir relative flex items-center justify-center group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-primary opacity-60 mix-blend-multiply"></div>
                <PlaySquare size={48} className="text-white relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="badge bg-white/20 text-white border-white/30 backdrop-blur-sm text-xs">
                    {item.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-heading font-bold text-noir mb-2 line-clamp-2">{item.title}</h3>
                <p className="text-sm text-noir/60 mb-4 line-clamp-3 flex-1">{item.description}</p>
                
                <div className="pt-4 border-t border-lavender/30 flex items-center justify-between text-xs font-accent text-noir/50 mt-auto">
                  <span className="flex items-center gap-1">
                    <LinkIcon size={12} /> URL Vinculada
                  </span>
                  <span>Subido el {formatDateShort(item.uploadDate)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-strong max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="p-6 border-b border-lavender/30 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-heading font-bold text-noir flex items-center gap-2">
                <PlaySquare size={20} className="text-rose-gold" />
                Cargar Contenido Educativo
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
                  <label className="block text-sm font-medium text-noir/70 mb-1">Título del Video</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none bg-white" 
                    placeholder="Ej. Clase 1: Materiales básicos" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-noir/70 mb-1">Enlace del Video (URL)</label>
                  <div className="relative">
                    <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-noir/40" />
                    <input 
                      type="url" 
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none bg-white" 
                      placeholder="https://youtube.com/..." 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-noir/70 mb-1 flex items-center gap-1">
                    <FileText size={16} /> Descripción o propósito
                  </label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-lavender rounded-xl focus:border-rose-gold focus:outline-none bg-white resize-none h-28" 
                    placeholder="Explica brevemente de qué trata el video y qué aprenderán las alumnas..."
                  ></textarea>
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
                  onClick={handleAddContent}
                  disabled={!videoUrl || !title}
                  className="flex-1 bg-gradient-primary text-white font-accent font-semibold rounded-xl py-3 hover:shadow-glow transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckCircle size={18} /> Guardar Video
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
