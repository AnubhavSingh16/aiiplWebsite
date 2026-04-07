import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
  return (
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
          </Routes>
          <Footer />
        </>
      </Router>
    </CartProvider>
  );
}

export default App;
