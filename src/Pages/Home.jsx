import React, { useEffect, useState } from "react";
import {
  Activity,
  ChevronRight,
  Cpu,
  Database,
  HardDrive,
  Menu,
  Server,
  Shield,
  X,
  Zap,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", active: true },
    { name: "Services", active: false },
    { name: "Solutions", active: false },
    { name: "Infrastructure", active: false },
    { name: "Contact", active: false },
  ];

  const highlights = [
    {
      icon: Server,
      title: "Scalable infrastructure",
      description:
        "Launch reliable cloud, hosting, and enterprise-ready server solutions with room to grow.",
    },
    {
      icon: Shield,
      title: "Trusted performance",
      description:
        "Built for uptime, security, and smooth delivery so your team can move faster with confidence.",
    },
    {
      icon: Zap,
      title: "Fast digital delivery",
      description:
        "From consultation to deployment, every step is designed to feel clean, quick, and modern.",
    },
  ];

  const serviceCards = [
    {
      title: "Cloud Hosting",
      description:
        "Flexible hosting environments for growing businesses and digital platforms.",
      metric: "99.9% uptime",
      icon: Cpu,
    },
    {
      title: "Data Storage",
      description:
        "Secure storage architecture with dependable access and backup readiness.",
      metric: "Enterprise secure",
      icon: Database,
    },
    {
      title: "Dedicated Servers",
      description:
        "High-performance infrastructure for apps, analytics, and business operations.",
      metric: "Fast deployment",
      icon: HardDrive,
    },
  ];

  const stats = [
    { value: "250+", label: "Projects delivered" },
    { value: "24/7", label: "Technical support" },
    { value: "99.9%", label: "Service reliability" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="mx-auto h-[420px] max-w-6xl rounded-b-[48px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(96,165,250,0.18),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#eff6ff_55%,_#f8fafc_100%)]" />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-blue-100 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 text-white shadow-lg shadow-blue-200">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">AIPL</div>
              <div className="text-xs text-slate-500">Modern Infrastructure Solutions</div>
            </div>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`text-sm font-medium transition-colors ${
                  item.active
                    ? "text-blue-700"
                    : "text-slate-600 hover:text-blue-700"
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button className="rounded-full border border-blue-100 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
              View Services
            </button>
            <button className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
              Get Started
            </button>
          </div>

          <button
            className="rounded-xl border border-blue-100 bg-white p-2 text-slate-700 md:hidden"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-blue-100 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className={`text-sm font-medium ${
                    item.active ? "text-blue-700" : "text-slate-600"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <button className="rounded-full border border-blue-100 px-4 py-2 text-sm font-medium text-slate-700">
                View Services
              </button>
              <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <Zap className="h-4 w-4" />
              Smart digital infrastructure for modern business
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-slate-900 md:text-6xl">
              A modern white and blue homepage for a stronger digital presence.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              We help businesses present their hosting, cloud, and infrastructure
              services with a clean visual identity, confident messaging, and a
              design that feels current from the first scroll.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-blue-200 transition hover:bg-blue-700">
                Explore Solutions
                <ChevronRight className="h-4 w-4" />
              </button>
              <button className="rounded-full border border-blue-100 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
                Talk to Our Team
              </button>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-semibold text-blue-700">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-blue-200/50 to-sky-100/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[32px] border border-blue-100 bg-white p-6 shadow-[0_30px_80px_rgba(37,99,235,0.12)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-blue-700">Homepage Preview</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                    Clear structure. Better trust. More impact.
                  </h2>
                </div>
                <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                  <Activity className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="rounded-3xl bg-slate-950 px-6 py-5 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-blue-200">Featured Solution</div>
                      <div className="mt-2 text-xl font-semibold">
                        Scalable Cloud Infrastructure
                      </div>
                    </div>
                    <div className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-100">
                      Live
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
                    <div className="text-sm text-slate-500">Performance Focus</div>
                    <div className="mt-2 text-2xl font-semibold text-slate-900">Fast, stable, modern</div>
                    <div className="mt-2 text-sm text-slate-600">
                      Messaging and styling aligned to white-and-blue branding.
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="text-sm text-slate-500">Design Language</div>
                    <div className="mt-2 text-2xl font-semibold text-slate-900">Soft cards, clean spacing</div>
                    <div className="mt-2 text-sm text-slate-600">
                      Modern sections with better contrast and lighter visuals.
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-blue-100 bg-gradient-to-r from-white to-blue-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-slate-500">User Experience</div>
                      <div className="mt-1 text-lg font-semibold text-slate-900">
                        Stronger first impression with cleaner text hierarchy
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-blue-700">Updated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Why this design works
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
              A fresh homepage built around clarity and confidence.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The new layout uses light surfaces, blue accents, improved spacing,
              and more polished text so the homepage feels professional and easy to trust.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-blue-100 bg-white p-8 shadow-[0_16px_50px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl rounded-[36px] border border-blue-100 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Services
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
                Designed to present your core offerings with more polish.
              </h2>
            </div>
            <p className="max-w-xl text-slate-600">
              Each block is styled with cleaner typography, softer borders, and a white-blue palette that feels modern without being heavy.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {serviceCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="rounded-[28px] border border-slate-200 bg-slate-50 p-7 transition hover:border-blue-200 hover:bg-white"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-6 text-sm font-medium text-blue-700">{card.metric}</div>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{card.description}</p>
                  <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition hover:text-blue-700">
                    Learn more
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] bg-slate-950 p-10 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              Modern Direction
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              White backgrounds. Blue accents. Better readability.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              This refreshed homepage replaces heavy dark styling with a lighter visual system that feels more premium, more accessible, and more professional.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[28px] border border-blue-100 bg-blue-50 p-8">
              <div className="text-sm font-medium text-blue-700">Typography</div>
              <div className="mt-3 text-2xl font-semibold text-slate-900">
                Cleaner text hierarchy
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Headlines, supporting copy, and action buttons now feel more balanced and easier to scan.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-8">
              <div className="text-sm font-medium text-blue-700">Visual Style</div>
              <div className="mt-3 text-2xl font-semibold text-slate-900">
                Softer cards and modern spacing
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Rounded containers, subtle shadows, and blue-tinted surfaces make the page feel current.
              </p>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-8">
              <div className="text-sm font-medium text-blue-700">Brand Tone</div>
              <div className="mt-3 text-2xl font-semibold text-slate-900">
                Professional but approachable
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                The content now supports a trustworthy business image instead of a crowded marketplace feel.
              </p>
            </div>

            <div className="rounded-[28px] border border-blue-100 bg-gradient-to-br from-white to-blue-50 p-8">
              <div className="text-sm font-medium text-blue-700">Call to Action</div>
              <div className="mt-3 text-2xl font-semibold text-slate-900">
                Clear next step for visitors
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Primary buttons are now easier to notice and fit naturally into the updated color theme.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pt-10 pb-24">
        <div className="mx-auto max-w-5xl rounded-[36px] border border-blue-100 bg-gradient-to-br from-blue-600 to-sky-500 p-10 text-center text-white shadow-[0_24px_70px_rgba(37,99,235,0.22)]">
          <h2 className="text-4xl font-semibold tracking-tight">
            Ready for a cleaner and more modern homepage?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-blue-50">
            This layout now follows a white and blue design direction with improved wording, brighter sections, and a more modern overall feel.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="rounded-full bg-white px-6 py-3.5 font-semibold text-blue-700 transition hover:bg-slate-100">
              Request a Demo
            </button>
            <button className="rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
