"use client";

import Link from "next/link";
import { Play, Sparkles, MonitorPlay, Zap, ShieldCheck, Star, ChevronDown, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import styles from "./page.module.css";

const faqs = [
  { q: "Is VideoBoost AI really free?", a: "Yes! Free plan gives you 15 seconds of video enhancement at 1080p. Upgrade to Pro for longer videos and 4K output." },
  { q: "What video formats are supported?", a: "We support MP4, MOV, and AVI formats up to 100MB." },
  { q: "How long does processing take?", a: "Most videos process in under 2 minutes depending on length and resolution selected." },
  { q: "Is my video data safe?", a: "Absolutely. Your videos are private and automatically deleted after 24 hours. We never use your content." },
  { q: "Can I cancel my Pro plan anytime?", a: "Yes, you can cancel anytime with no questions asked." },
];

const testimonials = [
  { name: "Rahul Sharma", role: "YouTube Creator", text: "VideoBoost AI transformed my old travel videos. The 4K output is incredible!", stars: 5 },
  { name: "Priya Nair", role: "Wedding Videographer", text: "My clients love the enhanced quality. Best investment for my business!", stars: 5 },
  { name: "Karthik S", role: "Content Creator", text: "Super easy to use. Uploaded, enhanced, downloaded in minutes. 10/10!", stars: 5 },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.glowBackground}></div>

      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Play size={24} color="#7c3aed" />
          VideoBoost AI
        </div>
        <div className={styles.navLinks}>
          <Link href="/pricing" className={styles.navLink}>Pricing</Link>
          <Link href="#features" className={styles.navLink}>Features</Link>
          <Link href="#faq" className={styles.navLink}>FAQ</Link>
          <Link href="/login" className={styles.navLink}>Login</Link>
          <Link href="/register" className={styles.buttonPrimary}>Start Free</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className={styles.hero}>
        <div className={styles.badge}>
          <Sparkles size={16} />
          Now supporting 4K Ultra HD Upscaling
        </div>
        <h1 className={styles.title}>
          Transform your videos into stunning cinematic quality.
        </h1>
        <p className={styles.subtitle}>
          Enhance low-resolution footage to 1080p, 2K, and 4K with our AI upscaling engine. Fast, secure, and professional.
        </p>
        <div className={styles.heroButtons}>
          <Link href="/register" className={`${styles.buttonPrimary} ${styles.buttonLarge}`}>
            Try Now for Free <ArrowRight size={18} />
          </Link>
          <Link href="#features" className={`${styles.buttonOutline} ${styles.buttonLarge}`}>
            Learn More
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: "3rem", justifyContent: "center",
          marginTop: "3rem", flexWrap: "wrap"
        }}>
          {[
            { value: "10K+", label: "Videos Enhanced" },
            { value: "4K", label: "Max Resolution" },
            { value: "Free", label: "To Get Started" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#7c3aed" }}>{stat.value}</div>
              <div style={{ color: "#aaa", fontSize: "0.9rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 800, color: "white", marginBottom: "1rem" }}>
            Why Choose VideoBoost AI?
          </h2>
          <p style={{ color: "#aaa", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Professional video enhancement powered by cutting-edge AI technology.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {[
            {
              icon: <MonitorPlay size={24} />,
              title: "Up to 4K Resolution",
              desc: "Breathe life into old footage. Our AI reconstructs missing details for crisp, sharp 1080p, 2K, and 4K outputs."
            },
            {
              icon: <Zap size={24} />,
              title: "Lightning Fast",
              desc: "Powered by optimized GPU architectures. Get enhanced videos in a fraction of the time compared to traditional software."
            },
            {
              icon: <ShieldCheck size={24} />,
              title: "Secure & Private",
              desc: "Your videos are completely private and automatically deleted after 24 hours. We never use your content to train models."
            },
          ].map((f) => (
            <div key={f.title} className={styles.featureCard} style={{
              transition: "transform 0.2s, border-color 0.2s",
              cursor: "default"
            }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-6px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: "5rem 2rem", textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 800, color: "white", marginBottom: "1rem" }}>
          How It Works
        </h2>
        <p style={{ color: "#aaa", marginBottom: "3rem" }}>3 simple steps to enhance your video</p>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { step: "1", title: "Upload", desc: "Drag & drop your video file (MP4, MOV, AVI)" },
            { step: "2", title: "Enhance", desc: "Choose resolution and let AI do the magic" },
            { step: "3", title: "Download", desc: "Watch ad & download your enhanced video" },
          ].map((s) => (
            <div key={s.step} style={{
              flex: "1", minWidth: "200px", maxWidth: "260px",
              background: "#1a1a2e", borderRadius: "16px",
              padding: "2rem 1.5rem", border: "1px solid #2a2a4a",
              position: "relative"
            }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "50%",
                background: "#7c3aed", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "1.3rem", fontWeight: 800, color: "white",
                margin: "0 auto 1rem"
              }}>{s.step}</div>
              <h3 style={{ color: "white", fontWeight: 700, marginBottom: "0.5rem" }}>{s.title}</h3>
              <p style={{ color: "#aaa", fontSize: "0.9rem" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Teaser */}
      <section style={{ padding: "4rem 2rem", textAlign: "center", background: "rgba(124,58,237,0.05)", borderRadius: "24px", margin: "0 2rem" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, color: "white", marginBottom: "1rem" }}>
          Simple, Affordable Pricing
        </h2>
        <p style={{ color: "#aaa", marginBottom: "2rem" }}>Start free, upgrade when you need more</p>
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { plan: "Free", price: "₹0", features: ["15 sec video", "1080p output", "Ads on download"], highlight: false },
            { plan: "Pro", price: "₹99/mo", features: ["5 min video", "4K output", "No ads", "Priority processing"], highlight: true },
          ].map((p) => (
            <div key={p.plan} style={{
              background: p.highlight ? "#7c3aed" : "#1a1a2e",
              border: `1px solid ${p.highlight ? "#7c3aed" : "#2a2a4a"}`,
              borderRadius: "16px", padding: "2rem",
              minWidth: "220px", maxWidth: "280px", flex: "1"
            }}>
              <div style={{ color: p.highlight ? "white" : "#aaa", fontWeight: 700, marginBottom: "0.5rem" }}>{p.plan}</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "1rem" }}>{p.price}</div>
              {p.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: p.highlight ? "white" : "#ccc", marginBottom: "0.5rem", fontSize: "0.9rem" }}>
                  <Check size={14} color={p.highlight ? "white" : "#7c3aed"} /> {f}
                </div>
              ))}
              <Link href={p.highlight ? "/pricing" : "/register"} style={{
                display: "block", marginTop: "1.5rem",
                padding: "0.75rem", borderRadius: "8px",
                background: p.highlight ? "white" : "#7c3aed",
                color: p.highlight ? "#7c3aed" : "white",
                textDecoration: "none", fontWeight: 700, fontSize: "0.9rem"
              }}>
                {p.highlight ? "Upgrade to Pro" : "Get Started Free"}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "5rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, color: "white", marginBottom: "1rem", textAlign: "center" }}>
          What Creators Say
        </h2>
        <p style={{ color: "#aaa", textAlign: "center", marginBottom: "3rem" }}>Trusted by thousands of video creators</p>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{
              background: "#1a1a2e", border: "1px solid #2a2a4a",
              borderRadius: "16px", padding: "1.5rem",
              flex: "1", minWidth: "250px", maxWidth: "300px"
            }}>
              <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1rem" }}>
                {Array(t.stars).fill(0).map((_, i) => (
                  <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p style={{ color: "#ccc", fontSize: "0.95rem", marginBottom: "1rem", fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ color: "white", fontWeight: 700 }}>{t.name}</div>
              <div style={{ color: "#7c3aed", fontSize: "0.85rem" }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "4rem 2rem", maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, color: "white", marginBottom: "0.5rem", textAlign: "center" }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: "#aaa", textAlign: "center", marginBottom: "2.5rem" }}>Everything you need to know</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              background: "#1a1a2e", border: "1px solid #2a2a4a",
              borderRadius: "12px", overflow: "hidden"
            }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", padding: "1.25rem 1.5rem",
                  background: "transparent", border: "none",
                  color: "white", fontWeight: 600, fontSize: "1rem",
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", cursor: "pointer", textAlign: "left"
                }}
              >
                {faq.q}
                <ChevronDown size={18} color="#7c3aed" style={{
                  transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s"
                }} />
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 1.5rem 1.25rem", color: "#aaa", fontSize: "0.95rem", lineHeight: 1.6 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        margin: "2rem", padding: "4rem 2rem",
        background: "linear-gradient(135deg, #7c3aed22, #4f46e522)",
        border: "1px solid #7c3aed44", borderRadius: "24px",
        textAlign: "center"
      }}>
        <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 800, color: "white", marginBottom: "1rem" }}>
          Ready to enhance your videos?
        </h2>
        <p style={{ color: "#aaa", marginBottom: "2rem", fontSize: "1.1rem" }}>
          Join thousands of creators using VideoBoost AI today.
        </p>
        <Link href="/register" style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          padding: "1rem 2.5rem", background: "#7c3aed",
          color: "white", borderRadius: "12px",
          textDecoration: "none", fontWeight: 700, fontSize: "1.1rem"
        }}>
          Get Started Free <ArrowRight size={20} />
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "2rem", borderTop: "1px solid #222",
        marginTop: "2rem", textAlign: "center"
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <Play size={18} color="#7c3aed" />
          <span style={{ color: "white", fontWeight: 700 }}>VideoBoost AI</span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "1rem" }}>
          {[
            { label: "Home", href: "/" },
            { label: "Pricing", href: "/pricing" },
            { label: "Login", href: "/login" },
            { label: "Register", href: "/register" },
          ].map(l => (
            <Link key={l.label} href={l.href} style={{ color: "#aaa", textDecoration: "none", fontSize: "0.9rem" }}>
              {l.label}
            </Link>
          ))}
        </div>
        <p style={{ color: "#555", fontSize: "0.85rem" }}>
          © 2026 VideoBoost AI. All rights reserved.
        </p>
      </footer>

    </div>
  );
}
