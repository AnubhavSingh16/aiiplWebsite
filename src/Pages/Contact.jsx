import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import { createEnquiry } from "../api/enquiries";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  topic: "General enquiry",
  message: "",
};

export default function Contact() {
  const [formValues, setFormValues] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formValues.name.trim() || !formValues.email.trim() || !formValues.message.trim()) {
      setError("Name, email, and message are required.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await createEnquiry({ ...formValues, source: "contact" });
      setFormValues(emptyForm);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: Mail,
      title: "Email us",
      value: "hello@aipl.com",
      detail: "Best for project discussions and support queries.",
    },
    {
      icon: Phone,
      title: "Call us",
      value: "+91 98765 43210",
      detail: "Speak directly with our solutions team.",
    },
    {
      icon: MapPin,
      title: "Visit us",
      value: "India",
      detail: "Available for meetings and business consultations.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="mx-auto h-[420px] max-w-7xl rounded-b-[56px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#eff6ff_55%,_#f8fafc_100%)]" />
      </div>

      <Navbar />

      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              Contact AIPL
            </div>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
              Let&apos;s talk about your next infrastructure project.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              A simple contact page with clean visuals, a basic enquiry form, and
              easy ways to reach the team.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[30px] border border-blue-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                <img
                  src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
                  alt="Professional team collaboration"
                  className="h-[320px] w-full object-cover"
                />
                <div className="p-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                    We reply fast
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                    Friendly support with modern business communication.
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Share your requirements and we will help you with products,
                    custom PC builds, or tailored infrastructure recommendations.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {contactCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.title}
                      className="rounded-[24px] border border-blue-100 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="mt-4 text-sm font-medium text-slate-500">{card.title}</div>
                      <div className="mt-1 text-base font-semibold text-slate-950">{card.value}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-600">{card.detail}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[32px] border border-blue-100 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                    Send a message
                  </div>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                    Basic enquiry form
                  </h2>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 px-4 py-2 text-sm font-semibold text-white">
                  Online
                </div>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Full name</span>
                    <input
                      type="text"
                      value={formValues.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      placeholder="Your name"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Email</span>
                    <input
                      type="email"
                      value={formValues.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white"
                    />
                  </label>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Phone</span>
                    <input
                      type="text"
                      value={formValues.phone}
                      onChange={(event) => updateField("phone", event.target.value)}
                      placeholder="Optional"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700">Topic</span>
                    <select
                      value={formValues.topic}
                      onChange={(event) => updateField("topic", event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white"
                    >
                      <option>General enquiry</option>
                      <option>Products</option>
                      <option>Custom PC build</option>
                      <option>Support</option>
                    </select>
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-slate-700">Message</span>
                  <textarea
                    rows="6"
                    value={formValues.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    placeholder="Tell us a little about what you need..."
                    className="mt-2 w-full rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-800 outline-none transition focus:border-blue-300 focus:bg-white"
                  />
                </label>

                {error && (
                  <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                  </div>
                )}

                {submitted && (
                  <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    Thanks! Your message has been sent — we'll get back to you soon.
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send Message"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link
                    to="/products"
                    className="rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
                  >
                    Browse Products
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
