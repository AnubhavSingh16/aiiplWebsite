import { Server, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-blue-100 border-t border-teal-300/20 backdrop-blur-md">
      
      {/* Inner Container */}
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        
        {/* Top Section */}
        <div className="grid gap-10 md:grid-cols-3">
          
          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                <Server size={18} />
              </div>
              <span className="font-semibold text-slate-800 text-lg">AIPL</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Modern infrastructure solutions designed to scale your business
              with performance, security, and reliability.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <a href="/" className="hover:text-teal-600 transition">Home</a>
              <a href="/about" className="hover:text-teal-600 transition">About</a>
              <a href="/services" className="hover:text-teal-600 transition">Services</a>
              <a href="/contact" className="hover:text-teal-600 transition">Contact</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-3">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Mail size={16} /> info@aipl.com
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} /> +91 98765 43210
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> India
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-teal-300/20" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} AIPL. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-teal-600 transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-teal-600 transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
