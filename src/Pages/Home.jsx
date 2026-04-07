import React from "react";
import { Activity, ChevronRight, Cpu, Server, Shield, Sparkles, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import BestSellingProducts from "../components/BestSellingProducts";
import PromoBanners from "../components/PromoBanners";
import Navbar from "../components/Navbar";
import SolutionsSection from "../components/Solutions";
import { productCatalog } from "../data/products";

export default function Home() {
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

  const stats = [
    { value: "250+", label: "Projects delivered" },
    { value: "24/7", label: "Technical support" },
    { value: "99.9%", label: "Service reliability" },
  ];

  const bestSellingProducts = productCatalog.slice(0, 4).map((product) => ({
    ...product,
    rating: product.rating.toFixed(1),
    price: product.priceLabel,
  }));

  const promoBanners = [
    {
      id: 1,
      label: "Limited Offer",
      title: "Save more on premium cloud hosting plans",
      description:
        "Launch faster with business-ready hosting packages built for speed, uptime, and easy scaling.",
      buttonLabel: "See plans",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
      themeClass: "bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="mx-auto h-[420px] max-w-6xl rounded-b-[48px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.22),_transparent_40%),radial-gradient(circle_at_top_right,_rgba(96,165,250,0.18),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#eff6ff_55%,_#f8fafc_100%)]" />
      </div>

      <Navbar />

      <section className="px-6 pb-20 pt-32">
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
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-blue-200 transition hover:bg-blue-700"
              >
                Explore Products
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/build-pc"
                className="rounded-full border border-emerald-100 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
              >
                Build Custom PC
              </Link>
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
                    Modern layout with a stronger visual focus.
                  </h2>
                </div>
                <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                  <Activity className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-8 space-y-5">
                <div className="overflow-hidden rounded-[28px] border border-blue-100 bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                    alt="Modern digital workspace"
                    className="h-[420px] w-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between rounded-3xl border border-blue-100 bg-gradient-to-r from-white to-blue-50 px-5 py-4">
                  <div>
                    <div className="text-sm text-slate-500">Visual Direction</div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">
                      Bigger imagery with less clutter
                    </div>
                  </div>
                  <div className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                    Updated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BestSellingProducts
        eyebrow="Featured Catalog"
        title="Best selling products"
        description="A reusable product section styled like modern e-commerce cards. Just change the heading and product array wherever you want to use it."
        ctaLabel="Browse catalog"
        products={bestSellingProducts}
      />

      <BestSellingProducts
        eyebrow="Top Picked by Customers"
        title="Servers series"
        description="Explore our most popular server solutions, trusted by businesses for performance and reliability. These top-rated products are designed to meet the needs of modern digital platforms."
        ctaLabel="Browse catalog"
        products={bestSellingProducts}
      />

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[36px] border border-emerald-100 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(135deg,_#06121f_0%,_#0f172a_48%,_#0b2745_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] lg:grid-cols-[1fr_380px] lg:items-center lg:p-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-emerald-200">
              <Sparkles className="h-4 w-4" />
              New Interactive Builder
            </div>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Create a custom PC build with live visual assembly.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
              Choose processors, graphics, memory, storage, cooling, and display options,
              then watch your machine come together in a more dynamic builder experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/build-pc"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Start Building
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products"
                className="rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Browse Parts Catalog
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/70 p-6 shadow-[inset_0_0_40px_rgba(59,130,246,0.08)]">
            <div className="absolute inset-x-8 top-0 h-24 bg-gradient-to-b from-emerald-400/20 to-transparent blur-2xl" />
            <div className="relative mx-auto max-w-[280px] rounded-[28px] border border-white/10 bg-slate-900 px-5 py-6">
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500" />
              </div>
              <div className="mt-5 space-y-3">
                {["CPU installed", "GPU selected", "RAM configured", "Cooling mounted"].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-200 animate-pulse"
                    style={{ animationDelay: `${index * 180}ms` }}
                  >
                    <span>{item}</span>
                    <Cpu className="h-4 w-4 text-emerald-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PromoBanners
        eyebrow="Special Highlights"
        title="Dynamic promotional banners"
        description="This banner section is reusable too. You can change the heading and pass any banner items you want to feature."
        banners={promoBanners}
      />

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

      <SolutionsSection />

      <section className="px-6 pb-24 pt-10">
        <div className="mx-auto max-w-6xl rounded-[36px] border border-blue-100 bg-gradient-to-l from-blue-600 to-sky-300 p-10 text-center text-white shadow-[0_24px_70px_rgba(37,99,235,0.22)]">
          <h2 className="text-4xl font-semibold tracking-tight">
            Talk to an expert.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-blue-50">
            Have a question? Our team is here to help you find the right solution for your business.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="rounded-full bg-white px-6 py-3.5 font-semibold text-blue-700 transition hover:bg-slate-100"
            >
              Request a Demo
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
