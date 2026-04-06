import React from "react";
import { ChevronRight } from "lucide-react";

export default function PromoBanners({
  eyebrow = "Promotions",
  title = "Featured banners",
  description = "Reusable promotional banners for spotlight offers, categories, or campaigns.",
  banners = [],
}) {
  const isSingleBanner = banners.length === 1;

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
            {title}
          </h2>
          {/* <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p> */}
        </div>

        <div className={`mt-10 grid gap-6 ${isSingleBanner ? "grid-cols-1" : "lg:grid-cols-2"}`}>
          {banners.map((banner) => (
            <article
              key={banner.id}
              className={`group relative overflow-hidden rounded-[32px] border border-blue-100 p-8 text-white shadow-[0_20px_60px_rgba(37,99,235,0.14)] ${banner.themeClass}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_35%)]" />
              <div
                className={`relative grid gap-8 ${
                  isSingleBanner
                    ? "lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
                    : "md:grid-cols-[1fr_220px] md:items-center"
                }`}
              >
                <div>
                  {banner.label && (
                    <div className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
                      {banner.label}
                    </div>
                  )}
                  <h3 className="mt-5 max-w-md text-3xl font-semibold leading-tight">
                    {banner.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-sm leading-7 text-white/85">
                    {banner.description}
                  </p>
                  <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition group-hover:bg-blue-50">
                    {banner.buttonLabel || "Explore now"}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="relative">
                  <div className="overflow-hidden rounded-[28px] border border-white/25 bg-white/15 backdrop-blur-sm">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                        isSingleBanner ? "h-72 lg:h-80" : "h-56"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
