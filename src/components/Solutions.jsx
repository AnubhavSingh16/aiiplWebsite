import { useState } from "react";

const solutions = [
  {
    eyebrow: "AI & Deep Learning",
    title: "Accelerate your deep learning initiatives",
    desc: "Advanced Deep Learning Workstations and NVIDIA GPU-powered servers engineered for the world's most demanding AI workflows.",
    badge: "NVIDIA GPU Powered",
    visual: (
      <div className="flex items-end gap-1.5 flex-wrap">
        {[32, 22, 40, 28, 36, 20, 44, 26].map((h, i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: h,
              background: "#3b82f6",
              borderRadius: 3,
              opacity: 0.4 + i * 0.07,
              animation: `pulseBar 1.5s ease-in-out ${i * 0.15}s infinite`,
            }}
          />
        ))}
      </div>
    ),
    cards: [
      { icon: "🧠", label: "AI / ML", title: "Deep Learning Workstations", desc: "GPU-accelerated rigs built for training, inference, and model fine-tuning at scale.", style: "blue" },
      { icon: "⚡", label: "Performance", title: "NVIDIA GPU Servers", desc: "Rack-mount servers with the latest NVIDIA accelerators for cluster-scale workloads.", style: "white" },
      { icon: "🔬", label: "Research", title: "Model Training at Scale", desc: "Purpose-built to handle billion-parameter training runs with maximum throughput.", style: "white" },
      { icon: "🤖", label: "Inference", title: "Real-Time AI Inference", desc: "Low-latency inference systems that serve your models at production speed.", style: "gradient" },
    ],
  },
  {
    eyebrow: "Content Creation",
    title: "An unrivalled solution for creative professionals",
    desc: "Purpose-built for demanding 4K and 8K video editing projects — giving creatives the horsepower to work without limits.",
    badge: "4K & 8K Ready",
    visual: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        <rect x="10" y="10" width="160" height="60" rx="8" fill="#1e293b" />
        <rect x="20" y="20" width="80" height="40" rx="4" fill="#334155" />
        <circle cx="140" cy="40" r="18" fill="#3b82f6" fillOpacity="0.2" />
        <circle cx="140" cy="40" r="10" fill="#3b82f6" fillOpacity="0.5" />
        <circle cx="140" cy="40" r="4" fill="#3b82f6" />
      </svg>
    ),
    cards: [
      { icon: "🎬", label: "Video", title: "8K Non-Linear Editing", desc: "Real-time 8K playback without proxies — for editors who refuse to slow down.", style: "blue" },
      { icon: "🎨", label: "Design", title: "GPU-Accelerated Rendering", desc: "Slash render times with NVIDIA CUDA — get work out the door faster.", style: "white" },
      { icon: "🎵", label: "Audio", title: "DAW & Post Production", desc: "Zero-latency audio I/O and massive multi-core CPU power for complex sessions.", style: "white" },
      { icon: "📡", label: "Live", title: "Live Streaming Workstations", desc: "Stream at broadcast quality with dedicated encode and network throughput.", style: "gradient" },
    ],
  },
  {
    eyebrow: "Engineering",
    title: "Engineered for uncompromising performance",
    desc: "Workstations built to meet the most demanding needs of engineering professionals running complex simulations and designs.",
    badge: "ECC RAM Supported",
    visual: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        <polygon points="90,10 150,45 90,70 30,45" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" />
        <circle cx="90" cy="40" r="14" fill="#1e3a5f" />
        <circle cx="90" cy="40" r="6" fill="#3b82f6" />
        <line x1="30" y1="45" x2="90" y2="40" stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
        <line x1="150" y1="45" x2="90" y2="40" stroke="#3b82f6" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
    cards: [
      { icon: "⚙️", label: "CAD", title: "CAD & 3D Modelling", desc: "Workstation-class GPUs with certified drivers for SolidWorks, Catia, and ANSYS.", style: "blue" },
      { icon: "🌊", label: "CFD", title: "Fluid Dynamics Simulation", desc: "Multi-node setups that cut CFD solve times from days to hours.", style: "white" },
      { icon: "🏗️", label: "FEA", title: "Finite Element Analysis", desc: "Massive RAM configurations for large-assembly structural simulations.", style: "white" },
      { icon: "🔭", label: "HPC", title: "High-Performance Clusters", desc: "Rack solutions for compute-intensive scientific and engineering HPC workloads.", style: "gradient" },
    ],
  },
  {
    eyebrow: "Trading",
    title: "Precision performance for real-time markets",
    desc: "Specifically designed for traders who demand microsecond latency, multi-monitor setups, and always-on reliability.",
    badge: "Ultra-Low Latency",
    visual: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        <polyline points="10,65 40,45 70,52 100,25 130,35 160,10" fill="none" stroke="#22c55e" strokeWidth="2" />
        <circle cx="160" cy="10" r="4" fill="#22c55e" />
      </svg>
    ),
    cards: [
      { icon: "📈", label: "Live Data", title: "Real-Time Market Analysis", desc: "Sub-millisecond tick-to-trade systems for high-frequency strategy execution.", style: "blue" },
      { icon: "🖥️", label: "Display", title: "Multi-Monitor Trading Desks", desc: "Drive 8+ ultra-wide monitors from a single whisper-quiet workstation.", style: "white" },
      { icon: "🔒", label: "Uptime", title: "Redundant Power Systems", desc: "Dual PSU and ECC memory ensure zero unplanned downtime during market hours.", style: "white" },
      { icon: "⚡", label: "Speed", title: "Kernel Bypass Networking", desc: "RDMA-capable NICs for lowest-possible network latency in co-location environments.", style: "gradient" },
    ],
  },
  {
    eyebrow: "Gaming",
    title: "The ultimate choice for gamers",
    desc: "From budget builds to flagship 8K gaming PCs — every rig is optimised for immersive, tear-free, high-framerate gaming.",
    badge: "Up to 8K 240Hz",
    visual: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        <rect x="30" y="20" width="120" height="40" rx="20" fill="#1e293b" />
        <circle cx="60" cy="40" r="10" fill="none" stroke="#3b82f6" strokeWidth="1.5" />
        <line x1="55" y1="40" x2="65" y2="40" stroke="#3b82f6" strokeWidth="1.5" />
        <line x1="60" y1="35" x2="60" y2="45" stroke="#3b82f6" strokeWidth="1.5" />
        <circle cx="120" cy="36" r="3" fill="#ef4444" />
        <circle cx="130" cy="40" r="3" fill="#3b82f6" />
        <circle cx="120" cy="44" r="3" fill="#22c55e" />
        <circle cx="110" cy="40" r="3" fill="#f59e0b" />
      </svg>
    ),
    cards: [
      { icon: "🎮", label: "Flagship", title: "8K Flagship Gaming PCs", desc: "RTX 5090-powered builds for the absolute best 4K and 8K gaming experience.", style: "blue" },
      { icon: "💰", label: "Budget", title: "Best-Value Gaming Rigs", desc: "High-performance 1080p and 1440p builds that don't break the bank.", style: "white" },
      { icon: "❄️", label: "Cooling", title: "Custom Liquid Cooling", desc: "Open-loop and AIO liquid cooling solutions for sustained peak performance.", style: "white" },
      { icon: "🌐", label: "Online", title: "Esports-Ready Systems", desc: "Ultra-low latency builds designed for competitive online play at 360fps+.", style: "gradient" },
    ],
  },
  {
    eyebrow: "Storage Server",
    title: "Purpose-built for enterprise storage",
    desc: "Delivering superior performance for high-demand applications and the most intensive enterprise storage workloads.",
    badge: "NVMe All-Flash Ready",
    visual: (
      <svg width="180" height="80" viewBox="0 0 180 80">
        {[15, 33, 51].map((y, i) => (
          <g key={i}>
            <rect x="10" y={y} width="160" height="14" rx="4" fill="#1e293b" />
            {[14, 26, 38].map((x, j) => (
              <rect key={j} x={x} y={y + 4} width="8" height="6" rx="1"
                fill={["#3b82f6", "#22c55e", "#f59e0b"][i]}
                fillOpacity={0.5 + j * 0.15}
              />
            ))}
          </g>
        ))}
      </svg>
    ),
    cards: [
      { icon: "💾", label: "NVMe", title: "All-Flash NVMe Arrays", desc: "Millions of IOPS with NVMe-oF for the lowest storage latency possible.", style: "blue" },
      { icon: "🗄️", label: "Scale-Out", title: "Petabyte-Scale Storage", desc: "Grow from terabytes to petabytes with no-downtime horizontal scaling.", style: "white" },
      { icon: "🔄", label: "Backup", title: "Backup & Disaster Recovery", desc: "Automated snapshot replication with instant failover for business continuity.", style: "white" },
      { icon: "🌐", label: "Network", title: "High-Throughput Fabric", desc: "100GbE and InfiniBand interconnects for maximum storage network bandwidth.", style: "gradient" },
    ],
  },
];

