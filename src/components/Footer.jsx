import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span>⚡</span> NexLap<span className="footer-accent">.</span>
            </Link>
            <p className="footer-tagline">Sri Lanka's premium laptop destination. Curated for performance, priced for you.</p>
            <div className="footer-socials">
              {["Facebook", "Instagram", "YouTube", "Twitter"].map((s) => (
                <a key={s} href="#" className="social-link">{s[0]}</a>
              ))}
            </div>
          </div>

          <div className="footer-links-group">
            <h4>Shop</h4>
            <Link to="/?filter=gaming">Gaming Laptops</Link>
            <Link to="/?filter=business">Business</Link>
            <Link to="/?filter=creator">Creator</Link>
            <Link to="/?filter=preowned">Pre Owned</Link>
            <Link to="/?filter=accessories">Accessories</Link>
          </div>

          <div className="footer-links-group">
            <h4>Brands</h4>
            {["Apple", "Dell", "ASUS", "Lenovo", "HP", "MSI"].map((b) => (
              <Link key={b} to={`/?brand=${b}`}>{b}</Link>
            ))}
          </div>

          <div className="footer-links-group">
            <h4>Support</h4>
            <a href="#">Track Order</a>
            <a href="#">Warranty</a>
            <a href="#">Returns</a>
            <a href="#">Contact Us</a>
            <a href="#">FAQ</a>
          </div>

          <div className="footer-links-group">
            <h4>Contact</h4>
            <p className="footer-contact-item">📍 Negombo, Western Province</p>
            <p className="footer-contact-item">📞 +94 31 222 0000</p>
            <p className="footer-contact-item">✉️ hello@nexlap.lk</p>
            <p className="footer-contact-item">⏰ Mon–Sat 9am–7pm</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 NexLap. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
