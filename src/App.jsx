import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import ProductDetails from "./Pages/ProductDetails";
import Products from "./Pages/Products";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
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
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </>
      </Router>
    </CartProvider>
  );
}

export default App;
