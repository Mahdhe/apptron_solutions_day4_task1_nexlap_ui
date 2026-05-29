import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../utils/products";
import "./Cart.css";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="empty-content"
        >
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any laptops yet.</p>
          <Link to="/" className="browse-btn">Browse Laptops</Link>
        </motion.div>
      </div>
    );
  }

  const tax = totalPrice * 0.1;
  const shipping = totalPrice > 100000 ? 0 : 1500;
  const grandTotal = totalPrice + tax + shipping;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <motion.div
          className="cart-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1 className="cart-title">Shopping Cart</h1>
            <p className="cart-count">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
          </div>
          <button className="clear-cart-btn" onClick={clearCart}>Clear All</button>
        </motion.div>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-items">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="cart-item"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30, height: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                >
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-brand">{item.brand}</div>
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-specs">
                      {item.specs.processor.split(" ").slice(0, 3).join(" ")} · {item.specs.ram} · {item.specs.storage}
                    </div>
                    <div className="cart-item-unit-price">{formatPrice(item.price)} each</div>
                  </div>

                  <div className="cart-item-controls">
                    <div className="quantity-control">
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >−</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>

                    <div className="cart-item-subtotal">
                      {formatPrice(item.price * item.quantity)}
                    </div>

                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      ✕ Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <motion.div
            className="cart-summary"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-lines">
              <div className="summary-line">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="summary-line">
                <span>VAT (10%)</span>
                <span>{formatPrice(Math.round(tax))}</span>
              </div>
              <div className="summary-line">
                <span>Shipping</span>
                <span className={shipping === 0 ? "free" : ""}>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="free-shipping-hint">
                  Add {formatPrice(100000 - totalPrice)} more for free shipping
                </p>
              )}
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>{formatPrice(Math.round(grandTotal))}</span>
            </div>

            <motion.button
              className="checkout-btn"
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.01 }}
            >
              Proceed to Checkout
            </motion.button>

            <Link to="/" className="continue-shopping">← Continue Shopping</Link>

            <div className="cart-security">
              <span>🔒 Secure Checkout</span>
              <span>💳 Multiple Payment Options</span>
              <span>📦 Free Returns</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
