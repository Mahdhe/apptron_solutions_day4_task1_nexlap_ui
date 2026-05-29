import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../hooks/useCart";
import { products, formatPrice } from "../utils/products";
import ProductCard from "../components/ProductCard";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, items } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("specs");

  const product = products.find((p) => p.id === Number(id));

  if (!product) return (
    <div className="not-found">
      <h2>Product not found</h2>
      <Link to="/">← Back to Home</Link>
    </div>
  );

  const inCart = items.some((i) => i.id === product.id);
  const related = products.filter((p) => p.id !== product.id && (p.brand === product.brand || p.category === product.category)).slice(0, 4);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="product-detail">
      <div className="detail-container">
        <motion.nav
          className="breadcrumb"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to={`/?filter=${product.category.toLowerCase()}`}>{product.category}</Link>
          <span>›</span>
          <span className="crumb-current">{product.name}</span>
        </motion.nav>

        <div className="detail-main">
          {/* LEFT — Images */}
          <motion.div
            className="detail-images"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                className="main-image-wrapper"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <img src={product.images[activeImage]} alt={product.name} className="main-image" />
                {product.badge && <span className={`detail-badge badge-${product.badge.toLowerCase().replace(" ", "-")}`}>{product.badge}</span>}
                {discount > 0 && <span className="detail-discount">-{discount}% OFF</span>}
              </motion.div>
            </AnimatePresence>

            <div className="thumbnail-row">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`thumbnail ${activeImage === i ? "active" : ""}`}
                  onClick={() => setActiveImage(i)}
                >
                  <img src={img} alt={`view ${i + 1}`} />
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Info */}
          <motion.div
            className="detail-info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="detail-brand">{product.brand}</div>
            <h1 className="detail-name">{product.name}</h1>

            <div className="detail-rating">
              <div className="stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>★</span>
                ))}
              </div>
              <span className="rating-score">{product.rating}</span>
              <span className="rating-count">({product.reviews} reviews)</span>
            </div>

            <div className="detail-price-block">
              <span className="detail-price">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="detail-original">{formatPrice(product.originalPrice)}</span>
              )}
              {discount > 0 && <span className="detail-save">You save {formatPrice(product.originalPrice - product.price)}</span>}
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="detail-specs-quick">
              {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                <div key={key} className="spec-chip">
                  <span className="spec-key">{key}</span>
                  <span className="spec-val">{val}</span>
                </div>
              ))}
            </div>

            <div className="detail-stock">
              <span className={`stock-dot ${product.inStock ? "in" : "out"}`} />
              <span className={product.inStock ? "in-stock" : "out-stock"}>
                {product.inStock ? "In Stock — Ready to Ship" : "Out of Stock"}
              </span>
            </div>

            <div className="detail-actions">
              <motion.button
                className={`add-to-cart-btn ${added ? "added" : ""} ${!product.inStock ? "disabled" : ""}`}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                whileTap={{ scale: 0.96 }}
              >
                {added ? "✓ Added to Cart!" : inCart ? "Add Another" : "Add to Cart"}
              </motion.button>
              <Link to="/cart" className="view-cart-btn">View Cart</Link>
            </div>

            <div className="detail-perks">
              {[
                { icon: "🚚", label: "Free island-wide delivery" },
                { icon: "🛡️", label: "1 Year warranty included" },
                { icon: "↩️", label: "7-day easy returns" },
                { icon: "💳", label: "EMI available" },
              ].map((p) => (
                <div key={p.label} className="perk-item">
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* TABS */}
        <div className="detail-tabs">
          <div className="tabs-nav">
            {["specs", "description", "reviews"].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="tab-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "specs" && (
                <div className="specs-table">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="spec-row">
                      <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      <span className="spec-value">{val}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "description" && (
                <div className="desc-content">
                  <p>{product.description}</p>
                  <p>Backed by NexLap's quality guarantee, this laptop comes with full manufacturer warranty and our in-store technical support team available 6 days a week.</p>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="reviews-placeholder">
                  <div className="big-rating">
                    <span>{product.rating}</span>
                    <div className="stars big">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>★</span>
                      ))}
                    </div>
                    <p>{product.reviews} verified reviews</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <div className="related-section">
            <h2 className="related-title">You Might Also Like</h2>
            <div className="related-grid">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
