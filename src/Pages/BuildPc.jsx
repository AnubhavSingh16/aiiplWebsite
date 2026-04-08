import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Cpu,
  Gauge,
  HardDrive,
  MemoryStick,
  Monitor,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

const formatPrice = (value) => `Rs. ${value}`;

const buildCategories = [
  {
    key: "processor",
    label: "Processor",
    icon: Cpu,
    accent: "from-cyan-400 to-blue-500",
    subtitle: "Choose the brain of your setup",
    options: [
      { id: "intel-i5", name: "Intel Core i5 14600K", price: 320, tag: "Balanced" },
      { id: "intel-i7", name: "Intel Core i7 14700K", price: 430, tag: "Creator" },
      { id: "ryzen-7", name: "AMD Ryzen 7 7800X3D", price: 470, tag: "Gaming" },
    ],
  },
  {
    key: "graphics",
    label: "Graphics Card",
    icon: Gauge,
    accent: "from-fuchsia-400 to-violet-500",
    subtitle: "Visual power and gaming performance",
    options: [
      { id: "rtx-4060", name: "NVIDIA RTX 4060 Ti", price: 420, tag: "Smooth 1080p" },
      { id: "rtx-4070", name: "NVIDIA RTX 4070 Super", price: 650, tag: "High FPS" },
      { id: "rx-7800", name: "AMD RX 7800 XT", price: 590, tag: "Value Power" },
    ],
  },
  {
    key: "memory",
    label: "Memory",
    icon: MemoryStick,
    accent: "from-emerald-400 to-teal-500",
    subtitle: "Capacity for multitasking and speed",
    options: [
      { id: "16gb", name: "16GB DDR5 RGB Kit", price: 110, tag: "Starter" },
      { id: "32gb", name: "32GB DDR5 Performance Kit", price: 190, tag: "Recommended" },
      { id: "64gb", name: "64GB DDR5 Pro Kit", price: 340, tag: "Workstation" },
    ],
  },
  {
    key: "storage",
    label: "Storage",
    icon: HardDrive,
    accent: "from-amber-400 to-orange-500",
    subtitle: "Fast SSD options for work and play",
    options: [
      { id: "1tb", name: "1TB NVMe Gen4 SSD", price: 120, tag: "Fast Boot" },
      { id: "2tb", name: "2TB NVMe Gen4 SSD", price: 210, tag: "Most Popular" },
      { id: "4tb", name: "4TB NVMe Gen4 SSD", price: 390, tag: "Massive Space" },
    ],
  },
  {
    key: "cooling",
    label: "Cooling",
    icon: ShieldCheck,
    accent: "from-sky-400 to-indigo-500",
    subtitle: "Keep performance stable under load",
    options: [
      { id: "air", name: "Dual Tower Air Cooler", price: 85, tag: "Reliable" },
      { id: "aio240", name: "240mm Liquid Cooler", price: 160, tag: "Quiet RGB" },
      { id: "aio360", name: "360mm Liquid Cooler", price: 230, tag: "Max Cooling" },
    ],
  },
  {
    key: "display",
    label: "Display",
    icon: Monitor,
    accent: "from-rose-400 to-pink-500",
    subtitle: "Match your build with the right screen",
    options: [
      { id: "24fhd", name: "24 inch 180Hz FHD Monitor", price: 190, tag: "Esports" },
      { id: "27qhd", name: "27 inch 240Hz QHD Monitor", price: 390, tag: "Immersive" },
      { id: "34uw", name: "34 inch Ultrawide Display", price: 620, tag: "Creator" },
    ],
  },
];

