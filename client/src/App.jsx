// import { useSelector } from 'react-redux';
// import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';

// // 1. Protected Route Wrapper
// // Checks Redux state for a user. If none, redirects to Login.
// const PrivateRoute = ({ children }) => {
//   const { user } = useSelector((state) => state.auth);
//   return user ? children : <Navigate to="/login" replace />;
// };

// function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           {/* Public Route: Login */}
//           <Route path="/login" element={<Login />} />

//           {/* Protected Route: Dashboard */}
//           <Route 
//             path="/dashboard" 
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             } 
//           />

//           {/* Default Route: Redirects to Dashboard (which checks auth) */}
//           <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
//           {/* Catch-all: Redirects any unknown URL to dashboard */}
//           <Route path="*" element={<Navigate to="/dashboard" replace />} />
//         </Routes>
//       </Router>

//       {/* Global Notification Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// }

// export default App;


import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import StudentProfile from './pages/student/StudentProfile';
import InquiryForm from './pages/public/InquiryForm';
import LandingPage from './pages/LandingPage';


const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
        <Route path="/inquiry/:consultancyId" element={<InquiryForm />} />

          <Route path="/login" element={<Login />} />

          {/* Main Dashboard */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />

          {/* NEW: Admin View of Specific Student Profile */}
          <Route 
            path="/dashboard/student/:studentId" 
            element={
              <PrivateRoute>
                <StudentProfile />
              </PrivateRoute>
            } 
          />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;