import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, Server, ShoppingCart, X, User } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const { totalItems } = useCart();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Build PC", link: "/build-pc" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 10);
      setShowNavbar(currentScrollY < 24 || currentScrollY < lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
  className={`fixed left-0 right-0 top-0 z-50 overflow-hidden rounded-b-[32px] transition-all duration-300 ${
    showNavbar ? "translate-y-0" : "-translate-y-full"
  } ${
    scrolled
      ? "border-b border-blue-100 bg-white/85 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-xl"
      : "bg-transparent"
  }`}
>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/aiipl-logo.png"
            alt="AIIPL Logo"
            className="h-16 w-16 object-contain"
          />
          <div>
            <div className="text-lg font-semibold tracking-tight text-slate-900">
              Anubhav Infotech
            </div>
            <div className="text-xs text-slate-500">
              Modern Infrastructure Solutions
            </div>
          </div>
        </Link>
        <div
          className="
    absolute
    left-1/2
    top-2
    bottom-2
    hidden
    -translate-x-1/2
    items-center
    gap-8
    rounded-b-[24px]
    border-b-4
    border-[#669af3]
    px-10
    md:flex
  "
        >
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.link}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 "
                    : "text-slate-600 hover:text-blue-700"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {/* <Link
            to="/build-pc"
            className="rounded-full border border-blue-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-emerald-200 hover:text-emerald-700"
          >
            Build Your PC
          </Link> */}
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-gradient-to-r from-blue-600 to-sky-400 px-4 py-2.5 text-sm font-medium text-white transition hover:border-blue-200 hover:text-blue-100"
          >
            <ShoppingCart className="h-4 w-4" />
            Cart
            {totalItems > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-semibold text-blue-600">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            to="/profile"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-blue-200 hover:text-blue-700"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>

        <button
          className="rounded-xl border border-blue-100 bg-white p-2 text-slate-700 md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-blue-100 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col items-center gap-3 text-center">
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
              className="rounded-full border border-emerald-100 px-3.5 py-1.5 text-center text-xs font-medium text-slate-700"
            >
              Build Your PC
            </Link>
            <Link
              to="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-100 px-3.5 py-1.5 text-xs font-medium text-slate-700"
            >
              <ShoppingCart className="h-4 w-4" />
              Cart
              {totalItems > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-[11px] font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-700"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
