import React,{useState} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';


function AppointmentForm(){

    const location = useLocation();
    
    const doctor = location.state?.doctor;
    const navigate = useNavigate();
  
    console.log("doctor:", doctor);

    if (!doctor || !doctor._id) {
  alert("Doctor not selected. Please go back and select a doctor.");
  return (
    <div className="text-center mt-10 text-red-600">
      No doctor selected. Please go back and select a doctor.
      <button
        onClick={() => navigate("/user/dashboard")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Go to Doctors
      </button>
    </div>
  );
}
  
    const [formData,setFormData] = useState({
        patientName:"",
        patientAge:"",
        patientGender:"",
        patientEmail:"",
        MobileNo:"",
        patientAddress:"",
        date:"",
        time:"",
        notes:"",
        status:"Pending"
    });

    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };




    const handleSubmit = async(e) =>{
        e.preventDefault();
      
            if (!doctor || !doctor._id) {
            alert("Doctor not selected. Please choose a doctor.");
            return;
             }

        try{

          
             console.log("Patient Token in localStorage:", localStorage.getItem("patientToken"));


            const token = localStorage.getItem("patientToken");
            if (!token) {
            alert("You must be logged in to book an appointment.");
            return;
            }
          
            const res = await fetch("http://localhost:5000/api/appointments/book",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`,
                },
                
                body:JSON.stringify({...formData,doctor:doctor._id})
            });

            if(!res.ok){
                const errorData = await res.json();
                alert(errorData.error||"Something went wrong");
                return;
            }

            const data = await res.json();
              alert(`Appointment booked with Dr.${doctor.name}  for ${formData.patientName} on ${formData.date} at ${formData.time} `);

              setFormData({
                patientName:"",
                patientAge:"",
                patientGender:"",
                patientEmail:"",
                MobileNo:"",
                patientAddress:"",
                date:"",
                time:"",
                notes:"",
                status:"Pending"
            });
            
        }
        catch(err){
            alert("Error booking appointment"+ err.message);
        }
        }


        
    

    return (
       
<div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-black" 
        >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Form Card */}
      <form 
        onSubmit={handleSubmit} 
        className="relative bg-blue-900 bg-opacity-70 text-white p-10 rounded-lg w-[700px] shadow-lg mt-5 mb-5"
      >
        <h1 className="text-3xl font-bold text-center mb-6">APPOINTMENT FORM</h1>
        <h2 className="text-lg text-center mb-8">MAKE AN APPOINTMENT</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Patient Name</label>
            <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} 
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none" />
          </div>

          <div>
            <label className="block mb-2">Patient Age</label>
            <input type="number" name="patientAge" value={formData.patientAge} onChange={handleChange} 
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none" />
          </div>

           <div>
            <label className="block mb-2">Gender</label>
            <select name="patientGender" value={formData.patientGender} onChange={handleChange} 
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          

          <div>
            <label className="block mb-2">Phone Number</label>
            <input type="text" name="MobileNo" value={formData.MobileNo} onChange={handleChange} 
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none" />
          </div>

          
        <div>
            <label className="block mb-2">Email</label>
            <input type="email" name="patientEmail" value={formData.patientEmail} onChange={handleChange} 
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none" />
        </div>

        <div>
            <label className="block mb-2">Address</label>
            <input type="text" name="patientAddress" value={formData.patientAddress} onChange={handleChange} 
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none" />
        </div>
         

        <div>
            <label className="block mb-2">Reasons for Visit</label>
            <textarea name="notes" value={formData.notes || ""} onChange={handleChange} 
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none" />
        </div>

        <div>
            <label className="block mb-2">Status</label>
            <select name="status" value={formData.status || "Pending"} onChange={handleChange} 
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none">
              <option value="Pending">Pending</option>
             
            </select>
        </div>

         <div>
            <label className="block mb-2">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} 
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none" />
          </div>
        

          <div>
            <label className="block mb-2">Time</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} 
              className="w-full p-2 rounded bg-blue-800 text-white focus:outline-none" />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button type="submit" className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded text-lg font-semibold">
            Make an appointment
          </button>
        </div>
      </form>
    </div>

    )
}

export default AppointmentForm;