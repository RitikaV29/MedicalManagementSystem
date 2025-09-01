import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#101010] text-white py-6 md:py-10 mt-10 ">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-blue-500">MediLab</h2>
          <p className="mt-3 text-sm text-gray-400">
            Providing trusted healthcare services with care and innovation.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-md md:text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-blue-500">Home</a></li>
            <li><a href="/userDashboard/about" className="hover:text-blue-500">About Us</a></li>
            
           
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-400">📍 Bhilai, India</p>
          <p className="text-gray-400">📞 +91 98765 43210</p>
         
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500"><Facebook /></a>
            <a href="#" className="hover:text-blue-500"><Twitter /></a>
            <a href="#" className="hover:text-blue-500"><Instagram /></a>
            <a href="#" className="hover:text-blue-500"><Linkedin /></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MediLab. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
