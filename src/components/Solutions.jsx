import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  {
    title: "AI & Deep Learning",
    description:
      "GPU-powered workstations and servers built for model training, inference, and demanding AI workflows.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    accent: "from-blue-600 to-cyan-400",
  },
  {
    title: "Content Creation",
    description:
      "High-performance systems for 4K and 8K editing, rendering, animation, and creative studio pipelines.",
    image:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=80",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    title: "Engineering Workstations",
    description:
      "Purpose-built PCs for CAD, simulation, 3D design, FEA, and professional technical workloads.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    accent: "from-emerald-500 to-teal-400",
  },
  {
    title: "Gaming & Streaming",
    description:
      "Custom gaming rigs and streaming systems designed for high frame rates, cooling, and immersive setups.",
    image:
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=1200&q=80",
    accent: "from-amber-500 to-orange-500",
  },
  {
    title: "Storage Servers",
    description:
      "Reliable enterprise storage solutions for backup, fast access, business continuity, and scale.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    accent: "from-indigo-500 to-sky-500",
  },
  {
    title: "Trading Systems",
    description:
      "Low-latency, multi-monitor, always-on setups for real-time trading and market analysis environments.",
    image:
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1200&q=80",
    accent: "from-rose-500 to-red-500",
  },
];

export default function SolutionsSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
            Solutions We Provide
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
            Simple, colorful solutions for different performance needs.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            These are the main solution areas we support, from creative and engineering
            systems to gaming, AI, storage, and business-focused infrastructure.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution) => (
            <article
              key={solution.title}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(37,99,235,0.12)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className={`absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t ${solution.accent} opacity-70`} />
              </div>

              <div className="p-6">
                <div className={`inline-flex rounded-full bg-gradient-to-r ${solution.accent} px-3 py-1 text-xs font-semibold text-white`}>
                  Solution
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">
                  {solution.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {solution.description}
                </p>

               <Link
  to="/contact"
  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
>
  Learn more
  <ArrowRight className="h-4 w-4" />
</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
