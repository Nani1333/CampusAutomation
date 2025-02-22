import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./modules/Login/Login";
import Admin from "./modules/Admin/Admin";

import Student from "./modules/Student/StudentLayout";
import Dashboard from "./modules/Student/Dashboard";
import Appointments from "./modules/Student/Appointments";
import ProjectResources from "./modules/Student/ProjectResources";
import Profile from "./modules/Student/Profile";
import DiscussionForum from './modules/Student/DiscussionForum';
import Notifications from './modules/Student/Notifications';
import Settings from "./modules/Student/Settings";

import Faculty from "./modules/Faculty/FacultyLayout";
import FacultyDashboard from "./modules/Faculty/FacultyDashboard";
import FacultyAppointments from "./modules/Faculty/FacultyAppointments";
import FacultyProjectResources from "./modules/Faculty/FacultyProjectResources";
import FacultyUserProfile from "./modules/Faculty/FacultyUserProfile";
import FacultyForum from './modules/Faculty/FacultyForum';
import FacultyNotifications from './modules/Faculty/FacultyNotifications';
import FacultySettings from "./modules/Faculty/FacultySettings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />}>
          <Route path="dashboard" element={<Admin />} />
        </Route>

        {/* Faculty Routes */}
        <Route path="/faculty" element={<Faculty />}>
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="facultyappointments" element={<FacultyAppointments />} />
          <Route path="facultyprojectresources" element={<FacultyProjectResources />} />
          <Route path="facultyuserprofile" element={<FacultyUserProfile />} />
          <Route path="facultyforum" element={<FacultyForum />} />
          <Route path="facultynotifications" element={<FacultyNotifications />} />
          <Route path="facultysettings" element={<FacultySettings />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<Student />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="ProjectResources" element={<ProjectResources />} />
          <Route path="profile" element={<Profile />} />
          <Route path="discussionforum" element={<DiscussionForum />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;