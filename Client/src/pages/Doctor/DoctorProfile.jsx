
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DoctorProfile() {
  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
  const fetchDoctor = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/doctors/${id}`); // ✅ corrected
      const data = await res.json();
      console.log("Doctor data",data);
      setDoctor(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctor:", error);
      setLoading(false);
    }
  };
  fetchDoctor();
}, [id]);

const handleClick = async () => {
if (!doctor || !doctor._id) {
    alert("Doctor data missing");
    return;
}
console.log("Navigating with doctor:", doctor);
  navigate("/appointment" ,{state:{doctor}})
};


  if (loading) return <p className="text-center">Loading doctor details...</p>;

  return (
    

    <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto relative mt-10 ">
      {/* Red Circle Background */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-blue-700 rounded-full opacity-20"></div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-blue-700 rounded-full opacity-20"></div>

      <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8 h-160">
        {/* Doctor Image */}
        <div className="md:w-1/3 flex justify-center">
          <img
            src="/assets/doctorimg.jpg"
            alt="Doctor"
            className="w-56 h-56 object-cover rounded-xl shadow-lg border-4 border-white"
          />
        </div>

        {/* Doctor Info */}
        <div className="md:w-2/3 space-y-6">
          <div>
            <p className="text-gray-500 italic">Doctor’s Profile</p>
            <h2 className="text-2xl font-bold text-gray-800">
              {doctor.name}
            </h2>
            <p className="text-lg font-semibold text-blue-700">
              {doctor.specialization}
            </p>
            <p className="text-sm text-gray-600">
              {doctor.description}
            </p>
          </div>

          {/* Experience, Language, Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-semibold text-gray-700">Experience:</p>
              <p className="text-blue-700">{doctor.experience}+ Years</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Language:</p>
              <p className="text-blue-600">Hindi , English</p>
            </div>
            
          </div>

          {/* Specialities */}
          <div>
            <p className="font-semibold text-gray-700 mb-2">Speciality:{doctor.specialization}</p>
            
          </div>

          {/* Appointment Call Section */}
          <div className="bg-blue-500 text-white px-6 py-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <p className="font-semibold">Call for appointment</p>
            <p className="text-lg font-bold">{doctor.mobile}</p>
            <button
              onClick={handleClick}
              className="px-5 py-2 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-gray-100 transition"
            >
              Book Appointment
            </button>
          </div>

          {/* Website */}
          <p className="text-sm text-gray-500">Mediconnect.com</p>
        </div>
      </div>
    </div>

  );
}


export default DoctorProfile;