const cardStyles = {
  blue: "bg-blue-50 border border-blue-100",
  white: "bg-white border border-slate-200",
  gradient: "bg-gradient-to-br from-white to-blue-50 border border-blue-100",
};

export default function SolutionsSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);

  const sol = solutions[active];

  const handleTab = (idx) => {
    if (idx === active || animating) return;
    setAnimating(true);
    setVisible(false);
    setTimeout(() => {
      setActive(idx);
      setVisible(true);
      setAnimating(false);
    }, 220);
  };

  return (
    <section className="px-6 py-20">
      <style>{`
        @keyframes pulseBar {
          0%, 100% { transform: scaleY(1); opacity: 0.6; }
          50% { transform: scaleY(1.35); opacity: 1; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        .sol-fade {
          transition: opacity 0.22s ease, transform 0.22s ease;
        }
        .sol-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .sol-hidden {
          opacity: 0;
          transform: translateY(10px);
        }
        .sol-card-hover {
          transition: transform 0.25s ease;
        }
        .sol-card-hover:hover {
          transform: translateY(-3px);
        }
        .sol-arrow {
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.2s, transform 0.2s;
        }
        .sol-card-hover:hover .sol-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        .sol-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          margin-right: 6px;
          vertical-align: middle;
          animation: blink 2s ease-in-out infinite;
        }
      `}</style>

      {/* Tabs */}
      <div className="mx-auto max-w-7xl mb-8 flex flex-wrap gap-2">
        {solutions.map((s, i) => (
          <button
            key={i}
            onClick={() => handleTab(i)}
            className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
              active === i
                ? "bg-slate-950 text-white border-slate-950"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-950 hover:text-white hover:border-slate-950"
            }`}
          >
            {s.eyebrow}
          </button>
        ))}
      </div>

      {/* Main grid */}
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">

        {/* Hero card */}
        <div className="rounded-[32px] bg-slate-950 p-10 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] flex flex-col">
          <div className={`sol-fade flex-1 ${visible ? "sol-visible" : "sol-hidden"}`}>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              {sol.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
              {sol.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              {sol.desc}
            </p>
          </div>

          {/* Visual area */}
          <div className={`sol-fade mt-8 rounded-2xl bg-slate-800/60 flex items-center justify-center p-6 min-h-[140px] relative ${visible ? "sol-visible" : "sol-hidden"}`}>
            {sol.visual}
            <span className="absolute bottom-3 left-3 flex items-center rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
              <span className="sol-dot" />
              {sol.badge}
            </span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {sol.cards.map((card, i) => (
            <div
              key={`${active}-${i}`}
              className={`sol-card-hover rounded-[28px] p-8 flex flex-col gap-2 ${cardStyles[card.style]}`}
              style={{
                animation: visible ? `fadeUp 0.35s ease ${i * 0.07}s both` : "none",
              }}
            >
              <style>{`
                @keyframes fadeUp {
                  from { opacity: 0; transform: translateY(14px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              <div className="text-3xl mb-1">{card.icon}</div>
              <div className="text-sm font-medium text-blue-700">{card.label}</div>
              <div className="text-2xl font-semibold text-slate-900">{card.title}</div>
              <p className="text-sm leading-7 text-slate-600">{card.desc}</p>
              <div className="sol-arrow mt-auto text-sm font-medium text-blue-600">
                Explore →
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}