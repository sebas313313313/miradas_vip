import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-noir text-white/70">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">M</span>
              </div>
              <div>
                <span className="text-white font-heading font-bold text-xl">Miradas</span>
                <span className="text-rose-gold font-heading font-bold text-xl ml-1">VIP</span>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed mb-4">
              Academia líder en extensiones de pestañas y micropigmentación de cejas y labios. 
              Certifícate y transforma tu pasión en una profesión.
            </p>
            <div className="flex gap-3">
              <a href="https://www.instagram.com/miradasvip_oficial/" target="_blank" rel="noreferrer" title="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-gold/30 transition-colors">
                <Globe size={16} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61550919825948" target="_blank" rel="noreferrer" title="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-gold/30 transition-colors">
                <MessageCircle size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-gold/30 transition-colors">
                <Phone size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-accent font-semibold mb-4 text-sm uppercase tracking-wider">
              Academia
            </h4>
            <ul className="space-y-2.5">
              <li><Link to="/cursos" className="text-sm hover:text-rose-gold transition-colors">Cursos Disponibles</Link></li>
              <li><Link to="/profesionales" className="text-sm hover:text-rose-gold transition-colors">Profesionales Certificadas</Link></li>
              <li><Link to="/verificar-certificado" className="text-sm hover:text-rose-gold transition-colors">Verificar Certificado</Link></li>
              <li><Link to="/registro" className="text-sm hover:text-rose-gold transition-colors">Inscribirme</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-accent font-semibold mb-4 text-sm uppercase tracking-wider">
              Nuestros Cursos
            </h4>
            <ul className="space-y-2.5">
              <li><span className="text-sm">Extensiones Clásicas</span></li>
              <li><span className="text-sm">Volumen Ruso</span></li>
              <li><span className="text-sm">Efecto Híbrido</span></li>
              <li><span className="text-sm">Micropigmentación de Cejas</span></li>
              <li><span className="text-sm">Micropigmentación de Labios</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-accent font-semibold mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="text-rose-gold mt-0.5 shrink-0" />
                <span>Popayán & Cali, Colombia</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-rose-gold shrink-0" />
                <span>+57 300 123 4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-rose-gold shrink-0" />
                <span>info@miradasvip.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Miradas VIP. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/40 flex items-center gap-1">
            Hecho con <Heart size={12} className="text-rose-gold" /> en Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
