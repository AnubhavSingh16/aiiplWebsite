import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { User, Mail, Phone, MapPin, Save } from "lucide-react";

export default function Profile() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(form));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <div className="grid gap-8 md:grid-cols-[320px_1fr]">

          {/* LEFT PROFILE CARD */}
          <div className="rounded-3xl bg-slate-900 p-6 text-white shadow-lg">
            <div className="flex flex-col items-center text-center">

              {/* Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-white">
                <User className="h-10 w-10" />
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                {form.name || "Your Name"}
              </h2>

              <p className="text-sm text-slate-300">
                {form.email || "your@email.com"}
              </p>

              <div className="mt-6 w-full rounded-xl bg-white/10 p-3 text-sm">
                Saved details will be used during checkout 🚀
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="rounded-3xl bg-white p-8 shadow-md border border-slate-200">
            <h2 className="text-2xl font-semibold text-slate-900">
              Personal Information
            </h2>

            <div className="mt-6 grid gap-5">

              {/* Name */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                <User className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full outline-none"
                />
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                <Phone className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                <Mail className="h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full outline-none"
                />
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 rounded-xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                <MapPin className="mt-1 h-5 w-5 text-slate-400" />
                <textarea
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full outline-none"
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Save Details
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
