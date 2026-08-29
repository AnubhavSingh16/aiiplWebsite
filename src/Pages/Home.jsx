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
import HeroSkeleton from "../components/skeletons/HeroSkeleton";
import { listProducts } from "../api/products";
import { listBanners } from "../api/banners";
import { listHeroSlides } from "../api/heroSlides";

export default function Home() {
  const [productCatalog, setProductCatalog] = useState([]);
  const [banners, setBanners] = useState([]);
  const [heroSlideRecords, setHeroSlideRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState("next");

  useEffect(() => {
    Promise.all([listProducts(), listBanners(), listHeroSlides()])
      .then(([productData, bannerData, heroSlideData]) => {
        setProductCatalog(productData);
        setBanners(bannerData.filter((banner) => banner.active));
        setHeroSlideRecords(heroSlideData.filter((slide) => slide.active));
      })
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

  const heroSlides = heroSlideRecords.map((slide) => ({
    ...slide,
    id: slide._id,
  }));

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

  const showHeroSkeleton = loading || heroSlides.length === 0;

  const promoBanners = banners.map((banner) => ({ ...banner, id: banner._id }));

  return (
    <div className="min-h-screen  text-slate-900">
      <Navbar />

      <section className="px-0 pb-20 pt-24 ">
        {showHeroSkeleton ? (
          <HeroSkeleton />
        ) : (
          <div className="overflow-hidden  lg:min-h-screen">
            <div
              className="
    mx-auto
    grid
    min-h-[calc(100vh-6rem)]
    max-w-[1600px]
    overflow-hidden
    rounded-t-[80px]

    bg-gradient-to-b
    from-[#84aff8]
    to-[#ffffff]
    items-stretch
    lg:grid-cols-[1.02fr_0.98fr]
  "
            >
              <div className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
                {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.14),_transparent_30%),linear-gradient(180deg,_rgba(255,255,255,0.96)_0%,_rgba(248,250,252,0.96)_100%)]" /> */}
                {/* <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-slate-200/60 blur-3xl" /> */}

                <div
                  key={activeSlide.id}
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
                    <h1
                      data-hero-copy="title"
                      className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight text-sky-950 md:text-5xl"
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
                          key={slide.id}
                          className={`absolute inset-0 transition-all duration-700 ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : index < currentSlide
                                ? "-translate-x-8 opacity-0"
                                : "translate-x-8 opacity-0"
                          }`}
                        >
                          {slide.image ? (
                            <img
                              src={slide.image}
                              alt={slide.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div
                              className={`h-full w-full bg-gradient-to-br ${heroAccent}`}
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />

                          {/* <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-5">
                            <div className="rounded-full border border-white/15 bg-slate-950/35 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                              {slide.eyebrow}
                            </div>
                          </div> */}

                          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                            <div className="max-w-lg rounded-[28px] border border-white/40 bg-slate-600/10 p-5 text-white shadow-[0_18px_40px_rgba(15,43,42,0.50)] backdrop-blur-md">
                              <div className="text-2xl font-semibold">
                                {slide.title}
                              </div>
                              {/* <p className="mt-3 text-sm leading-7 text-slate-200">
                              {slide.description}
                            </p> */}
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
                          key={slide.id}
                          type="button"
                          onClick={() => {
                            if (index !== currentSlide) {
                              updateHeroSlide(
                                index,
                                index < currentSlide ? "previous" : "next",
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
        )}
      </section>

      <BestSellingProducts
        eyebrow="Featured Catalog"
        title="Best selling products"
        description="A reusable product section styled like modern e-commerce cards. Just change the heading and product array wherever you want to use it."
        ctaLabel="Browse catalog"
        products={bestSellingProducts}
        loading={loading}
      />

      <BestSellingProducts
        eyebrow="Top Picked by Customers"
        title="Servers series"
        description="Explore our most popular server solutions, trusted by businesses for performance and reliability. These top-rated products are designed to meet the needs of modern digital platforms."
        ctaLabel="Browse catalog"
        products={bestSellingProducts}
        loading={loading}
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
              Choose processors, graphics, memory, storage, cooling, and display
              options, then watch your machine come together in a more dynamic
              builder experience.
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
            <div className="relative mx-auto max-w-[280px] rounded-[28px] border border-white/50 bg-slate-900 px-5 py-6">
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500" />
              </div>
              <div className="mt-5 space-y-3">
                {[
                  "CPU installed",
                  "GPU selected",
                  "RAM configured",
                  "Cooling mounted",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-200 animate-pulse"
                    style={{ animationDelay: `${index * 80}ms` }}
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

      {promoBanners.length > 0 && (
        <PromoBanners
          eyebrow="Special Highlights"
          title="Dynamic promotional banners"
          description="This banner section is reusable too. You can change the heading and pass any banner items you want to feature."
          banners={promoBanners}
        />
      )}

      <SolutionsSection />

     {/* WHY CHOOSE US */}

      <section className="relative overflow-hidden px-5 py-20 sm:px-6 lg:py-12">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full" />

        <div className="relative mx-auto max-w-7xl">
          {/* ================= HEADER ================= */}

          <div className="mx-auto max-w-3xl text-center">
            {/* <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Why choose us
            </div> */}

            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-[#071A3A] sm:text-4xl lg:text-[42px]">
             Why choose us for
              <span className="text-blue-600"> your technology needs.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Reliable infrastructure, quality products and expert support —
              everything working together to keep your business moving.
            </p>
          </div>

          {/* ================= FEATURES ================= */}

          <div className="relative mx-auto mt-14 max-w-5xl">
            {/* Connecting line */}
            <div
              className="
          pointer-events-none
          absolute
          left-[16.66%]
          right-[16.66%]
          top-1/2
          hidden
          h-px
          bg-gradient-to-r
          from-transparent
          via-blue-200
          to-transparent
          md:block
        "
            />

            <div className="grid gap-5 md:grid-cols-3">
              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="group relative">
                    {/* ================= CARD ================= */}

                    <div
                      className="
                  relative
                  h-[290px]
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-white
                  bg-white/75
                  p-6
                  shadow-[0_15px_45px_rgba(15,23,42,0.07)]
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-blue-200
                  hover:shadow-[0_20px_45px_rgba(37,99,235,0.10)]
                "
                    >
                      {/* Subtle background glow */}
                      <div
                        className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-40
                    w-40
                    rounded-full
                    bg-blue-400/10
                    blur-3xl
                    opacity-0
                    transition-opacity
                    duration-300
                    group-hover:opacity-100
                  "
                      />

                      {/* Top accent line */}
                      <div
                        className="
                    absolute
                    left-6
                    right-6
                    top-0
                    h-[2px]
                    origin-left
                    scale-x-0
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    to-sky-400
                    transition-transform
                    duration-300
                    group-hover:scale-x-100
                  "
                      />

                      {/* ================= ICON + NUMBER ================= */}

                      <div className="relative flex items-center justify-between">
                        <div
                          className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-blue-50
                      to-sky-100
                      text-blue-600
                      shadow-sm
                      transition-colors
                      duration-300
                      group-hover:from-blue-600
                      group-hover:to-sky-500
                      group-hover:text-white
                    "
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <span
                          className="
                      text-4xl
                      font-bold
                      tracking-[-0.06em]
                      text-slate-100
                      transition-colors
                      duration-300
                      group-hover:text-blue-100
                    "
                        >
                          0{index + 1}
                        </span>
                      </div>

                      {/* ================= CONTENT ================= */}

                      <div className="relative mt-7">
                        <h3 className="text-lg font-semibold tracking-tight text-[#071A3A]">
                          {item.title}
                        </h3>

                        <p className="mt-2.5 line-clamp-3 text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      {/* ================= BOTTOM ================= */}

                      <div
                        className="
                    absolute
                    bottom-6
                    left-6
                    right-6
                    flex
                    items-center
                  "
                      >
                        {/* Indicator */}
                        <div className="h-1 w-10 rounded-full bg-blue-100">
                          <div className="h-full w-full rounded-full bg-blue-500/70" />
                        </div>

                        {/* Arrow */}
                        <div
                          className="
                      ml-auto
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-100
                      text-slate-300
                      transition-all
                      duration-300
                      group-hover:border-blue-200
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                        >
                          <ChevronRight
                            className="
                        h-3.5
                        w-3.5
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                      "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= TRUST STRIP ================= */}

          <div
            className="
        mx-auto
        mt-10
        flex
        max-w-4xl
        flex-wrap
        items-center
        justify-center
        gap-x-8
        gap-y-3
        text-xs
        text-slate-400
      "
          ></div>
        </div>
      </section>

      {/* Talk to expert */}
      <section className="px-5 pb-20 pt-8 sm:px-6 lg:pb-24">
        <div
          className="
      relative
      mx-auto
      max-w-7xl
      overflow-hidden
      rounded-[32px]
      

      bg-gradient-to-b
      from-[#05307a]

      to-[#75b0da]
      px-7
      py-10
      text-white
      shadow-[0_25px_70px_rgba(7,26,58,0.22)]
      sm:px-10
      lg:px-14
      lg:py-12
    "
        >
          {/* Background decoration */}
          <div
            className="
        pointer-events-none
        absolute
        -right-24
        -top-32
        h-80
        w-80
        rounded-full
        bg-blue-400/20
        blur-[100px]
      "
          />

          <div
            className="
        pointer-events-none
        absolute
        -bottom-32
        left-1/3
        h-64
        w-64
        rounded-full
        bg-sky-400/10
        blur-[90px]
      "
          />

          {/* Content */}
          <div
            className="
        relative
        flex
        flex-col
        gap-8
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
          >
            {/* Left */}
            <div className="max-w-2xl">
              {/* <div
                className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-white/15
            bg-white/10
            px-3
            py-1.5
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.18em]
            text-blue-100
            backdrop-blur
          "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
                Need help?
              </div> */}

              <h2
                className="
            mt-4
            text-3xl
            font-semibold
            tracking-[-0.035em]
            sm:text-4xl
          "
              >
                Talk to an
                <span className="text-sky-300"> expert.</span>
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/90 sm:text-base">
                Not sure what you need? Our team can help you find the right
                products and infrastructure for your business.
              </p>
            </div>

            {/* Right actions */}
            <div className="relative flex shrink-0 flex-wrap gap-3">
              <Link
                to="/contact"
                className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white
            px-5
            py-3
            text-sm
            font-semibold
            text-blue-700
            shadow-[0_8px_25px_rgba(0,0,0,0.15)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-blue-50
          "
              >
                Contact Us
                <ChevronRight className="h-4 w-4" />
              </Link>

              <Link
                to="/about"
                className="
            inline-flex
            items-center
            rounded-full
            border
            border-white
            bg-white/10
            px-5
            py-3
            text-sm
            font-semibold
            text-white
            backdrop-blur
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-white/35
            hover:bg-white/15
          "
              >
                About Us
              </Link>
            </div>
          </div>

          {/* Bottom detail */}
          <div
            className="
        relative
        mt-8
        flex
        flex-wrap
        items-center
        gap-x-6
        gap-y-2
        border-t
        border-white/10
        pt-5
        text-[11px]
        text-white
      "
          >
            <span>Product guidance</span>

            <span className="h-1 w-1 rounded-full bg-white" />

            <span>Infrastructure solutions</span>

            <span className="h-1 w-1 rounded-full bg-white" />

            <span>Expert support</span>
          </div>
        </div>
      </section>
    </div>
  );
}
