import { useState } from "react";
import { motion } from "framer-motion";
import "./ContactUs.css";

const contactInfo = [
  {
    icon: "📍",
    title: "Visit Us",
    lines: ["123 Tech Avenue, Colombo 03", "Western Province, Sri Lanka"],
  },
  {
    icon: "📞",
    title: "Call Us",
    lines: ["+94 11 234 5678", "Mon – Sat, 9 AM – 6 PM"],
  },
  {
    icon: "✉️",
    title: "Email Us",
    lines: ["hello@nexlap.lk", "support@nexlap.lk"],
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (field) => (ev) => {
    setForm((f) => ({ ...f, [field]: ev.target.value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <motion.div
          className="contact-hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="contact-tag">Get In Touch</span>
          <h1>We'd love to <span className="contact-accent">hear from you</span></h1>
          <p>Have a question about a laptop, need advice, or want to place a bulk order? Our team is here to help.</p>
        </motion.div>
      </section>

      <div className="contact-container">
        {/* Info Cards */}
        <div className="contact-info-grid">
          {contactInfo.map((info, i) => (
            <motion.div
              key={info.title}
              className="contact-info-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
            >
              <span className="info-icon">{info.icon}</span>
              <h3>{info.title}</h3>
              {info.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          className="contact-form-wrap"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {submitted ? (
            <div className="contact-success">
              <span className="success-icon">✓</span>
              <h2>Message Sent!</h2>
              <p>Thanks for reaching out, <strong>{form.name}</strong>. We'll get back to you within 24 hours.</p>
              <button className="contact-btn" onClick={() => { setForm({ name: "", email: "", subject: "", message: "" }); setSubmitted(false); }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 className="form-title">Send a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange("name")}
                      className={errors.name ? "input-error" : ""}
                    />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange("email")}
                      className={errors.email ? "input-error" : ""}
                    />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject <span className="optional">(optional)</span></label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="e.g. Question about MacBook Pro"
                    value={form.subject}
                    onChange={handleChange("subject")}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows="5"
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={handleChange("message")}
                    className={errors.message ? "input-error" : ""}
                  />
                  {errors.message && <span className="field-error">{errors.message}</span>}
                </div>
                <button type="submit" className="contact-btn">Send Message →</button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
