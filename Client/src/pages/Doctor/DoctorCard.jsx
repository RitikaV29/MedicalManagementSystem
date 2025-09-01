import React from "react";


function DoctorCard({doctor,onViewProfile}){

    
    
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center gap-3 w-90  ">
            <img src="/assets/doctorimg.jpg" alt={doctor.name}  className="w-24 h-24 rounded-full object-cover"/>
            <h3 className="text-xl font-bold">{doctor.name}</h3>
            <p className="text-gray-600">{doctor.specialization}</p>
            <p className="text-gray-600">location:{doctor.location}</p>
            <p className="text-gray-600">Consultation fee:{doctor.fees}</p>
           

           <button onClick={()=>onViewProfile(doctor)} className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                View profile
           </button>
        </div>
    )
}
export default DoctorCard;