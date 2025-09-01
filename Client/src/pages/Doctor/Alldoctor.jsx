

import React, { useState, useEffect } from "react";
import axios from "axios";
import DoctorCard from "../../components/DoctorCard";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";




function Alldoctor() {
  const [specialization, setSpecialization] = useState("");
  const [location, setLocation] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const patientName = localStorage.getItem("patientName");

  const fetchDoctors = async (specialization, location) => {
  try {
    setLoading(true);

    // Build query string dynamically
    const params = new URLSearchParams();
    if (specialization) params.append("specialization", specialization);
    if (location) params.append("location", location);

    const res = await axios.get(
      `http://localhost:5000/api/doctors/search?${params.toString()}`
    );

    setDoctors(res.data);
  } catch (error) {
    console.error("Error fetching doctors:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchDoctors("",""); // load on first render
  }, []);

  const handleSearch = () => {
    fetchDoctors(specialization,location);
  };

  const handleViewProfile = (doctor) => {
    alert(`View profile of ${doctor.name}`);
   navigate(`/doctor/${doctor._id}`)
  };

  return (
    <div className="  bg-gray-200 min-h-screen w-full   bg-center pb-20">
      
    <div className="bg-sky-800 shadow p-4 flex flex-col sm:flex-row justify-between items-center gap-3 h-20">
      <div className="  p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <img src="/assets/medical-appointment.png" alt="Logo" className="w-10 h-10 object-contain"/>
        <span className="font-bold text-white text-lg md:text-3xl   sm:mr-4">MediConnect</span>
      </div>
  
      {/* Search Bar */}
      <div className="flex  gap-3 mt-3 sm:mt-0    md:justify-between  md:items-center">
        
        <input
          type="text"
          placeholder="Search by Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}  onKeyDown={(e)=>e.key === "Enter" && handleSearch()}
          className=" p-2  text-white border rounded-md w-full  sm:w-25 md:w-80 sm:h-15 sm:mt-7  md:mb-5"
        />
      
        <input
          type="text"
          placeholder="Search by specialization..."
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)} onKeyDown={(e)=>e.key === "Enter" && handleSearch()}
          className=" p-2  text-white border rounded-md w-full sm:w-25 md:w-80 sm:h-15 sm:mt-7  md:mb-5"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-md border hover:bg-blue-700  sm:h-15 sm:mt-7 md:mb-5"
        >
          Search
        </button>

      <div className="relative group">
        <button className="text-white font-semibold px-4 py-2 rounded-md bg-sky-900 hover:bg-sky-800 border-2 sm:mt-7 md:mb-5 md:h-15">
          Appointments ▼
        </button>

        {/* Dropdown items */}
        <div className="absolute hidden group-hover:block bg-white text-gray-700 rounded-md shadow-lg mt-2 w-56 md:mb-5">
          
          
          <Link
            to="/user/patient/booked"
            className="block px-4 py-2 hover:bg-gray-100  "
          >
             Appointment  Status
          </Link>
        </div>
      </div>

     <div className="flex flex-col items-center justify-center mt-10 mb-5">
            <FaUserCircle className="text-white text-2xl" />
            <p className="text-center text-white text-sm  md:mb-5  ">
               <Link to="/user/profile">{patientName ? ` ${patientName}` : "Guest User"}</Link>
            </p>
    </div>

      </div>
      </div>

      {/* Doctors List */}
     
      {loading ? (
        <p className="text-center text-gray-600">Loading doctors...</p>
      ) : doctors.length > 0 ? (
        <div className="  grid grid-cos-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-10 mb-5">
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No doctors found</p>
      )}
     

      <footer className="fixed bottom-0 w-full">
        <div className="  bg-sky-800 shadow h-20 text-white font-bold mx-auto px-4   flex flex-col justify-between items-center md:mb-0">
    
          <p className="text-sm mt-5">Looking for the right doctor? MediConnect makes it simple.</p>

          <p className="text-sm mb-2">
            © {new Date().getFullYear()} MediConnect | All Rights Reserved
            </p>
        </div>
      </footer>
    </div>
  );
}

export default Alldoctor;
