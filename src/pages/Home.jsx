import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { products, brands, categories } from "../utils/products";
import "./Home.css";

export default function Home() {
  const [searchParams] = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const productsRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 600, once: true, offset: 60 });
  }, []);

  useEffect(() => {
    const search = searchParams.get("search");
    const brand = searchParams.get("brand");
    if (brand) setSelectedBrand(brand);
    if (search) {
      productsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [searchParams]);

  const searchQuery = searchParams.get("search") || "";

  const filtered = products
    .filter((p) => {
      const matchBrand = selectedBrand === "All" || p.brand === selectedBrand;
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="home">
      <Hero />

      <section className="brands-bar" data-aos="fade-up">
        <div className="brands-container">
          <p className="brands-label">Top Brands</p>
          <div className="brands-scroll">
            {["Apple", "Dell", "ASUS", "Lenovo", "HP", "MSI", "Razer", "Samsung"].map((b) => (
              <button
                key={b}
                className={`brand-pill ${selectedBrand === b ? "active" : ""}`}
                onClick={() => { setSelectedBrand(b === selectedBrand ? "All" : b); productsRef.current?.scrollIntoView({ behavior: "smooth" }); }}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="products-section" id="products" ref={productsRef}>
        <div className="products-container">
          <div className="section-header" data-aos="fade-up">
            <div>
              <h2 className="section-title">
                {searchQuery ? `Results for "${searchQuery}"` : "Our Laptops"}
              </h2>
              <p className="section-subtitle">{filtered.length} products found</p>
            </div>
            <div className="section-controls">
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          <div className="filter-tabs" data-aos="fade-up" data-aos-delay="100">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="no-results" data-aos="fade-up">
              <span>🔍</span>
              <h3>No laptops found</h3>
              <p>Try adjusting your filters</p>
              <button onClick={() => { setSelectedBrand("All"); setSelectedCategory("All"); }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="promo-banner">
        <div className="promo-container">
          <div className="promo-card promo-gaming"data-aos="flip-left" data-aos-duration="800">
            <div className="promo-content">
              <span className="promo-tag">🎮 Gaming</span>
              <h3>Unleash Your Gaming Power</h3>
              <p>RTX 4090, 360Hz displays, extreme cooling</p>
              <button onClick={() => { setSelectedCategory("Gaming"); productsRef.current?.scrollIntoView({ behavior: "smooth" }); }} className="promo-btn">Shop Gaming</button>
            </div>
          </div>
          <div className="promo-card promo-business"data-aos="flip-right" data-aos-duration="800">
            <div className="promo-content">
              <span className="promo-tag">💼 Business</span>
              <h3>Work Smarter, Not Harder</h3>
              <p>Lightweight builds, all-day battery life</p>
              <button onClick={() => { setSelectedCategory("Business"); productsRef.current?.scrollIntoView({ behavior: "smooth" }); }} className="promo-btn">Shop Business</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
