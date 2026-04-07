import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Briefcase,
  Headphones,
  Layers3,
  Rocket,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function About() {
  const pillars = [
    {
      icon: Server,
      title: "Powerful solutions",
      description:
        "We bring together products, systems, and infrastructure that feel modern, reliable, and ready for growth.",
      tone: "from-cyan-500 to-blue-500",
    },
    {
      icon: Award,
      title: "Best quality",
      description:
        "Every recommendation is shaped around quality, performance, and cleaner long-term value for the client.",
      tone: "from-amber-400 to-orange-500",
    },
    {
      icon: Headphones,
      title: "Closer service",
      description:
        "We stay responsive, practical, and easy to work with so support feels like part of the product itself.",
      tone: "from-emerald-400 to-teal-500",
    },
  ];

  const audiences = [
    "Growing businesses building faster digital operations",
    "Teams that want custom PC setups for work, design, or gaming",
    "Organizations needing secure hosting and dependable infrastructure",
    "Clients looking for a more energetic, modern technology partner",
  ];

  const values = [
    {
      icon: ShieldCheck,
      title: "Trusted quality",
      text: "Better hardware choices, cleaner implementation, and stronger standards across every project.",
    },
    {
      icon: Layers3,
      title: "What we serve",
      text: "Products, custom systems, infrastructure support, and modern business-ready technology experiences.",
    },
    {
      icon: Rocket,
      title: "Fast service",
      text: "Quick communication, practical answers, and a stronger focus on helping teams keep momentum.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fffaf7] text-slate-900">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(251,146,60,0.18),_transparent_24%),radial-gradient(circle_at_top_right,_rgba(236,72,153,0.18),_transparent_22%),radial-gradient(circle_at_50%_20%,_rgba(59,130,246,0.14),_transparent_28%),linear-gradient(180deg,_#fffaf7_0%,_#fff7ed_38%,_#ffffff_100%)]" />

      <Navbar />

      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-4 py-2 text-sm font-medium text-orange-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                About AIPL
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 md:text-6xl">
                A technology company built around quality, service, and momentum.
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                We help businesses and teams move with stronger technology experiences,
                from dependable products and custom PC builds to infrastructure support that
                feels modern, practical, and easy to trust.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 font-semibold text-white transition hover:bg-slate-800"
                >
                  Explore Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="rounded-full border border-pink-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-pink-300 hover:text-pink-700"
                >
                  Talk to Us
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="overflow-hidden rounded-[30px] border border-orange-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:row-span-2">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
                  alt="Creative technology workspace"
                  className="h-full min-h-[420px] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[28px] border border-pink-100 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80"
                  alt="Business team discussion"
                  className="h-[205px] w-full object-cover"
                />
              </div>
              <div className="rounded-[28px] border border-blue-100 bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 p-6 text-white shadow-[0_24px_70px_rgba(37,99,235,0.22)]">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-100">
                  What drives us
                </div>
                <div className="mt-3 text-2xl font-semibold">
                  Better service. Better systems. Better delivery.
                </div>
                <p className="mt-3 text-sm leading-7 text-cyan-50">
                  We aim to make technology feel sharper, faster, and more approachable for every client we serve.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-16 grid gap-6 md:grid-cols-3">
            {pillars.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[30px] border border-white bg-white p-8 shadow-[0_18px_55px_rgba(15,23,42,0.06)]"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.tone} text-white shadow-lg`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-6 text-2xl font-semibold text-slate-950">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="rounded-[36px] border border-emerald-100 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(251,146,60,0.18),_transparent_24%),linear-gradient(135deg,_#0b1220_0%,_#132238_48%,_#17345d_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-emerald-200">
                <Users className="h-4 w-4" />
                Who We Serve
              </div>
              <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white">
                We serve teams that want more energy and more reliability from their tech partner.
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-300">
                Whether the need is product sourcing, stronger infrastructure, or custom PC builds,
                we focus on helping clients feel supported and better equipped to scale.
              </p>
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                alt="Modern technology office"
                className="mt-8 h-[260px] w-full rounded-[28px] object-cover"
              />
            </div>

            <div className="grid gap-4">
              {audiences.map((item, index) => (
                <div
                  key={item}
                  className={`flex items-start gap-4 rounded-[26px] border px-5 py-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] ${
                    index % 2 === 0
                      ? "border-orange-100 bg-orange-50/60"
                      : "border-pink-100 bg-pink-50/60"
                  }`}
                >
                  <div className="rounded-2xl bg-white p-3 text-slate-800 shadow-sm">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <p className="text-sm leading-7 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-600">
                  Why Choose Us
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
                  Stronger quality, warmer service, and a more colorful approach to delivery.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  We don&apos;t just provide products. We help shape a better overall technology experience with more care in communication, better recommendations, and cleaner execution.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
                  alt="Professional support and service"
                  className="mt-8 h-[240px] w-full rounded-[28px] object-cover shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                />
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {values.map((item, index) => {
                  const Icon = item.icon;
                  const tones = [
                    "from-cyan-500 to-blue-500",
                    "from-fuchsia-500 to-pink-500",
                    "from-emerald-500 to-teal-500",
                  ];

                  return (
                    <div
                      key={item.title}
                      className="rounded-[30px] border border-white bg-white p-8 shadow-[0_18px_55px_rgba(15,23,42,0.06)]"
                    >
                      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tones[index]} text-white shadow-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-6 text-2xl font-semibold text-slate-950">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="mt-16 rounded-[38px] bg-[linear-gradient(135deg,_#fb923c_0%,_#ec4899_48%,_#8b5cf6_100%)] p-10 text-white shadow-[0_30px_90px_rgba(236,72,153,0.18)]">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-100">
                  Ready To Connect
                </div>
                <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                  Looking for products, custom setups, or a technology team that feels more alive and proactive?
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-pink-50">
                  We&apos;re here to help with practical suggestions, faster support, and solutions that bring more clarity and confidence to your next move.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 self-start rounded-full bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100 lg:self-auto"
              >
                Talk to our team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
