import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import About from "./Pages/About";
import BuildPc from "./Pages/BuildPc";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Products from "./Pages/Products";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Profile from "./Pages/Profile";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminLayout from "./Pages/admin/AdminLayout";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AdminProducts from "./Pages/admin/AdminProducts";
import AdminProductForm from "./Pages/admin/AdminProductForm";
import AdminCategories from "./Pages/admin/AdminCategories";
import AdminEnquiries from "./Pages/admin/AdminEnquiries";
import AdminBanners from "./Pages/admin/AdminBanners";
import AdminBannerForm from "./Pages/admin/AdminBannerForm";

function SiteFooter() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <Footer />;
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
            <>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/build-pc" element={<BuildPc />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="products/new" element={<AdminProductForm />} />
                  <Route
                    path="products/:id/edit"
                    element={<AdminProductForm />}
                  />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="banners" element={<AdminBanners />} />
                  <Route path="banners/new" element={<AdminBannerForm />} />
                  <Route path="banners/:id/edit" element={<AdminBannerForm />} />
                  <Route path="enquiries" element={<AdminEnquiries />} />
                </Route>
              </Routes>
              <SiteFooter />
            </>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
