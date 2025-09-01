import LabNavbar from "../Components/LabNavbar";
import img1 from "../assets/img1.jpg";
import Footer from "../Components/Footer";

function LabHome() {
  const token = localStorage.getItem("token");
let user = null;
const labToken = localStorage.getItem("labToken");
console.log("User Token:", token);
console.log("Lab Token:", labToken);
if (token) {
  try {
    const payload = token.split(".")[1];
    user = JSON.parse(atob(payload));
  } catch (err) {
    console.error("Invalid token", err);
  }
}


console.log(user);

  return (
    <div className="h-screen w-full bg-white overflow-y-auto">
      <LabNavbar />

      {/* Container */}
      <div className="w-full flex flex-col-reverse lg:flex-row justify-center gap-10 px-4 py-10 mt-10">
        
        {/* Left Section (Cards) */}
        <div className="p-4 w-full lg:w-[40%] space-y-6">
          <div className="p-8 bg-blue-50 rounded-2xl shadow-md w-full text-gray-800 hover:shadow-lg hover:scale-105 transition duration-300">
            <h1 className="text-xl md:text-2xl mb-4 font-semibold">
              <i>Book tests and track appointments</i>
            </h1>
            <button onClick={()=>{window.location.href="/userRegister"}}  className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
              Get Started
            </button>
          </div>

          <div className="p-8 bg-green-50 rounded-2xl shadow-md w-full text-gray-800 hover:shadow-lg hover:scale-105 transition duration-300">
            <h2 className="text-xl md:text-2xl mb-4 font-semibold">
              <i>Manage your lab profile and appointments</i>
            </h2>
            <button onClick={()=>{window.location.href="/labsRegister"}}  className="bg-green-400 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full lg:w-[50%] flex justify-center">
          <img
            src={img1}
            alt="Lab Illustration"
            className="w
            -full h-60 sm:h-72 md:h-96 object-cover"
          />
        </div>
      </div>

    <Footer/>
    </div>
  );
}

export default LabHome;
