import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';
import StudentLayout from './components/layout/StudentLayout';
import StylistLayout from './components/layout/StylistLayout';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import CourseCatalogPage from './pages/public/CourseCatalogPage';
import CourseDetailPage from './pages/public/CourseDetailPage';
import EnrollmentPage from './pages/public/EnrollmentPage';
import StylistDirectoryPage from './pages/public/StylistDirectoryPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import EnrollmentRequestsPage from './pages/admin/EnrollmentRequestsPage';
import StudentsManagementPage from './pages/admin/StudentsManagementPage';
import AdminCoursesPage from './pages/admin/AdminCoursesPage';
import AdminCertificatesPage from './pages/admin/AdminCertificatesPage';
import AdminAppointmentsPage from './pages/admin/AdminAppointmentsPage';
import AdminVenuesPage from './pages/admin/AdminVenuesPage';
import AdminEducationalContentPage from './pages/admin/AdminEducationalContentPage';

// Student Pages
import StudentProgressPage from './pages/student/StudentProgressPage';
import StudentCoursesPage from './pages/student/StudentCoursesPage';
import StudentCertificatesPage from './pages/student/StudentCertificatesPage';

// Stylist Pages
import StylistDashboardPage from './pages/stylist/StylistDashboardPage';
import StylistAgendaPage from './pages/stylist/StylistAgendaPage';
import StylistProfileConfigPage from './pages/stylist/StylistProfileConfigPage';
import StylistPublicProfilePage from './pages/public/StylistPublicProfilePage';

// Route protection components
function ProtectedRoute({ children, requiredRole }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

// Placeholder pages for sections not yet built
function PlaceholderPage({ title, description }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-heading font-bold text-noir">{title}</h1>
      <p className="text-sm text-noir/50 font-accent">{description}</p>
      <div className="card p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-blush flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🚧</span>
        </div>
        <h3 className="text-lg font-heading font-semibold text-noir mb-2">En Construcción</h3>
        <p className="text-sm text-noir/50">Esta sección estará disponible próximamente.</p>
      </div>
    </div>
  );
}

function StudentPlaceholder({ title }) {
  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="section-container">
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-blush flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚧</span>
          </div>
          <h2 className="text-xl font-heading font-semibold text-noir mb-2">{title}</h2>
          <p className="text-sm text-noir/50">Esta sección estará disponible próximamente.</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
          <Route path="/cursos" element={<PublicLayout><CourseCatalogPage /></PublicLayout>} />
          <Route path="/cursos/:slug" element={<PublicLayout><CourseDetailPage /></PublicLayout>} />
          <Route path="/cursos/:slug/inscripcion" element={<PublicLayout><EnrollmentPage /></PublicLayout>} />
          <Route path="/profesionales" element={<PublicLayout><StylistDirectoryPage /></PublicLayout>} />
          <Route path="/verificar-certificado" element={<PublicLayout><StudentPlaceholder title="Verificar Certificado" /></PublicLayout>} />

          {/* Auth routes (no navbar/footer) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/recuperar-contrasena" element={<PublicLayout><StudentPlaceholder title="Recuperar Contraseña" /></PublicLayout>} />

          {/* Student routes */}
          <Route
            path="/alumna"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="progreso" replace />} />
            <Route path="progreso" element={<StudentProgressPage />} />
            <Route path="cursos" element={<StudentCoursesPage />} />
            <Route path="certificados" element={<StudentCertificatesPage />} />
            <Route path="perfil" element={<StudentPlaceholder title="Mi Perfil" />} />
          </Route>

          {/* Stylist public profile */}
          <Route path="/profesional/:slug" element={<PublicLayout><StylistPublicProfilePage /></PublicLayout>} />

          {/* Stylist routes */}
          <Route
            path="/estilista"
            element={
              <ProtectedRoute requiredRole="student">
                {/* Real check would ensure isCertified is true, here we let student role in for testing */}
                <StylistLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StylistDashboardPage />} />
            <Route path="agenda" element={<StylistAgendaPage />} />
            <Route path="perfil" element={<StylistProfileConfigPage />} />
          </Route>

          {/* Admin routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="solicitudes" element={<EnrollmentRequestsPage />} />
            <Route path="cursos" element={<AdminCoursesPage />} />
            <Route path="alumnas" element={<StudentsManagementPage />} />
            <Route path="certificados" element={<AdminCertificatesPage />} />
            <Route path="citas" element={<AdminAppointmentsPage />} />
            <Route path="sedes" element={<AdminVenuesPage />} />
            <Route path="contenido" element={<AdminEducationalContentPage />} />
            <Route path="configuracion" element={<PlaceholderPage title="Configuración" description="Ajustes generales de la plataforma" />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
