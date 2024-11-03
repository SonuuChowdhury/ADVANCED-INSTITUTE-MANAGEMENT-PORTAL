// Modules
import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Styles
import './styles/App.css';

// importing loaders 
import Loader from './components/loader/loader';


// Lazy load the HomePage component
const HomePage = lazy(() => import('./pages/Home Page/homePage'));
import LoginAndSignUP from './pages/LoginAndSignUP/LoginAndSignUP';
import StudentDashboardPage from './pages/StudentPages/Dashboard/dashboard.jsx'

import StudentChangePassword from './pages/StudentPages/Password Change/ChangePassword.jsx';
import StudentForgetPassword from './components/loginComponents/StudentLoginComponent/ForgetPassword/StudentForgetPasword.jsx';

// Super admin pages 
import SuperAdminDashboard from './pages/AdminPages/SuperAdmin/Dashboard/Dashboard.jsx';
import MasterSectionEditor from './pages/AdminPages/SuperAdmin/Home Editor/Master Section/MasterSectionEditor.jsx';

// Student Control 
import StudentViewOrEditEditor from './pages/AdminPages/SuperAdmin/Student Control/View or Edit Student/ViewOrEditStudent.jsx';
import AdminAddStudent from './pages/AdminPages/SuperAdmin/Student Control/Add Student/AdminAddStudent.jsx';

// Not Found Page 
import NotFound from './pages/404 Not Found/NotFound.jsx';

function App() {
  return (
    <Router>
        <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Login routes  */}
          <Route path="/login" element={<LoginAndSignUP />} />
          <Route path="/login/student/forget-password" element={<StudentForgetPassword />} />

          {/* Student dashboard routes  */}
          <Route path="/student-dashboard" element={<StudentDashboardPage />} />
          <Route path="/student-dashboard/change-password" element={<StudentChangePassword/>}/>

          {/* Super admin dashboard routes  */}
          <Route path="/super-admin/admin-dashboard" element={<SuperAdminDashboard/>}/>
          <Route path="/super-admin/admin-dashboard/mastersection" element={<MasterSectionEditor/>}/>
          <Route path="/super-admin/admin-dashboard/view-or-edit-student" element={<StudentViewOrEditEditor/>}/>
          <Route path="/super-admin/admin-dashboard/add-student" element={<AdminAddStudent/>}/>


          <Route path="*" element={<NotFound />} />
        </Routes>

        </Suspense>
    </Router>
  )
}

export default App;
