import { useState, useEffect } from "react";
import { Menu, X, Server } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // ✅ Hardcoded nav items
  const navItems = [
    { name: "Home", link: "/", active: true },
    { name: "About", link: "/about" },
    { name: "Services", link: "/services" },
    { name: "Contact", link: "/contact" },
  ];

  // ✅ Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-blue-100 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 text-white shadow-lg shadow-blue-200">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">AIPL</div>
            <div className="text-xs text-slate-500">
              Modern Infrastructure Solutions
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
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

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-full border border-blue-100 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-700">
            View Services
          </button>
          <button className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="rounded-xl border border-blue-100 bg-white p-2 text-slate-700 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-blue-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
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
  );
}