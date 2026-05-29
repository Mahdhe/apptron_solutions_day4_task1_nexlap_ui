import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import BackgroundVideo from "./BackgroundVideo";
import "./Hero.css";

const FloatingLaptop = ({ src, style, delay = 0 }) => (
  <motion.div
    className="floating-laptop"
    style={style}
    animate={{ y: [0, -18, 0], rotate: [0, 1, -1, 0] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
  >
    <img src={src} alt="laptop" />
  </motion.div>
);

const Particle = ({ style }) => (
  <motion.div
    className="particle"
    style={style}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
    transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 3 }}
  />
);

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${2 + Math.random() * 4}px`,
      height: `${2 + Math.random() * 4}px`,
      background: i % 3 === 0 ? "#6366f1" : i % 3 === 1 ? "#a78bfa" : "#38bdf8",
      borderRadius: "50%",
    },
  }));

  return (
    <section className="hero">
      <BackgroundVideo /> 
      <div className="hero-video-overlay" />
      
      <div className="hero-bg">
        <div className="hero-gradient-orb orb1" />
        <div className="hero-gradient-orb orb2" />
        <div className="hero-gradient-orb orb3" />
        <div className="hero-grid" />
        {particles.map((p) => <Particle key={p.id} style={p.style} />)}
      </div>

      <motion.div className="hero-content" style={{ y: y1, opacity }}>
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="hero-badge-dot" />
          Sri Lanka's #1 Laptop Store
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Power Your
          <span className="hero-title-gradient"> Ambition</span>
          <br />with Every Click.
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Discover premium laptops from top brands — Apple, Dell, ASUS, Lenovo & more.
          Best prices guaranteed with island-wide delivery.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <Link to="/#products" className="btn-primary">
            Shop Now
            <span className="btn-arrow">→</span>
          </Link>
          <Link to="/?filter=gaming" className="btn-secondary">
            Gaming Laptops
          </Link>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {[
            { value: "500+", label: "Products" },
            { value: "12K+", label: "Happy Customers" },
            { value: "15+", label: "Top Brands" },
            { value: "24/7", label: "Support" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="hero-stat"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            >
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visuals"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        <FloatingLaptop
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80"
          style={{ zIndex: 3 }}
          delay={0}
        />
        <FloatingLaptop
          src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80"
          style={{ zIndex: 2 }}
          delay={1.2}
        />

        <div className="hero-glow-ring" />
      </motion.div>

      <motion.div
        className="hero-scroll-hint"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>Scroll</span>
        <span className="scroll-arrow">↓</span>
      </motion.div>
    </section>
  );
}
