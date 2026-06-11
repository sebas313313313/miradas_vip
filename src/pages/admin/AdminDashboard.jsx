import { mockDashboardStats } from '../../data/mockData';
import { 
  Users, UserCheck, GraduationCap, BookOpen, CalendarDays, 
  Award, TrendingUp, ArrowUpRight, ArrowDownRight, Eye, Palette
} from 'lucide-react';
import { Link } from 'react-router-dom';

const statCards = [
  { label: 'Alumnas Registradas', value: mockDashboardStats.totalStudents, icon: Users, color: 'bg-blue-50 text-blue-600', trend: '+12%' },
  { label: 'Inscritas', value: mockDashboardStats.totalEnrolled, icon: UserCheck, color: 'bg-purple-50 text-purple-600', trend: '+8%' },
  { label: 'En Formación', value: mockDashboardStats.totalInTraining, icon: GraduationCap, color: 'bg-amber-50 text-amber-600', trend: '+5%' },
  { label: 'Fase Final', value: mockDashboardStats.totalFinalPhase, icon: Eye, color: 'bg-indigo-50 text-indigo-600', trend: '+2%' },
  { label: 'Certificadas', value: mockDashboardStats.totalCertified, icon: Award, color: 'bg-emerald-50 text-emerald-600', trend: '+15%' },
  { label: 'Cursos Activos', value: mockDashboardStats.totalActiveCourses, icon: BookOpen, color: 'bg-rose-50 text-rose-600', trend: '' },
  { label: 'Cursos Finalizados', value: mockDashboardStats.totalCompletedCourses, icon: BookOpen, color: 'bg-gray-50 text-gray-600', trend: '' },
  { label: 'Citas Generadas', value: mockDashboardStats.totalAppointments, icon: CalendarDays, color: 'bg-cyan-50 text-cyan-600', trend: '+18%' },
  { label: 'Estilistas Activas', value: mockDashboardStats.totalActiveStylist, icon: Palette, color: 'bg-pink-50 text-pink-600', trend: '+10%' },
];

const enrollmentsByMonth = [
  { month: 'Ene', value: 8 },
  { month: 'Feb', value: 12 },
  { month: 'Mar', value: 15 },
  { month: 'Abr', value: 10 },
  { month: 'May', value: 18 },
  { month: 'Jun', value: 22 },
  { month: 'Jul', value: 25 },
];

const cityDistribution = [
  { city: 'Popayán', value: 98, color: 'bg-burgundy', percentage: 63 },
  { city: 'Cali', value: 58, color: 'bg-rose-gold', percentage: 37 },
];

const recentActivity = [
  { type: 'enrollment', name: 'María López', action: 'se inscribió a', target: 'Extensiones Clásicas', time: 'Hace 2 horas', status: 'pending' },
  { type: 'certification', name: 'Isabella Torres', action: 'fue certificada en', target: 'Volumen Ruso', time: 'Hace 5 horas', status: 'certified' },
  { type: 'appointment', name: 'Lucía Fernández', action: 'agendó cita con', target: 'Valentina Muñoz', time: 'Hace 8 horas', status: 'confirmed' },
  { type: 'enrollment', name: 'Laura García', action: 'se inscribió a', target: 'Micropigmentación Cejas', time: 'Ayer', status: 'pending' },
  { type: 'status', name: 'Sofía Herrera', action: 'pasó a', target: 'Fase Final', time: 'Ayer', status: 'final_phase' },
];

export default function AdminDashboard() {
  const maxBarValue = Math.max(...enrollmentsByMonth.map(e => e.value));

  return (
    <div className="space-y-6">
      {/* Pending enrollments alert */}
      {mockDashboardStats.pendingEnrollments > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <TrendingUp size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-800">
                {mockDashboardStats.pendingEnrollments} solicitudes de inscripción pendientes
              </p>
              <p className="text-xs text-amber-600">
                Requieren verificación de pago
              </p>
            </div>
          </div>
          <Link to="/admin/solicitudes" className="btn-sm bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors text-xs font-accent font-semibold px-4 py-2">
            Revisar
          </Link>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.slice(0, 5).map((stat, index) => (
          <div key={index} className="card p-4 hover:shadow-medium transition-shadow animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon size={16} />
              </div>
              {stat.trend && (
                <span className="flex items-center gap-0.5 text-xs font-accent font-semibold text-emerald-600">
                  <ArrowUpRight size={12} /> {stat.trend}
                </span>
              )}
            </div>
            <p className="text-2xl font-heading font-bold text-noir">{stat.value}</p>
            <p className="text-xs text-noir/50 font-accent mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Secondary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {statCards.slice(5).map((stat, index) => (
          <div key={index} className="card p-4 hover:shadow-medium transition-shadow">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon size={14} />
              </div>
              <div>
                <p className="text-lg font-heading font-bold text-noir">{stat.value}</p>
                <p className="text-xs text-noir/50 font-accent">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollments Chart */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-heading font-semibold text-noir">Inscripciones por Mes</h3>
              <p className="text-xs text-noir/40 font-accent">Últimos 7 meses</p>
            </div>
            <span className="badge bg-emerald-50 text-emerald-700">
              <ArrowUpRight size={10} /> +18% vs mes anterior
            </span>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end justify-between gap-2 h-40">
            {enrollmentsByMonth.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs font-accent font-semibold text-noir/70">{item.value}</span>
                <div
                  className="w-full bg-gradient-primary rounded-t-lg transition-all duration-500 hover:opacity-80"
                  style={{ height: `${(item.value / maxBarValue) * 100}%`, minHeight: '8px' }}
                />
                <span className="text-xs text-noir/40 font-accent">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* City Distribution */}
        <div className="card p-6">
          <h3 className="text-lg font-heading font-semibold text-noir mb-1">Distribución por Ciudad</h3>
          <p className="text-xs text-noir/40 font-accent mb-6">Total de alumnas</p>

          <div className="space-y-4">
            {cityDistribution.map((city, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-accent font-medium text-noir">{city.city}</span>
                  <span className="text-sm font-accent font-bold text-noir">{city.value} ({city.percentage}%)</span>
                </div>
                <div className="w-full h-3 bg-lavender/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${city.color} rounded-full transition-all duration-700`}
                    style={{ width: `${city.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-lavender/30">
            <div className="flex items-center justify-between text-sm">
              <span className="text-noir/50 font-accent">Total</span>
              <span className="font-heading font-bold text-noir">{cityDistribution.reduce((a, c) => a + c.value, 0)} alumnas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-heading font-semibold text-noir">Actividad Reciente</h3>
            <p className="text-xs text-noir/40 font-accent">Últimos movimientos en la plataforma</p>
          </div>
        </div>

        <div className="space-y-3">
          {recentActivity.map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream transition-colors">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activity.type === 'enrollment' ? 'bg-blue-50 text-blue-600' :
                activity.type === 'certification' ? 'bg-emerald-50 text-emerald-600' :
                activity.type === 'appointment' ? 'bg-purple-50 text-purple-600' :
                'bg-amber-50 text-amber-600'
              }`}>
                {activity.type === 'enrollment' ? <UserCheck size={16} /> :
                 activity.type === 'certification' ? <Award size={16} /> :
                 activity.type === 'appointment' ? <CalendarDays size={16} /> :
                 <TrendingUp size={16} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-noir">
                  <strong>{activity.name}</strong>{' '}
                  <span className="text-noir/60">{activity.action}</span>{' '}
                  <strong className="text-burgundy">{activity.target}</strong>
                </p>
                <p className="text-xs text-noir/40">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
