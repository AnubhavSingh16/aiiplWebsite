import { ArrowUpRight } from "lucide-react";
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
    <section className="relative overflow-hidden px-5 py-16 sm:px-6 lg:py-20">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-40 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-400/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div className="max-w-2xl">

            {/* <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Solutions
            </div> */}

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-[#071A3A] sm:text-4xl">
              Built for the way
              <span className="text-blue-600"> you work.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              From AI and engineering to gaming and enterprise storage,
              find purpose-built systems for demanding workloads.
            </p>

          </div>

          <Link
            to="/contact"
            className="
              inline-flex
              items-center
              gap-2
              self-start
              rounded-full
              border
              border-blue-200
              bg-white
              px-4
              py-2.5
              text-xs
              font-semibold
              text-blue-700
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-blue-300
              hover:bg-blue-50
              lg:self-auto
            "
          >
            Discuss your requirements
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>

        </div>


        {/* ================= SOLUTION GRID ================= */}

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

          {solutions.map((solution, index) => (
            <Link
              key={solution.title}
              to="/contact"
              className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.05)] transition-all duration-400 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)]"
            >

              {/* ================= IMAGE ================= */}

              <div className="relative h-[220px] overflow-hidden">

                <img
                  src={solution.image}
                  alt={solution.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A3A]/90 via-[#071A3A]/15 to-transparent" />

                {/* Accent glow */}
                <div
                  className={`absolute -bottom-10 left-1/2 h-28 w-40 -translate-x-1/2 rounded-full bg-gradient-to-r ${solution.accent} opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60`}
                />

                {/* Number */}
                {/* <span className="absolute right-4 top-4 text-3xl font-bold tracking-[-0.06em] text-white/30">
                  0{index + 1}
                </span> */}

                {/* Solution badge */}
                {/* <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-md">
                    Solution
                  </span>
                </div> */}

                {/* Image title */}
                <div className="absolute bottom-4 left-5 right-5">

                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    {solution.title}
                  </h3>

                </div>

              </div>


              {/* ================= CONTENT ================= */}

              <div className="p-5">

                <p className="line-clamp-2 text-sm leading-6 text-slate-500">
                  {solution.description}
                </p>


                {/* Bottom action */}
                <div className="mt-5 flex items-center justify-between">

                  <span className="text-xs font-semibold text-blue-600">
                    Explore solution
                  </span>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-slate-200
                      text-slate-400
                      transition-all
                      duration-300
                      group-hover:border-blue-200
                      group-hover:bg-blue-600
                      group-hover:text-white
                    "
                  >
                    <ArrowUpRight
                      className="
                        h-3.5
                        w-3.5
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </span>

                </div>

              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
}