// UserDashboard.jsx
import { Outlet } from "react-router-dom";
import LabNavbar from "../../Components/LabNavbar";
import Footer from "../../Components/Footer";

function UserDashboard() {
  return (
    <div className="flex flex-col overflow-auto h-screen w-full bg-gray-100">
      {/* Navbar */}
    
        <LabNavbar />
    

      {/* Main Content */}
    
        <div className="p-6 flex-grow">
          <Outlet />
        </div>
     

      {/* Footer */}
     
        <Footer />
   
    </div>
  );
}

export default UserDashboard;
