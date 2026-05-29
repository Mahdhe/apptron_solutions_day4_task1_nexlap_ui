import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/products";
import "./ProductCard.css";

export default function ProductCard({ product, index = 0 }) {
  const { addItem, items } = useCart();
  const [added, setAdded] = useState(false);
  const inCart = items.some((i) => i.id === product.id);
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      className="product-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <Link to={`/product/${product.id}`} className="card-link">
        <div className="card-image-wrapper">
          <img
            src={product.image}
            alt={product.name}
            className="card-image"
            loading="lazy"
          />
          {product.badge && (
            <span className={`card-badge badge-${product.badge.toLowerCase().replace(" ", "-")}`}>
              {product.badge}
            </span>
          )}
          {!product.inStock && <div className="card-out-of-stock">Out of Stock</div>}
          {discount > 0 && (
            <span className="card-discount">-{discount}%</span>
          )}
        </div>

        <div className="card-body">
          <div className="card-brand">{product.brand}</div>
          <h3 className="card-name">{product.name}</h3>

          <div className="card-specs-preview">
            <span>{product.specs.processor.split(" ").slice(0, 3).join(" ")}</span>
            <span>·</span>
            <span>{product.specs.ram}</span>
            <span>·</span>
            <span>{product.specs.storage}</span>
          </div>

          <div className="card-rating">
            <div className="stars">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "star filled" : "star"}>★</span>
              ))}
            </div>
            <span className="review-count">({product.reviews})</span>
          </div>

          <div className="card-footer">
            <div className="card-pricing">
              <span className="card-price">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="card-original">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <motion.button
              className={`card-add-btn ${added ? "added" : ""} ${!product.inStock ? "disabled" : ""}`}
              onClick={handleAdd}
              disabled={!product.inStock}
              whileTap={{ scale: 0.92 }}
            >
              {added ? "✓ Added" : inCart ? "In Cart" : "+ Cart"}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
