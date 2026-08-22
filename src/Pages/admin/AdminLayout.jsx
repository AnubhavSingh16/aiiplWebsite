import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Image,
  LayoutDashboard,
  LogOut,
  Mail,
  Package,
  Server,
  Tag,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { name: "Dashboard", link: "/admin", icon: LayoutDashboard, end: true },
    { name: "Enquiries", link: "/admin/enquiries", icon: Mail },

  { name: "Products", link: "/admin/products", icon: Package },
  { name: "Categories", link: "/admin/categories", icon: Tag },
  { name: "Banners", link: "/admin/banners", icon: Image },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-900">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col border-r border-blue-100 bg-white px-5 py-6 md:flex">
          <Link to="/admin" className="flex items-center gap-3 px-1">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-400 text-white shadow-lg shadow-blue-200">
              <Server className="h-5 w-5" />
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight text-slate-900">
                AIIPL Admin
              </div>
              <div className="text-xs text-slate-500">Product dashboard</div>
            </div>
          </Link>

          <nav className="mt-10 flex flex-1 flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.name}
                  to={item.link}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          <div className="space-y-1.5">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              View storefront
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <header className="flex items-center justify-between border-b border-blue-100 bg-white px-6 py-4 md:hidden">
            <div className="text-base font-semibold text-slate-900">AIPL Admin</div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </header>

          <main className="px-6 py-8 md:px-10 md:py-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
