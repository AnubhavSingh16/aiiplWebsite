import React from "react";

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
              className="group relative overflow-hidden rounded-[32px] border border-blue-100 bg-slate-950 text-white shadow-[0_20px_60px_rgba(37,99,235,0.14)]"
            >
              <img
                src={banner.image}
                alt={banner.title}
                className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
                  isSingleBanner ? "h-72 lg:h-[360px]" : "h-64"
                }`}
              />
              <div className="absolute inset-0 bg-[linear-gradient(110deg,_rgba(2,6,23,0.78)_0%,_rgba(2,6,23,0.4)_42%,_rgba(2,6,23,0.12)_100%)]" />
              <div className="absolute inset-0 flex items-end p-8">
                <div className="max-w-xl">
                  {banner.label && (
                    <div className="inline-flex rounded-full border border-white/20 bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                      {banner.label}
                    </div>
                  )}
                  <h3 className="mt-4 max-w-lg text-3xl font-semibold leading-tight text-white md:text-4xl">
                    {banner.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-white/82">
                    {banner.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
