import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Server,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import BestSellingProducts from "../components/BestSellingProducts";
import PromoBanners from "../components/PromoBanners";
import Navbar from "../components/Navbar";
import SolutionsSection from "../components/Solutions";
import { listProducts } from "../api/products";

const HERO_SLIDE_COPY = [
  {
    productName: "Dedicated Server X",
    eyebrow: "Built for heavy-duty server workloads",
    title: "Dedicated servers that stay fast under serious demand.",
    description:
      "From enterprise apps to traffic-heavy platforms, our server range is designed for stable performance, stronger uptime, and room to scale without friction.",
  },
  {
    productName: "Cloud VPS Pro",
    eyebrow: "Flexible hosting for growing teams",
    title: "Cloud VPS solutions that launch quickly and grow cleanly.",
    description:
      "Choose hosting products that make deployment simpler, keep applications responsive, and give your business a solid foundation from day one.",
  },
  {
    productName: "AI Compute Cluster",
    eyebrow: "AI and compute-focused infrastructure",
    title: "GPU-ready systems for training, inference, and advanced workloads.",
    description:
      "When your projects demand parallel compute and reliable throughput, our AI-ready product line helps researchers and builders move faster with confidence.",
  },
  {
    productName: "Private Cloud Core",
    eyebrow: "Private cloud with more control",
    title: "Secure cloud platforms for teams that need privacy and stability.",
    description:
      "Our private cloud offerings are tailored for organizations that need dependable infrastructure, tighter control, and a cleaner long-term path to scale.",
  },
];

