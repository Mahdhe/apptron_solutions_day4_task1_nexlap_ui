import { useEffect } from "react";
import { motion } from "framer-motion";
import "./AboutUs.css";

const teamMembers = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    bio: "10+ years in the tech industry, passionate about making premium laptops accessible to everyone.",
    avatar: "AR",
  },
  {
    name: "Sarah Chen",
    role: "Head of Products",
    bio: "Former hardware engineer at leading OEMs. Curates every laptop in our catalog personally.",
    avatar: "SC",
  },
  {
    name: "Marcus Obi",
    role: "Customer Experience",
    bio: "Believes every customer deserves the perfect machine. Leads our support & advisory team.",
    avatar: "MO",
  },
];

const stats = [
  { value: "5,000+", label: "Happy Customers" },
  { value: "200+", label: "Laptop Models" },
  { value: "15+", label: "Top Brands" },
  { value: "4.9★", label: "Average Rating" },
];

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <motion.div
          className="about-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="about-tag">Our Story</span>
          <h1>
            Built for those who <span className="about-accent">demand more</span>
          </h1>
          <p>
            NexLap was founded with a single mission — to put the world's finest laptops
            in the hands of creators, professionals, and enthusiasts who refuse to settle.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="about-container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="about-mission">
        <div className="about-container mission-grid">
          <motion.div
            className="mission-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>Why NexLap?</h2>
            <p>
              We're not just a store. We're your tech partner. Every laptop we list goes
              through a rigorous evaluation by our in-house engineers — checking build
              quality, thermal performance, display accuracy, and real-world battery life.
            </p>
            <p>
              We stock only what we'd personally use. That's our promise to you.
            </p>
            <ul className="mission-list">
              <li>✦ Expert-curated catalog</li>
              <li>✦ Honest, jargon-free reviews</li>
              <li>✦ Fast islandwide delivery</li>
              <li>✦ 30-day hassle-free returns</li>
            </ul>
          </motion.div>
          <motion.div
            className="mission-visual"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mission-card">
              <span className="mission-icon">⚡</span>
              <h3>NexLap Promise</h3>
              <p>Every purchase backed by our quality guarantee and dedicated aftercare team.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="about-container">
          <h2 className="section-title">Meet the Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.name}
                className="team-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <div className="team-avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
