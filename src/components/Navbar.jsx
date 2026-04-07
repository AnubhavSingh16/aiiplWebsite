import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Server, ShoppingCart, X } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Build PC", link: "/build-pc" },
    // { name: "Services", link: "/services" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-blue-100 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 text-white shadow-lg shadow-blue-200">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-slate-900">AIPL</div>
            <div className="text-xs text-slate-500">Modern Infrastructure Solutions</div>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.link}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-blue-700" : "text-slate-600 hover:text-blue-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/build-pc"
            className="rounded-full border border-emerald-100 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
          >
            Build Your PC
          </Link>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            {totalItems > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
            Get Started
          </button>
        </div>

        <button
          className="rounded-xl border border-blue-100 bg-white p-2 text-slate-700 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-blue-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive ? "text-blue-700" : "text-slate-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link
              to="/build-pc"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-full border border-emerald-100 px-4 py-2 text-center text-sm font-medium text-slate-700"
            >
              Build Your PC
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-100 px-4 py-2 text-sm font-medium text-slate-700"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
              {totalItems > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
