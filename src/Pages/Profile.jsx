import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Save, User } from "lucide-react";
import Navbar from "../components/Navbar";

const PROFILE_STORAGE_KEY = "userProfile";

const emptyProfile = {
  name: "",
  phone: "",
  email: "",
  address: "",
};

const readSavedProfile = () => {
  try {
    const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
    return saved ? { ...emptyProfile, ...JSON.parse(saved) } : emptyProfile;
  } catch {
    return emptyProfile;
  }
};

const profileFields = [
  { name: "name", type: "text", label: "Full name", placeholder: "Enter your full name", icon: User },
  { name: "phone", type: "text", label: "Phone", placeholder: "Enter your phone number", icon: Phone },
  { name: "email", type: "email", label: "Email", placeholder: "Enter your email address", icon: Mail },
];

export default function Profile() {
  const [form, setForm] = useState(emptyProfile);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setForm(readSavedProfile());
  }, []);

  const filledFields = useMemo(
    () => Object.values(form).filter((value) => value.trim()).length,
    [form]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(form));
    setIsSaved(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="mx-auto h-[320px] max-w-6xl rounded-b-[48px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_32%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_60%,_#f8fafc_100%)]" />
      </div>

      <Navbar />

      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="h-fit rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <User className="h-6 w-6" />
              </div>

              <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950">
                Profile
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Save your contact and address once. We will offer the same details
                during checkout.
              </p>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Completion
                </div>
                <div className="mt-3 text-3xl font-semibold text-slate-950">
                  {filledFields}/4
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  Add your name, phone, email, and address for faster checkout.
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Saved profile details can be reused without typing everything again.
              </div>
            </aside>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-8">
              <div className="flex flex-col gap-3 border-b border-slate-100 pb-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Personal Details
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                    Keep it clean and ready for checkout.
                  </h2>
                </div>

                {isSaved && (
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    Profile saved
                  </div>
                )}
              </div>

              <div className="mt-6 grid gap-5">
                {profileFields.map(({ name, type, label, placeholder, icon: Icon }) => (
                  <label
                    key={name}
                    className="rounded-2xl border border-slate-200 px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
                  >
                    <div className="mb-2 text-sm font-medium text-slate-700">{label}</div>
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-slate-400" />
                      <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={form[name]}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </label>
                ))}

                <label className="rounded-2xl border border-slate-200 px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                  <div className="mb-2 text-sm font-medium text-slate-700">Address</div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-slate-400" />
                    <textarea
                      name="address"
                      placeholder="Enter your address"
                      value={form.address}
                      onChange={handleChange}
                      rows="4"
                      className="w-full resize-none bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                <div className="text-sm text-slate-600">
                  {form.address.trim()
                    ? "Your saved address can be used directly during checkout."
                    : "Add an address so checkout can offer it before showing the form."}
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <Save className="h-4 w-4" />
                  Save profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