export default function BuildPc() {
  const { addBuildToCart } = useCart();
  const [selectedParts, setSelectedParts] = useState({});
  const [openCategory, setOpenCategory] = useState(buildCategories[0].key);
  const [buildSaved, setBuildSaved] = useState(false);

  const selectedEntries = useMemo(
    () =>
      buildCategories
        .map((category) => ({
          ...category,
          selected: category.options.find((option) => option.id === selectedParts[category.key]),
        }))
        .filter((category) => category.selected),
    [selectedParts]
  );

  const totalPrice = selectedEntries.reduce(
    (total, category) => total + category.selected.price,
    0
  );

  const completion = Math.round((selectedEntries.length / buildCategories.length) * 100);

  const togglePart = (categoryKey, optionId) => {
    setSelectedParts((current) => ({
      ...current,
      [categoryKey]: current[categoryKey] === optionId ? undefined : optionId,
    }));
    setBuildSaved(false);
  };

  const handleSaveBuild = () => {
    if (!selectedEntries.length) {
      return;
    }

    addBuildToCart({
      name: `Custom Build ${new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      })}`,
        items: selectedEntries.map((entry) => ({
        id: `build-${entry.key}-${entry.selected.id}`,
        name: entry.selected.name,
        category: "Custom PC Build",
        type: entry.label,
        description: `${entry.label} selected for your saved custom PC build.`,
        price: entry.selected.price,
        priceLabel: `${formatPrice(entry.selected.price)}/mo`,
        image:
          "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=900&q=80",
        buildCategory: entry.label,
      })),
    });

    setBuildSaved(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#152670] to-[#000a1d] text-white">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.16),_transparent_20%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_24%),radial-gradient(circle_at_50%_30%,_rgba(168,85,247,0.14),_transparent_22%),linear-gradient(180deg,_#040814_0%,_#081120_38%,_#0a1630_100%)]" />
      <div className="absolute inset-x-0 top-24 -z-10 mx-auto h-[520px] max-w-7xl rounded-[48px] bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.12),_transparent_40%)] blur-3xl" />

      <Navbar />

      <section className="px-6 pb-16 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-emerald-300 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Custom PC Builder
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Design a custom PC with richer controls and a cleaner live build preview.
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                Select hardware category by category in a cleaner dropdown flow and watch
                the machine assemble in a more structured animated builder panel.
              </p>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/6 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                    Build Status
                  </div>
                  <div className="mt-2 text-4xl font-semibold text-white">{completion}%</div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-emerald-400/25 to-sky-400/20 p-3 text-emerald-300">
                  <Wrench className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-500 transition-all duration-700"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                <span>{selectedEntries.length} of {buildCategories.length} categories configured</span>
                <span className="font-semibold text-white">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_440px]">
            <div className="space-y-5">
              {buildCategories.map((category) => {
                const Icon = category.icon;
                const selected = selectedEntries.find((entry) => entry.key === category.key)?.selected;
                const isOpen = openCategory === category.key;

                return (
                  <section
                    key={category.key}
                    className="overflow-hidden rounded-[28px] border border-white/10 bg-white/6 shadow-[0_18px_44px_rgba(0,0,0,0.22)] backdrop-blur"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenCategory(isOpen ? "" : category.key)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`rounded-2xl bg-gradient-to-br ${category.accent} p-3 text-white shadow-lg`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-white">{category.label}</div>
                          <div className="mt-1 text-sm text-slate-400">
                            {selected ? selected.name : category.subtitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {selected && (
                          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                            {formatPrice(selected.price)}
                          </span>
                        )}
                        <ChevronDown
                          className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-white/8 px-6 pb-6 pt-5">
                        <div className="grid gap-3 md:grid-cols-3">
                          {category.options.map((option) => {
                            const active = selected?.id === option.id;

                            return (
                              <button
                                key={option.id}
                                type="button"
                                onClick={() => togglePart(category.key, option.id)}
                                className={`rounded-[22px] border p-4 text-left transition duration-300 ${
                                  active
                                    ? "border-sky-400/40 bg-sky-400/12 shadow-[0_14px_30px_rgba(14,165,233,0.14)]"
                                    : "border-white/10 bg-white/4 hover:-translate-y-0.5 hover:border-sky-400/20 hover:bg-white/8"
                                }`}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="text-sm font-semibold text-white">{option.name}</div>
                                  {active && <CheckCircle2 className="h-5 w-5 text-sky-300" />}
                                </div>
                                <div className="mt-3 inline-flex rounded-full border border-white/8 bg-white/8 px-3 py-1 text-[11px] font-semibold text-slate-300">
                                  {option.tag}
                                </div>
                                <div className="mt-4 text-lg font-semibold text-white">
                                  {formatPrice(option.price)}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>

            <aside className="sticky top-28 h-fit rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,_rgba(7,12,28,0.96)_0%,_rgba(10,16,35,0.98)_42%,_rgba(16,24,54,1)_100%)] p-6 text-white shadow-[0_28px_90px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
                    Live Assembly
                  </div>
                  <div className="mt-2 text-2xl font-semibold">Your Custom Rig</div>
                </div>
                <div className="rounded-2xl bg-white/8 p-3 text-fuchsia-300">
                  <Zap className="h-5 w-5" />
                </div>
              </div>

              <div className="relative mt-6 overflow-hidden rounded-[30px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.18),_transparent_38%),linear-gradient(180deg,_rgba(6,10,24,0.96)_0%,_rgba(11,18,36,0.98)_100%)] p-5">
                <div className="absolute inset-x-10 top-0 h-24 bg-gradient-to-b from-fuchsia-400/20 via-sky-400/18 to-transparent blur-2xl" />

                <div className="relative mx-auto w-full max-w-[300px] rounded-[34px] border border-white/10 bg-slate-950/85 px-5 pb-5 pt-6 shadow-[inset_0_0_50px_rgba(59,130,246,0.08)]">
                  <div className="h-2 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-500 transition-all duration-700"
                      style={{ width: `${completion}%` }}
                    />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {buildCategories.map((category, index) => {
                      const selected = selectedEntries.find((item) => item.key === category.key);
                      const Icon = category.icon;

                      return (
                        <div
                          key={category.key}
                          className={`min-h-[102px] rounded-[22px] border px-3 py-3 transition-all duration-500 ${
                            selected
                              ? "translate-y-0 border-sky-400/25 bg-gradient-to-br from-sky-400/14 to-fuchsia-400/10 opacity-100 shadow-[0_12px_30px_rgba(14,165,233,0.14)]"
                              : "translate-y-1 border-white/8 bg-white/4 opacity-55"
                          }`}
                          style={{ transitionDelay: `${index * 70}ms` }}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                              {category.label}
                            </span>
                            <Icon className={`h-4 w-4 ${selected ? "text-sky-300" : "text-slate-500"}`} />
                          </div>
                          <div className="mt-3 text-sm font-semibold leading-5 text-white">
                            {selected ? selected.selected.name : "Not added yet"}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 rounded-[24px] border border-white/8 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm text-slate-300">Assembly progress</span>
                      <span className="text-sm font-semibold text-white">{completion}%</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedEntries.map((entry, index) => (
                        <span
                          key={entry.key}
                          className="inline-flex animate-pulse items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold text-emerald-300"
                          style={{ animationDelay: `${index * 160}ms` }}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {entry.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-[24px] border border-white/8 bg-white/6 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-300">Estimated build total</span>
                  <span className="text-3xl font-semibold text-white">{formatPrice(totalPrice)}</span>
                </div>
                <div className="mt-2 text-sm text-slate-400">
                  Save this build to keep all selected parts together during checkout.
                </div>
              </div>

              {buildSaved && (
                <div className="mt-4 rounded-[22px] border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-300">
                  Your custom build has been saved to the cart as one grouped setup.
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Browse store
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={handleSaveBuild}
                  disabled={!selectedEntries.length}
                  className="rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Save this build
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
