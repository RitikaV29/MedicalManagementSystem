import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import StaffLogin from "./Components/StaffLogin";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/StaffLogin";
import UserRegister from "./Components/UserRegister";
import Navbar from "./Components/Navbar";
import AppointScheduleUser from "./Components/AppointScheduleUser"
import History from "./Components/HistoryUser"
import Home from "./Components/Home";
import UserRegistration from "./pages/users/UserRegistration";
import UserLogin from './pages/users/UserLogin'
import UserDashboard from './pages/users/UserDashboard'
import UserProfile from './pages/users/UserProfile'
import LabsRegister from './pages/labs/LabsRegister'
import LabsLogin from './pages/labs/LabsLogin'
import AllLabs from './pages/labs/AllLabs'
import LabsDashboard from './pages/labs/LabsDashboard'
import AllPatients from './pages/labs/AllPatients'
import ProtectedRoute from './Components/ProtectedRoute'
import LabProfile from './pages/labs/LabProfile'
import LabHome from "./pages/LabHome";
import Alldoctor from "./pages/Doctor/Alldoctor"; 
import DoctorCard from "./pages/Doctor/DoctorCard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import PatientBooked from "./pages/Patient/PatientBooked";
import AppointmentForm from "./pages/users/AppointmentForm";
import PatientProfile from "./pages/users/PatientProfile";


// import AppointScheduling from './Components/AppointScheduling';



// navbar ko conditionally rendering Karenge --
function AppWrapper() {
  const location = useLocation();
  // jaha navbar hide karna hai un routes ka list
  const hideNavbarRoutes = ["/", "/staff", "/dashboard", "/login"];
  // agar current path inme se hai to navbar hide hoga
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}

      <div className="pt-16">
        <Routes>
          {/* User Register (Homepage) */}
          <Route path="/" element={<UserRegister />} />
          <Route path="/home" element={<Home/>}/>

          <Route path="/appointment" element={<AppointScheduleUser/>}/>
          <Route path="/history" element={<History/>}/>


          {/* Staff Login */}
          <Route path="/staff" element={<StaffLogin />} />

          {/* Staff Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Duplicate login route */}
          <Route path="/login" element={<Login />} />



{/* Lab Section */}
            <Route path="/labHome" element={<LabHome/>} />
            <Route path="/userRegister" element={<UserRegistration/>} />

              <Route path="/userLogin" element={<UserLogin/>} />
      <Route path="/userDashboard" element={
        <ProtectedRoute>
           <UserDashboard/>
        </ProtectedRoute>
       
        } >
      <Route path="profile" element={<UserProfile/>}/>
       <Route path="labs" element={<AllLabs/>}/>
     
      </Route>
      <Route path="/labsRegister" element={<LabsRegister/>} />
      <Route path="/labsLogin" element={<LabsLogin/>} />
     <Route path="/labsDashboard" element={<LabsDashboard/>} >
       <Route path="patients" element={<AllPatients/>}/>
       <Route path="labProfile" element={<LabProfile/>}/>
     </Route>
        </Routes>
      </div>
    </>
  );
}
const App = () => (
  
    <AppWrapper />
 
);

export default App;
