 

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, reset } from '../features/auth/authSlice';
import StudentProfile from './student/StudentProfile'; // Import this

// Import Sub-Dashboards
import ConsultancyDashboard from './dashboard/ConsultancyDashboard';
import SuperAdminDashboard from './dashboard/SuperAdminDashboard';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get current user from Redux state
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  // Role-based Content Renderer
  const renderDashboardContent = () => {
    if (!user) return null;

    switch (user.role) {
      case 'super_admin':
        return <SuperAdminDashboard />;
        
      case 'consultancy_admin':
        return <ConsultancyDashboard />;

      // NEW: Handle Staff Roles (Receptionist / Document Officer)
      // They share the same dashboard UI but with restricted permissions inside
      case 'consultancy_staff':
        return <ConsultancyDashboard />;
        
      case 'student':
        return <StudentProfile />;
        
      default:
        return <div className="text-red-500">Error: Role not recognized ({user.role})</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-2">
               <div className="bg-green-600 p-1.5 rounded-md shadow-sm">
                 <span className="text-white font-bold text-lg tracking-wider">JP</span>
               </div>
               <h1 className="text-xl font-bold text-gray-900 hidden sm:block">Visa SaaS</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-0.5 rounded-full inline-block">
                    {/* Display subRole if it exists (e.g. "Receptionist"), otherwise main role */}
                    {(user?.subRole || user?.role)?.replace('_', ' ')}
                  </div>
              </div>
              <button
                onClick={onLogout}
                className="bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {renderDashboardContent()}
      </div>
    </div>
  );
}

export default Dashboard;