import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./hooks/useCart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<PlaceholderPage title="Login" />} />
              <Route path="/register" element={<PlaceholderPage title="Register" />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

function PlaceholderPage({ title }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", paddingTop: "70px" }}>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", color: "#fff" }}>{title}</h1>
      <p style={{ color: "rgba(255,255,255,0.4)" }}>This page is coming soon.</p>
      <a href="/" style={{ color: "#6366f1", textDecoration: "none" }}>← Back to Home</a>
    </div>
  );
}

export default App;