export default function Home() {
  const [productCatalog, setProductCatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");

  useEffect(() => {
    listProducts()
      .then(setProductCatalog)
      .finally(() => setLoading(false));
  }, []);

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

  const bestSellingProducts = productCatalog.slice(0, 4).map((product) => ({
    ...product,
    rating: product.rating.toFixed(1),
  }));

  const heroSlides = HERO_SLIDE_COPY.map((slide) => ({
    ...slide,
    product: productCatalog.find((item) => item.name === slide.productName),
  })).filter((slide) => slide.product);

  const activeSlide = heroSlides[currentSlide];
  const heroAccent = "from-slate-950 via-slate-800 to-sky-700";

  const updateHeroSlide = (nextSlide, direction = "next") => {
    setSlideDirection(direction);
    setCurrentSlide(nextSlide);
  };

  useEffect(() => {
    if (heroSlides.length === 0) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setSlideDirection("next");
      setCurrentSlide((current) => (current + 1) % heroSlides.length);
    }, 5200);

    return () => window.clearInterval(intervalId);
  }, [heroSlides.length]);

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

  if (loading || heroSlides.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fbff] text-slate-900">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-900">
      <style>
        {`
          @keyframes heroCopySlide {
            from {
              opacity: 0;
              transform: translateX(var(--hero-copy-shift, 28px));
              filter: blur(8px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
              filter: blur(0);
            }
          }

          @keyframes heroCopyItem {
            from {
              opacity: 0;
              transform: translateY(16px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: no-preference) {
            .hero-copy-slide {
              animation: heroCopySlide 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
              will-change: opacity, transform, filter;
            }

            .hero-copy-slide [data-hero-copy] {
              animation: heroCopyItem 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
              will-change: opacity, transform;
            }

            .hero-copy-slide [data-hero-copy="meta"] {
              animation-delay: 80ms;
            }

            .hero-copy-slide [data-hero-copy="title"] {
              animation-delay: 150ms;
            }

            .hero-copy-slide [data-hero-copy="description"] {
              animation-delay: 220ms;
            }

            .hero-copy-slide [data-hero-copy="actions"] {
              animation-delay: 300ms;
            }
          }
        `}
      </style>
      <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <div className="mx-auto h-[620px]  rounded-b-[56px] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.28),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(236,72,153,0.16),_transparent_24%),radial-gradient(circle_at_50%_10%,_rgba(16,185,129,0.14),_transparent_28%),linear-gradient(180deg,_#ffffff_0%,_#eef6ff_52%,_#f8fbff_100%)]" />
      </div>
      <div className="absolute -top-10 left-1/2 -z-10 h-64 w-64 -translate-x-[520px] rounded-full bg-cyan-300/20 blur-3xl" />
      <div className="absolute right-0 top-24 -z-10 h-72 w-72 rounded-full bg-pink-300/20 blur-3xl" />

      <Navbar />

      <section className="px-0 pb-20 pt-24 ">
        <div className="overflow-hidden  lg:min-h-screen">
          <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1600px] items-stretch lg:grid-cols-[1.02fr_0.98fr]">
            <div className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
              {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.14),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96)_0%,_rgba(248,250,252,0.96)_100%)]" /> */}
              {/* <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-slate-200/60 blur-3xl" /> */}

              <div
                key={activeSlide.product.id}
                className="hero-copy-slide relative"
                style={{
                  "--hero-copy-shift":
                    slideDirection === "previous" ? "-28px" : "28px",
                }}
              >
                <div
                  data-hero-copy="eyebrow"
                  className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/85 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur"
                >
                  <Sparkles className="h-4 w-4" />
                  {activeSlide.eyebrow}
                </div>

                <div className="mt-6 min-h-[320px] lg:min-h-[380px]">
                  <p
                    data-hero-copy="meta"
                    className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500"
                  >
                    {activeSlide.product.category} / {activeSlide.product.type}
                  </p>
                  <h1
                    data-hero-copy="title"
                    className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 md:text-5xl"
                  >
                    {activeSlide.title}
                  </h1>
                  <p
                    data-hero-copy="description"
                    className="mt-6 max-w-2xl text-lg leading-8 text-slate-600"
                  >
                    {activeSlide.description}
                  </p>

                  <div
                    data-hero-copy="actions"
                    className="mt-10 flex flex-wrap gap-4"
                  >
                    <Link
                      to="/products"
                      className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${heroAccent} px-6 py-3.5 font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)] transition hover:scale-[1.01]`}
                    >
                      Explore Products
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/build-pc"
                      className="rounded-full border border-emerald-200 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700"
                    >
                      Build Custom PC
                    </Link>
                  </div>
                </div>

                {/* <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[24px] border border-slate-200 bg-white px-4 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                  <div>
                    <div className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Featured Product
                    </div>
                    <div className="mt-2 text-lg font-semibold text-slate-950">
                      {activeSlide.product.name}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      {`${activeSlide.product.badge} • Rated ${activeSlide.product.rating.toFixed(1)}`}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentSlide(
                          (currentSlide - 1 + heroSlides.length) % heroSlides.length
                        )
                      }
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentSlide((currentSlide + 1) % heroSlides.length)}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="relative min-h-[420px] overflow-hidden  p-5 sm:p-7 lg:min-h-screen ">
              <div className="absolute inset-0 " />

              <div className="relative h-full rounded-[32px] border border-white/10 bg-white/5 p-3 backdrop-blur-md">
                <div className="relative h-full overflow-hidden rounded-[28px]">
                  {heroSlides.map((slide, index) => {
                    const isActive = index === currentSlide;

                    return (
                      <div
                        key={slide.product.id}
                        className={`absolute inset-0 transition-all duration-700 ${
                          isActive
                            ? "translate-x-0 opacity-100"
                            : index < currentSlide
                              ? "-translate-x-8 opacity-0"
                              : "translate-x-8 opacity-0"
                        }`}
                      >
                        <img
                          src={slide.product.image}
                          alt={slide.product.name}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />

                        <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-5">
                          <div className="rounded-full border border-white/15 bg-slate-950/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                            {slide.product.category}
                          </div>
                          <div className={`rounded-full bg-gradient-to-r ${heroAccent} px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg`}>
                            {slide.product.badge}
                          </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                          <div className="max-w-lg rounded-[28px] border border-white/12 bg-slate-950/45 p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur-md">
                            <div className="text-sm text-sky-100">{slide.product.type}</div>
                            <div className="mt-2 text-3xl font-semibold">
                              {slide.product.name}
                            </div>
                            <p className="mt-3 text-sm leading-7 text-slate-200">
                              {slide.product.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    {heroSlides.map((slide, index) => (
                      <button
                        key={slide.product.id}
                        type="button"
                        onClick={() => {
                          if (index !== currentSlide) {
                            updateHeroSlide(
                              index,
                              index < currentSlide ? "previous" : "next"
                            );
                          }
                        }}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === currentSlide
                            ? "w-10 bg-white"
                            : "w-2.5 bg-white/45 hover:bg-white/70"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                  {/* <div className="text-sm font-medium text-white/85">
                    0{currentSlide + 1} / 0{heroSlides.length}
                  </div> */}
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
                  className="rounded-[28px] border border-blue-300 bg-gradient-to-br from-blue-100 via-white to-blue-200 p-8 shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,99,235,0.15)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SolutionsSection />

      <section className="px-6 pb-24 pt-10">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-blue-100 bg-[radial-gradient(circle_at_top_left,_rgba(25,185,129,0.4),_transparent_28%),linear-gradient(155deg,_#06121f_0%,_#0f172a_48%,_#0b2745_100%)] p-10 text-center text-white shadow-[0_24px_70px_rgba(37,99,235,0.22)]">
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
              Contact Us
            </Link>
            <Link
              to="/about"
              className="rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
