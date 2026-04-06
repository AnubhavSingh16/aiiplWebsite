import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
    <Footer/>
    </>
  );
}

export default App;
